import { extractYaml } from "jsr:@std/front-matter@1.0.5";
import { assert } from "jsr:@std/assert@1.0.6";
import * as yaml from "jsr:@std/yaml@1.0.5";
import { stringSimilarity } from "npm:string-similarity-js@2.1.4";

function formatAuthors(
  authors: Array<
    { creatorType: string; name: string } | {
      creatorType: string;
      firstName: string;
      lastName: string;
    }
  >,
  options: { rich?: boolean } = {},
) {
  let it = (text: string) => options.rich ? `*${text}*` : text;
  if (authors.length === 1 && "name" in authors[0]) {
    return `${it(authors[0].name)} (incl. N Gehlenborg)`;
  }
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

function formatJournalInfo(meta: any, options: { rich?: boolean } = {}) {
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
    return it(meta.proceedingsTitle);
  }
  if (meta.bookTitle) {
    return `${it(meta.bookTitle)} (Book)`;
  }
  if (meta.institution) {
    return `${it(meta.institution)}${meta.pages ? ` ${meta.pages}` : ""}`;
  }
  return "";
}

let ROOT = new URL("..", import.meta.url);

async function fetchHidivePapers(): Promise<Array<any>> {
  let response = await fetch(
    "https://raw.githubusercontent.com/manzt/hidive-pubs/main/assets/papers.json",
  );
  let raw: Array<any> = await response.json();
  return raw.filter(
    (item) =>
      item.itemType === "journalArticle" ||
      item.itemType === "conferencePaper" ||
      item.itemType === "bookSection" ||
      item.itemType === "thesis" ||
      item.itemType === "preprint",
  );
}

async function getPublications(): Promise<Record<string, string>> {
  let pubsDir = new URL("_publications/", ROOT);

  let files = Array
    .from(Deno.readDirSync(pubsDir))
    .filter((entry) => entry.isFile);

  return Object.fromEntries(
    await Promise.all(
      files.map(async (entry) => {
        let content = await Deno.readTextFile(new URL(entry.name, pubsDir));
        return [entry.name, content];
      }),
    ),
  );
}

type Entry = any;

async function findMatchingPaper(
  filename: string,
  contents: string,
  papers: Array<Entry>,
) {
  let { frontMatter } = extractYaml(contents);
  let meta = yaml.parse(frontMatter) as any;
  if (meta["zotero-key"]) {
    console.log(`Skipping ${meta.title} as it already has a key`);
    return contents;
  }
  let scores = papers.map(
    (p) => [p, stringSimilarity(meta.title, p.title, 2, false)],
  );
  let [bestMatch, score] = scores.reduce(
    (acc, cur) => (cur[1] > acc[1] ? cur : acc),
  );
  assert(
    score > 0.61,
    `No match found for ${meta.title}, closest match is ${bestMatch.title} with score ${score}`,
  );
  let year = bestMatch.date.year;
  let authors = formatAuthors(bestMatch.creators, { rich: true });
  let published = formatJournalInfo(bestMatch, { rich: true });
  let doi = bestMatch.DOI;
  if (doi && bestMatch.url) {
    published += `; [doi:${doi}](${bestMatch.url})`;
  }

  contents = contents.replace(/  year: .*/, `  year: ${year}`);
  contents = contents.replace(/  authors: .*/, `  authors: "${authors}"`);
  contents = contents.replace(/  published: .*/, `  published: "${published}"`);

  let doiLine = doi ? `doi: "${doi}"\n` : "";
  let keyLine = `zotero-key: "${bestMatch.key}"\n`;

  // insert before cite:
  let parts = contents.split("cite:");
  assert(parts.length === 2, "Expected exactly one cite: in the file");
  let [before, after] = parts;
  contents = `${before}${doiLine}${keyLine}cite:${after}`;

  return contents;
}

let publications = await getPublications();
let papers = await fetchHidivePapers();
let entries = Object.entries(publications);

for (let [filename, contents] of entries) {
  let newContents = await findMatchingPaper(filename, contents, papers);
  // write back to file
  await Deno.writeTextFile(
    new URL(filename, new URL("_publications/", ROOT)),
    newContents,
  );
}
