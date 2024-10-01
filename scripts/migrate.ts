import { extractYaml } from "jsr:@std/front-matter@1.0.5";
import { assert } from "jsr:@std/assert@1.0.6";
import * as yaml from "jsr:@std/yaml@1.0.5";
import { stringSimilarity } from "npm:string-similarity-js@2.1.4";

// TODO: move this code to this repo
import { formatZoteroItem } from "https://cdn.jsdelivr.net/gh/manzt/hidive-pubs/main.ts";

let ROOT = new URL("..", import.meta.url);

async function fetchHidivePapers(): Promise<Array<any>> {
  let response = await fetch(
    "https://raw.githubusercontent.com/manzt/hidive-pubs/98cacac569a981fe607a654985846b2a5a170f78/assets/papers.json",
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

function isPreprintHref(href?: string) {
  if (!href) return false;
  return href.includes("arxiv") || href.includes("biorxiv") ||
    href.includes("medrxiv") || href.includes("osf.io") ||
    href.includes("ssrn");
}

function findMatchingPaper(
  filename: string,
  contents: string,
  papers: Array<Entry>,
) {
  let { frontMatter } = extractYaml(contents);
  let meta = yaml.parse(frontMatter) as any;
  if (meta["zotero-key"]) {
    console.log(`Skipping ${filename} (has zotero-key)`);
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
  let { year, published, authors } = formatZoteroItem(bestMatch);
  let doi = bestMatch.DOI;

  if (bestMatch.url) {
    contents = contents.replace(
      /publisher: .*/,
      `publisher: "${bestMatch.url}"`,
    );
  }
  if (meta.type === "preprint" && bestMatch.itemType === "journalArticle") {
    // we are updating the type, so we need to remove the old one
    contents = contents.replace(/type: .*/, `type: article`);
  }
  contents = contents.replace(/  year: .*/, `  year: ${year}`);
  contents = contents.replace(/  authors: .*/, `  authors: "${authors}"`);
  contents = contents.replace(/  published: .*/, `  published: "${published}"`);

  let doiLine = doi ? `doi: "${doi}"\n` : "";
  let keyLine = `zotero-key: "${bestMatch.key}"\n`;
  // we are updating the key, so we need to remove the old one
  let preprintLine = "";
  if (
    // we are updating the publisher, so we need to remove the old one
    isPreprintHref(meta.publisher) && !isPreprintHref(bestMatch.url)
  ) {
    preprintLine = `preprint: "${meta.publisher}"\n`;
  }

  // insert before cite:
  let parts = contents.split("cite:");
  assert(parts.length === 2, "Expected exactly one cite: in the file");
  let [before, after] = parts;
  contents = `${before}${doiLine}${keyLine}${preprintLine}cite:${after}`;

  return contents;
}

let publications = await getPublications();
let papers = await fetchHidivePapers();
let entries = Object.entries(publications);

for (let [filename, contents] of entries) {
  let newContents = findMatchingPaper(filename, contents, papers);
  // write back to file
  await Deno.writeTextFile(
    new URL(filename, new URL("_publications/", ROOT)),
    newContents,
  );
}
