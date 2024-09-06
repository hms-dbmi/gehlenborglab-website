import { z } from "npm:zod@3.23.8";
import * as yaml from "jsr:@std/yaml@1.0.5";

type Publication = z.infer<typeof publicationSchema>;

const publicationSchema = z.object({
  key: z.string(),
  version: z.number(),
  library: z.object({
    type: z.string(),
    id: z.number(),
    name: z.string(),
    links: z.object({
      alternate: z.object({ href: z.string(), type: z.string() }),
    }),
  }),
  data: z.object({
    key: z.string(),
    version: z.number(),
    itemType: z.enum([
      // filtered out attachment
      // "attachment"
      "journalArticle",
      "preprint",
      "book",
    ]),
    title: z.string(),
    creators: z
      .array(
        z
          .object({
            creatorType: z.string(),
            firstName: z.string(),
            lastName: z.string(),
          })
          .partial(),
      )
      .optional(),
    abstractNote: z.string().optional(),
    genre: z.string().optional(),
    repository: z.string().optional(),
    archiveID: z.string().optional(),
    place: z.string().optional(),
    date: z.string().optional(),
    series: z.string().optional(),
    seriesNumber: z.string().optional(),
    DOI: z.string().optional(),
    citationKey: z.string().optional(),
    url: z.string().optional(),
    accessDate: z.string().optional(),
    archive: z.string().optional(),
    shortTitle: z.string().optional(),
    language: z.string().optional(),
    libraryCatalog: z.string().optional(),
    callNumber: z.string().optional(),
    rights: z.string().optional(),
    tags: z.array(z.unknown()).optional(),
    relations: z.object({}).optional(),
    dateAdded: z.string().optional(),
    dateModified: z.string().optional(),
  }),
});

async function fetchHidivePublications(): Promise<Array<Publication>> {
  const url = new URL(
    "https://api.zotero.org/groups/5145258/collections/4JTW5K6H/items",
  );
  url.searchParams.set("format", "json");
  url.searchParams.set("include", "data");
  url.searchParams.set("itemType", "-attachment");
  url.searchParams.set("style", "ieee");
  const response = await fetch(url);
  const json = await response.json();
  return publicationSchema.array().parse(json);
}

interface WebsitePublication {
  frontmatter: {
    /* Title of the publication */
    title: string;
    /* Path to the image */
    image: string;
    /* Member tags (e.g., nils-gehlenborg) */
    members: Array<string>;
    /* Year of publication */
    year: string;
    /* Publication type (e.g., preprint, article) */
    type: "preprint" | "article" | "book";
    /* TODO: figure out. DOI href to the publisher's website */
    publisher: string;
    cite: {
      /* Formatted authors list (e.g., "B Morrow, T Manz, AE Chung, N Gehlenborg, D Gotz") */
      authors: string;
      /* TODO: markdown formatted string of citation info (e.g., "*Cell* **164**:550-563") */
      published: string;
    };
    zoteroKey: string;
  };
  /* Abstract of the publication */
  data: string;
}

/**
 * Formats a list of authors into a comma-separated list of author names.
 * e.g., "B Morrow, T Manz, AE Chung, N Gehlenborg, D Gotz"
 */
function formatAuthors(authors: Publication["data"]["creators"] = []) {
  authors = authors
    .filter((a) => a.creatorType === "author")
    .filter((a) => !!a.lastName);
  return authors
    .map((a) => {
      // Account for hyphens in first name as well as initials separated with a space
      const firstParts = a.firstName?.split(" ") ?? [];
      // Collapse hyphenated names into initials
      const firstName = firstParts
        .map((part) =>
          part
            .split("-")
            .map((part) => part[0].toUpperCase())
            .join(""),
        )
        .join("");
      return `${firstName} ${a.lastName}`;
    })
    .join(", ");
}

function zoteroToWebsitePublication(pub: Publication): WebsitePublication {
  return {
    frontmatter: {
      title: pub.data.title,
      image: "<TODO.png>",
      members: [
        // TODO: Figure out other names?
        "<TODO>",
        "nils-gehlenborg",
      ],
      year: pub.data.date
        ? new Date(pub.data.date).getFullYear().toString()
        : "<TODO>",
      type:
        pub.data.itemType === "journalArticle" ? "article" : pub.data.itemType,
      publisher: pub.data.DOI ?? "<TODO>",
      cite: {
        authors: formatAuthors(pub.data.creators),
        published: "<TODO>",
      },
      zoteroKey: pub.key,
    },
    data: pub.data.abstractNote ?? "<TODO>",
  };
}

function createWebsitePublicationMarkdownContents(pub: WebsitePublication) {
  return `---
${yaml.stringify(pub.frontmatter)}
---
${pub.data}
`;
}

function determineFilename(pub: WebsitePublication) {
  // first author last name
  let last = pub.frontmatter.cite.authors.split(",")[0].split(" ")[1];
  last = last.replace("'", ""); // For Sehi
  last = last.replace("ö", "oe"); // For Eric
  last = last.replace("ä", "ae");
  return `${last}-${pub.frontmatter.year}-${pub.frontmatter.zoteroKey}.md`.toLowerCase();
}

async function shouldWriteFileContents(
  pub: WebsitePublication,
  options: {
    filename: string;
    existingFileNames: Array<string>;
    targetDir: URL;
  },
) {
  // existing file could make first two parts of filename
  const needle = options.filename.split("-").slice(0, 2).join("-");
  for (const file of options.existingFileNames) {
    const parts = file.split(".")[0].split("-") ?? [];
    const matchesFileName =
      file.startsWith(needle) ||
      // trevor has not done this convention, so we need to check for <name>-<blah>-<year>.md
      needle === `${parts.at(0)}-${parts.at(-1)}`;
    if (!matchesFileName) {
      continue;
    }
    // we need to read the contents and check the title
    const location = new URL(file, options.targetDir);
    const contents = await Deno.readTextFile(location);
    const rawFrontmatter = yaml.parse(contents.split("---")[1]);
    const frontmatter = z
      .object({ title: z.string(), zoteroKey: z.string().optional() })
      .parse(rawFrontmatter);
    // if the title matches, we don't need to write the file
    if (
      pub.frontmatter.zoteroKey === frontmatter.zoteroKey ||
      pub.frontmatter.title.toLowerCase() === frontmatter.title.toLowerCase()
    ) {
      return false;
    }
  }
  return true;
}

if (import.meta.main) {
  const root = new URL("../", import.meta.url);
  const publicationsDir = new URL("_publications/", root);
  const existingFileNames = (
    await Array.fromAsync(Deno.readDir(publicationsDir))
  )
    .filter((f) => f.isFile)
    .map((f) => f.name);

  const pubs = await fetchHidivePublications();
  const gitFiles = [];
  for (const pub of pubs.map(zoteroToWebsitePublication)) {
    const filename = determineFilename(pub);
    if (
      await shouldWriteFileContents(pub, {
        filename,
        existingFileNames,
        targetDir: publicationsDir,
      })
    ) {
      console.log(
        `Writing ${filename}, "${pub.frontmatter.title}" (${pub.frontmatter.zoteroKey})`,
      );
      await Deno.writeTextFile(
        new URL(filename, publicationsDir),
        createWebsitePublicationMarkdownContents(pub),
      );
      gitFiles.push(filename);
    }
  }

  // create pull request action does this
  // {
  //   const cmd = new Deno.Command("git", {
  //     args: ["add", ...gitFiles],
  //     cwd: publicationsDir,
  //   });

  //   const { code } = await cmd.output();
  //   console.assert(code === 0);
  // }
}
