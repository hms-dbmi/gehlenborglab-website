/**
 * @module Creates of updates the markdown file for a paper in the lab website.
 *
 * This script is intended to be used in conjunction with GitHub Actions to
 * update the lab website with new papers from the HiDive Zotero library.
 *
 * It reads a JSON file with the following structure:
 *
 * ```json
 * {
 *  "zotero_id": "ZOTERO_ITEM_ID" | ,
 *  "slug": "some-identifier",
 *  "preprint": "ZOTERO_ITEM_ID or URL",
 *  "image": "<img src='URL'>",
 *  "image_alt": "alt text for the image..",
 *  "lab_members": "MEMBER1\nMEMBER2\n...",
 *  "website": "URL",
 *  "code_repository": "URL",
 *  "video_resources": "TITLE1|URL1\nTITLE2|URL2\n...",
 *  "other_resources": "TITLE1|URL1\nTITLE2|URL2\n...",
 *  "awards": "AWARD1\nAWARD2\n..."
 * }
 * ```
 *
 * @example
 * ```sh
 * deno run -A scripts/update-hidive-paper.ts paper.json
 * ```
 */
import * as yaml from "@std/yaml";
import { deepMerge } from "@std/collections";
import { z } from "zod";
import * as util from "./util.ts";

import {
  fetchZoteroItem,
  formatZoteroItem,
  iterLabPapers,
  type LabPaperData,
  type ZoteroItem,
} from "./fetch-hidive-zotero-items.ts";

let ROOT = new URL("../", import.meta.url);
let PUBLICATIONS_DIR = new URL("_publications/", ROOT);
let IMAGES_DIR = new URL("assets/img/publications/fullsize/", ROOT);

type PaperIssueTempalte = z.infer<typeof issueTemplateSchema>;

let issueTemplateSchema = z.object({
  zotero_id: z.string().transform((x) => x.trim()),
  slug: z.string()
    .nullable()
    .transform((x) => x?.trim()),
  preprint: z.string()
    .nullable()
    .transform((x) => x?.trim())
    .transform((x) => x === "" ? undefined : x),
  image: z.string()
    .nullable()
    .transform((txt) => util.parseImageMarkdown(txt).src),
  image_alt: z.string()
    .nullable()
    .transform((x) => x?.trim())
    .transform((x) => x === "" ? undefined : x),
  lab_members: z.string()
    .nullable()
    .transform((x) => x?.split("\n").map((y) => y.trim()).filter((y) => y)),
  website: z.string()
    .nullable()
    .transform((x) => x?.trim())
    .transform((x) => x === "" ? undefined : x),
  code_repository: z.string()
    .nullable()
    .transform((x) => x?.trim())
    .transform((x) => x === "" ? undefined : x),
  video_resources: z
    .string()
    .nullable()
    .transform((x) =>
      x?.split("\n").map((y) => {
        let [title, url] = y
          .trim()
          .split("|")
          .filter((z) => z)
          .map((z) => z.trim());
        return { title, url };
      })
    ),
  other_resources: z
    .string()
    .nullable()
    .transform((x) =>
      x?.split("\n").map((y) => {
        let [title, url] = y
          .trim()
          .split("|")
          .filter((z) => z)
          .map((z) => z.trim());
        return { title, url };
      })
    ),
  awards: z
    .string()
    .nullable()
    .transform((x) => x?.split("\n").map((z) => z.trim()).filter((z) => z)),
});

/**
 * Use the first author's last name, publication year, and Zotero key to create
 * a slug for the file.
 */
function determineFileStem(item: ZoteroItem, slug?: string) {
  // first author last name
  let first = item.creators[0];
  let last = "lastName" in first ? first.lastName : "consortium";
  last = last.split(" ").join("").toLowerCase();
  last = last.replace("'", ""); // For Sehi
  last = last.replace("ö", "oe"); // For Eric
  last = last.replace("ä", "ae");
  return `${last}-${item.date.year}-${slug || item.key}`;
}

async function resolvePreprint(
  idOrUrl: string | undefined,
): Promise<string | undefined> {
  if (!idOrUrl) return undefined;
  if (idOrUrl.startsWith("http")) return idOrUrl;
  // try fetching as Zotero item
  try {
    let item = await fetchZoteroItem(idOrUrl);
    return item.url;
  } catch (_) {
    // fallback to uknown
    return undefined;
  }
}

/**
 * Convert the GitHub Issue JSON to a lab publication markdown file.
 */
async function processGitHubIssue(
  issue: PaperIssueTempalte,
): Promise<{ file: string; contents: LabPaperData }> {
  let todoValue = "<TODO>";
  let paper = await fetchZoteroItem(issue.zotero_id);
  let stem = determineFileStem(paper, issue.slug);
  let preprint = await resolvePreprint(issue.preprint);

  let { title, authors, published, year } = formatZoteroItem(paper, {
    rich: true,
  });

  let image: string | undefined = undefined;
  if (issue.image) {
    let response = await fetch(issue.image);
    let type = response.headers.get("content-type");
    if (!response.ok || !type) {
      console.error(`Failed to fetch image: ${issue.image}`);
    } else {
      // download the image
      let fname = `${stem}.${type.split("/")[1]}`;
      await util.downloadImageResponse(response, {
        to: new URL(fname, IMAGES_DIR),
      });
      image = fname;
    }
  }

  return {
    file: `${stem}.md`,
    contents: {
      frontmatter: {
        title: title,
        ...(image
          ? {
            image,
            "image-alt": issue.image_alt ?? todoValue,
          }
          : {}),
        members: issue.lab_members ?? [],
        year: year,
        type: ({
          journalArticle: "article",
          conferencePaper: "article",
          book: "book",
          preprint: "preprint",
        } as const)[paper.itemType] ?? "other",
        publisher: paper.url ?? todoValue,
        doi: paper.DOI ?? todoValue,
        cite: {
          authors: authors,
          published: published,
        },
        "zotero-key": paper.key,
        videos: issue.video_resources ?? [],
        "other-resources": issue.other_resources ?? [],
        awards: issue.awards ?? [],
        ...(issue.website ? { website: issue.website } : {}),
        ...(issue.code_repository ? { code: issue.code_repository } : {}),
        ...(preprint ? { preprint } : {}),
      },
      data: paper.abstractNote,
    },
  };
}

/**
 * Find an existing publication by Zotero key.
 * @param zoteroKey The Zotero key to search for
 * @returns The file and contents of the publication if found
 */
async function findExistingPublication(
  zoteroKey: string,
): Promise<{ file: string; contents: LabPaperData } | undefined> {
  for await (let paper of iterLabPapers()) {
    if (paper.contents.frontmatter["zotero-key"] === zoteroKey) {
      return paper;
    }
  }
  return undefined;
}

/**
 * Convert a LabPaperData object to a lab publication markdown file.
 *
 * See `_publications/` for examples.
 *
 * @param pub The publication data
 * @returns The markdown file content
 */
function toMarkdown(pub: LabPaperData): string {
  let fm = yaml.stringify(pub.frontmatter, { lineWidth: 120 });
  let body = pub.data;
  // ensure there is a newline at the end
  return `---\n${fm}---\n${body}${body.endsWith("\n") ? "" : "\n"}`;
}

if (import.meta.main) {
  let data = await util.readJson(Deno.args[0]);
  let issue = issueTemplateSchema.parse(data);
  let { file, contents } = await processGitHubIssue(issue);
  let existing = await findExistingPublication(issue.zotero_id);
  let existingPreprint = issue.preprint
    ? await findExistingPublication(issue.preprint)
    : undefined;
  if (existing) {
    file = existing.file;
    // @ts-expect-error - types are not compatible
    contents = deepMerge(existing.contents, contents);
  } else if (existingPreprint) {
    // @ts-expect-error - types are not compatible
    contents = deepMerge(existingPreprint.contents, contents);
  }
  // Ensure members are unique
  contents.frontmatter.members = [...new Set(contents.frontmatter.members)];

  // Write the file
  await Deno.writeTextFile(
    new URL(file, PUBLICATIONS_DIR),
    toMarkdown(contents),
  );

  // Remove old image if it was changed
  if (
    existing?.contents?.frontmatter?.image &&
    existing?.contents?.frontmatter.image !== contents.frontmatter.image
  ) {
    // remove the old image if the new one is different
    await Deno.remove(
      new URL(existing.contents.frontmatter.image, IMAGES_DIR),
    );
  }

  // Resolve old preprint
  if (existingPreprint?.file && !(existing?.file === existingPreprint.file)) {
    // remove the old preprint if it was moved
    await Deno.remove(new URL(existingPreprint.file, PUBLICATIONS_DIR));

    // if there is a new image, remove it as well
    if (
      existingPreprint.contents.frontmatter.image &&
      existingPreprint.contents.frontmatter.image !== contents.frontmatter.image
    ) {
      await Deno.remove(
        new URL(existingPreprint.contents.frontmatter.image, IMAGES_DIR),
      );
    }
  }

  Deno.stdout.write(new TextEncoder().encode(`\
This is an automated PR adding a new publication to the website.

> ${contents.frontmatter.cite.authors}. "${contents.frontmatter.title}", ${contents.frontmatter.cite.published} (${contents.frontmatter.year})

Please review the changes.

You can use the [GitHub CLI](https://cli.github.com/) to pull down this branch and make changes:

\`\`\`sh
# Check out the PR
gh pr checkout <PR number>
# Make changes
git add .
git commit -m "Update ${file}"
git push
\`\`\`
`));
}
