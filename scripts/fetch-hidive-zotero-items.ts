/**
 * @module A script to fetch all items in the HIDIVE Zotero collection
 * and export them to CSV files (publications and preprints).
 *
 * The script also checks for missing papers in the `_publications` directory
 * and creates a GitHub issue (markdown) with the list of missing papers.
 *
 * @example
 * ```sh
 * deno run -A fetch-hidive-zotero-items.ts --outdir=assets/papers --issue-file=missing-papers.md
 * # writes assets/papers/pubs.csv, assets/papers/preprints.csv, and missing-papers.md
 * ```
 */
import * as cli from "@std/cli";
import * as colors from "@std/fmt/colors";
import * as frontMatter from "@std/front-matter";
import * as fs from "@std/fs";
import * as p from "@clack/prompts";
import * as path from "@std/path";
import * as yaml from "@std/yaml";
import { assert } from "@std/assert";
import { stringify } from "@std/csv";
import { z } from "zod";

let HIDIVE_GROUP_ID = "5145258" as const;
let HIDIVE_PUBLICATIONS_COLLECTION_ID = "YGTEVG73" as const;
let HIDIVE_PREPRINTS_COLLECTION_ID = "AJKTPNSI" as const;
let HIDIVE_WEBSITE_IGNORE_TAG = "hidivelab-website-ignore" as const;
let PUBLICATIONS_DIR = new URL("../_publications/", import.meta.url);

export interface LabPaperData {
  frontmatter: {
    /* Title of the publication */
    title: string;
    /* Path to the image */
    image?: string;
    /* Alt text for the image */
    "image-alt"?: string;
    /* Member tags (e.g., nils-gehlenborg) */
    members: Array<string>;
    /* Year of publication */
    year: string | number;
    /* Publication type (e.g., preprint, article) */
    type: "preprint" | "article" | "book" | "other";
    /* TODO: figure out. DOI href to the publisher's website */
    publisher: string;
    /* DOI of the publication */
    doi: string;
    cite: {
      /* Formatted authors list (e.g., "B Morrow, T Manz, AE Chung, N Gehlenborg, D Gotz") */
      authors: string;
      /* TODO: markdown formatted string of citation info (e.g., "*Cell* **164**:550-563") */
      published: string;
    };
    /* A key for this entity in the Zotero API */
    "zotero-key": string;
    /* A URL for a website related to the publication */
    website?: string;
    /* A GitHub link for the code related to the publication */
    code?: string;
    /* A link to the preprint */
    preprint?: string;
    /* Video resources */
    videos: Array<{ title: string; url: string }>;
    /* Other resources */
    "other-resources": Array<{ title: string; url: string }>;
    /* Awards for the publication */
    awards: Array<string>;
  };
  /* Abstract of the publication */
  data: string;
}

export type ZoteroItem = z.infer<typeof zoteroItemSchema>;
type Author = ZoteroItem["creators"][number];

/** An optional string that is transformed to undefined if it is an empty string. */
let maybeStringSchema = z
  .string()
  .transform((v) => v === "" ? undefined : v)
  .optional();

let zoteroItemSchema = z.object({
  data: z.object({
    key: z.string(),
    version: z.number(),
    itemType: z.string(),
    title: z.string(),
    creators: z.union([
      z.object({
        creatorType: z.enum(["author", "editor"]),
        name: z.string(),
      }),
      z.object({
        creatorType: z.enum(["author", "editor"]),
        firstName: z.string(),
        lastName: z.string(),
      }),
    ]).array(),
    abstractNote: z.string().transform((value) =>
      value.replace(/^Abstract\s+/, "") // remove "Abstract" prefix
    ),
    institution: maybeStringSchema,
    bookTitle: maybeStringSchema,
    proceedingsTitle: maybeStringSchema,
    conferenceName: maybeStringSchema,
    publicationTitle: maybeStringSchema,
    volume: maybeStringSchema,
    issue: maybeStringSchema,
    pages: maybeStringSchema,
    series: maybeStringSchema,
    seriesTitle: maybeStringSchema,
    seriesText: maybeStringSchema,
    journalAbbreviation: maybeStringSchema,
    DOI: maybeStringSchema,
    ISSN: maybeStringSchema,
    shortTitle: maybeStringSchema,
    url: maybeStringSchema,
    tags: z.array(z.object({ tag: z.string() })).transform((tags) =>
      tags.map((tag) => tag.tag)
    ),
  }),
  csljson: z.object({
    issued: z.object({
      "date-parts": z.array(z.array(z.union([z.number(), z.string()]))),
    }).refine((value) => value["date-parts"].length === 1, {
      message: "Too many dates",
    }).transform((value) => {
      let parts = value["date-parts"][0].map(Number);
      return { year: parts[0], month: parts[1], day: parts[2] };
    }),
  }),
}).transform(({ data, csljson }) => ({ ...data, date: csljson.issued }));

let ncbiIdConverterResponseSchema = z.object({
  records: z.object({ doi: z.string(), pmid: z.number().optional() }).array(),
});

/**
 * Find the associated PubMed IDs for a list of DOIs.
 *
 * Uses the NCBI ID Converter API to find PubMed IDs for a list of DOIs.
 *
 * @param dois A list of DOIs to find PubMed IDs for.
 * @param batchSize The number of DOIs to send in each request.
 */
async function getPubMedIds(
  dois: Array<string>,
  batchSize = 100,
): Promise<Record<string, string>> {
  let records: Record<string, string> = {};
  for (let i = 0; i < dois.length; i += batchSize) {
    let batch = dois.slice(i, i + batchSize);
    let url = new URL("https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/");
    url.searchParams.set("ids", batch.join(","));
    url.searchParams.set("format", "json");
    let response = await fetch(url);
    let data = await response.json();
    for (let record of ncbiIdConverterResponseSchema.parse(data).records) {
      if (record.pmid) records[record.doi] = record.pmid.toString();
    }
  }
  return records;
}

/**
 * Formats a list of authors into a citation string.
 * @param authors A list of authors.
 * @param options Options for formatting the authors.
 * @param options.rich Whether to format the authors in rich text.
 * @returns A formatted citation string.
 */
function formatAuthors(
  authors: Array<Author>,
  options: { rich?: boolean } = {},
) {
  let it = (text: string) => options.rich ? `*${text}*` : text;
  let formatted = authors
    .filter((author) => author.creatorType === "author")
    .map((author) => {
      if ("name" in author) {
        return it(author.name);
      }
      let { firstName, lastName } = author;
      // extract capital letters from first name as initials
      let initials = firstName.match(/[A-Z]/g);
      return `${initials?.join("") ?? ""} ${lastName}`;
    });
  if (formatted.length === 2) return formatted.join(" and ");
  return formatted.join(", ");
}

/**
 * Formats journal information for a Zotero item.
 * @param meta The Zotero item to format journal information for.
 * @param options Options for formatting the journal information.
 * @param options.rich Whether to format the journal information in rich text.
 * @returns A formatted journal information string.
 */
function formatJournalInfo(
  meta: ZoteroItem,
  options: { rich?: boolean } = {},
) {
  let it = (text: string) => options.rich ? `*${text}*` : text;
  let b = (text: string) => options.rich ? `**${text}**` : text;

  if (meta.itemType === "thesis") {
    return it("Thesis");
  }

  if (meta.itemType === "preprint") {
    if (meta.url?.includes("arxiv")) return it("arXiv");
    if (meta.url?.includes("biorxiv")) return it("bioRxiv");
    if (meta.url?.includes("medrxiv")) return it("medRxiv");
    if (meta.url?.includes("osf.io")) return it("OSF Preprints");
    if (meta.url?.includes("ssrn")) return it("SSRN Preprints");
    return it("Preprint");
  }

  if (meta.publicationTitle) {
    assert(meta.itemType === "journalArticle");
    let { publicationTitle, volume, issue, pages } = meta;
    let citation = it(publicationTitle);
    if (volume) citation += ` ${b(volume)}`;
    if (issue) citation += `(${issue})`;
    if (pages) {
      citation += `${(issue || volume) ? ":" : " "}${pages}`;
    }
    return citation;
  }

  if (meta.proceedingsTitle) {
    assert(meta.itemType === "conferencePaper");
    return it(meta.proceedingsTitle);
  }

  if (meta.conferenceName) {
    assert(meta.itemType === "conferencePaper");
    return it(meta.conferenceName);
  }

  if (meta.bookTitle) {
    assert(meta.itemType === "bookSection");
    return `${it(meta.bookTitle)} (Book)`;
  }

  if (meta.institution) {
    assert(meta.itemType === "report");
    return `${it(meta.institution)}${meta.pages ? ` ${meta.pages}` : ""}`;
  }

  return "";
}

export function formatZoteroItem(
  item: ZoteroItem,
  options: { rich?: boolean } = {},
): { title: string; authors: string; published: string; year: number } {
  return {
    title: item.title,
    authors: formatAuthors(item.creators, options),
    published: formatJournalInfo(item, options),
    year: item.date.year,
  };
}

function formatCitation(item: ZoteroItem) {
  let { authors, title, published, year } = formatZoteroItem(item);
  return `${authors}, "${title}", ${published} (${year}).`;
}

/**
 * Converts a list of publications to a CSV string.
 * @param pubs A list of publications.
 * @returns A CSV string (columns: Month, Year, Citation, PubMed ID, DOI).
 */
function toCsv(pubs: Array<ZoteroItem & { pmid?: string }>) {
  let rows = pubs.map((pub) => ({
    Month: pub.date.month,
    Year: pub.date.year,
    Citation: formatCitation(pub),
    "PubMed ID": pub.pmid,
    DOI: pub.DOI,
  }));
  return stringify(rows, { columns: Object.keys(rows[0]) });
}

/**
 * Fetches all items in a Zotero collection.
 *
 * Uses the Zotero API to fetch all items in a collection. The API is paginated
 * so this function will make multiple requests to fetch all items.
 *
 * @param collectionId The ID of the collection to fetch items from.
 */
async function fetchZoteroCollection(
  collectionId: string,
  groupId: string = HIDIVE_GROUP_ID,
): Promise<ZoteroItem[]> {
  let baseUrl = new URL(`https://api.zotero.org/groups/${groupId}/`);
  let itemsPerPage = 100;
  let items: ZoteroItem[] = [];
  let start = 0;

  while (true) {
    let url = new URL(`collections/${collectionId}/items`, baseUrl);
    url.searchParams.set("format", "json");
    url.searchParams.set("include", "csljson,data");
    url.searchParams.set("itemType", "-attachment");
    url.searchParams.set("limit", itemsPerPage.toString());
    url.searchParams.set("start", start.toString());

    let response = await fetch(url);
    let json = await response.json();

    let newItems = zoteroItemSchema.array().parse(
      // deno-lint-ignore no-explicit-any
      json.filter((item: any) => item.data.itemType !== "note"),
    );

    items.push(...newItems);

    if (json.length < itemsPerPage) {
      break; // We've reached the end of the collection
    }
    start += itemsPerPage;
  }

  return items;
}

/**
 * Fetches a single Zotero item by its ID.
 * @param itemId The ID of the item to fetch.
 * @param groupId The ID of the group to fetch the item from.
 * @returns The fetched Zotero item.
 */
export async function fetchZoteroItem(
  itemId: string,
  groupId: string = HIDIVE_GROUP_ID,
): Promise<ZoteroItem> {
  let url = new URL(
    `https://api.zotero.org/groups/${groupId}/items/${itemId}`,
  );
  url.searchParams.set("format", "json");
  url.searchParams.set("include", "csljson,data");
  let response = await fetch(url);
  let json = await response.json();
  return zoteroItemSchema.parse(json);
}

/**
 * Reads all lab papers from the `_publications` directory.
 * @returns An async generator that yields lab papers.
 */
export async function* iterLabPapers(): AsyncGenerator<
  { file: string; contents: LabPaperData }
> {
  for await (let file of Deno.readDir(PUBLICATIONS_DIR)) {
    if (!file.isFile || !file.name.endsWith(".md")) {
      continue;
    }
    let contents = await Deno.readTextFile(
      new URL(file.name, PUBLICATIONS_DIR),
    );
    let ext = frontMatter.extractYaml(contents);
    let fm = yaml.parse(ext.frontMatter) as LabPaperData["frontmatter"];
    yield { file: file.name, contents: { frontmatter: fm, data: ext.body } };
  }
}

/**
 * Checks for missing papers in the `_publications` directory.
 * @param papers A list of papers to check for.
 * @returns A list of papers that are missing in the `_publications` directory.
 */
async function checkForMissingPapers(
  papers: Array<ZoteroItem & { pmid: string }>,
): Promise<Array<ZoteroItem & { pmid: string }>> {
  let missingPapers = new Map(papers.map((p) => [p.key, p]));
  for await (let { contents } of iterLabPapers()) {
    // Skip papers that are not in the HIDIVE collection
    missingPapers.delete(contents.frontmatter["zotero-key"]);
  }
  return Array.from(missingPapers.entries()).map(([_, paper]) => paper);
}

/**
 * Creates a GitHub issue body with a list of missing papers.
 *
 * The issue body is a markdown formatted list of missing papers grouped by year.
 *
 * @param missingPapers A list of missing papers.
 * @returns A markdown formatted string with the list of missing papers.
 */
function createTodoGitHubIssueContents(missingPapers: Array<ZoteroItem>) {
  function formatLine(p: ZoteroItem): string {
    let cid = p.itemType === "preprint"
      ? HIDIVE_PREPRINTS_COLLECTION_ID
      : HIDIVE_PUBLICATIONS_COLLECTION_ID;
    let zoteroLink =
      `https://www.zotero.org/groups/${HIDIVE_GROUP_ID}/hidive/collections/${cid}/items/${p.key}/collection`;
    let defaultIssueTitle = encodeURIComponent(`Add paper ${p.key}`);
    let openIssueLink =
      `https://github.com/hms-dbmi/gehlenborglab-website/issues/new?assignees=&labels=paper-bot&projects=&template=paper.yml&zotero_id=${p.key}&title=${defaultIssueTitle}&members=nils-gehlenborg`;
    return `- [${p.key}](${zoteroLink}) - [Open issue](${openIssueLink}) - ${p.title}`;
  }

  let papers = Array
    .from(
      Map.groupBy(
        missingPapers.filter((p) => p.itemType !== "preprint"),
        (p) => p.date.year,
      ),
    )
    .map(([year, preprints]) =>
      `### ${year}\n\n${preprints.map(formatLine).join("\n")}`
    );

  let preprints = Array
    .from(
      Map.groupBy(
        missingPapers.filter((p) => p.itemType === "preprint"),
        (p) => p.date.year,
      ),
    )
    .map(([year, preprints]) =>
      `### ${year}\n\n${preprints.map(formatLine).join("\n")}`
    );

  let body = `# Missing papers

This issue is updated automatically from a [GitHub Action](https://github.com/hms-dbmi/gehlenborglab-website/blob/main/.github/workflows/fetch-papers.yml). It lists papers that are in the HIDIVE Zotero collection but are not present in the \`_publications\` directory.

## Preprints

${preprints.join("\n\n")}

## Publications

${papers.join("\n\n")}

Last updated: ${new Date().toISOString()}
`;
  return body;
}

async function main() {
  let args = cli.parseArgs(Deno.args, { string: ["outdir", "issue-file"] });
  let items: Array<ZoteroItem> = [];
  let idMap: Record<string, string> = {};

  p.intro("hidive-pubs");
  {
    let spinner = p.spinner();
    spinner.start(
      colors.bold(`Fetching HIDIVE ${colors.cyan("publications")}`),
    );
    let pubs = await fetchZoteroCollection(HIDIVE_PUBLICATIONS_COLLECTION_ID);
    spinner.stop(
      `Found ${colors.yellow(pubs.length.toString())} publications`,
    );
    items.push(...pubs);
  }

  {
    let spinner = p.spinner();
    spinner.start(colors.bold(`Fetching HIDIVE ${colors.cyan("preprints")}`));
    let preprints = await fetchZoteroCollection(HIDIVE_PREPRINTS_COLLECTION_ID);
    spinner.stop(
      `Found ${colors.yellow(preprints.length.toString())} preprints`,
    );
    items.push(...preprints);
  }

  {
    let dois = items.map((item) => item.DOI).filter((d) =>
      typeof d === "string"
    );
    let spinner = p.spinner();
    spinner.start(
      colors.bold(
        `Fetching PubMed IDs for ${
          colors.cyan(dois.length.toString())
        } DOIs...`,
      ),
    );
    idMap = await getPubMedIds(dois);
    spinner.stop(
      `Found ${colors.yellow(Object.keys(idMap).length.toString())} PubMed IDs`,
    );
  }

  let withPubMedIds = items
    .toSorted((a, b) => {
      let dateA = new Date(a.date.year, a.date.month ?? 0);
      let dateB = new Date(b.date.year, b.date.month ?? 0);
      return dateB.getTime() - dateA.getTime();
    })
    .map((item) => ({
      pmid: idMap[item.DOI as string],
      ...item,
    }));

  {
    let outDir = args.outdir ?? "./hidive-papers";
    let spinner = p.spinner();
    spinner.start(`Exporting papers to ${colors.cyan(outDir)}`);

    await fs.ensureDir(outDir);
    Deno.writeTextFileSync(
      path.join(outDir, "pubs.csv"),
      toCsv(withPubMedIds.filter((p) => p.itemType !== "preprint")),
    );
    Deno.writeTextFileSync(
      path.join(outDir, "preprints.csv"),
      toCsv(withPubMedIds.filter((p) => p.itemType === "preprint")),
    );

    spinner.stop(
      `Exported ${colors.yellow(items.length.toString())} papers to: ${
        colors.cyan(outDir.toString())
      }`,
    );
  }

  {
    let spinner = p.spinner();
    spinner.start("Finding existing papers...");
    let missingPapers = await checkForMissingPapers(withPubMedIds);
    spinner.stop(
      `Found ${colors.yellow(missingPapers.length.toString())} missing papers`,
    );
    let body = createTodoGitHubIssueContents(missingPapers.filter(
      (paper) => !paper.tags.includes(HIDIVE_WEBSITE_IGNORE_TAG),
    ));
    if (!args["issue-file"]) {
      p.log.info(body);
    } else {
      p.log.info(`Writing issue to ${colors.cyan(args["issue-file"])}`);
      await Deno.writeTextFile(args["issue-file"], body);
    }
  }

  p.outro("Done!");
}

if (import.meta.main) {
  main();
}
