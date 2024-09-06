import { z } from "npm:zod@3.23.8";
import * as yaml from "jsr:@std/yaml@1.0.5";

type Publication = z.infer<typeof publicationSchema>;

export const publicationSchema = z.object({
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
    },
    data: pub.data.abstractNote ?? "<TODO>",
  };
}

function writePublicationMarkdown(pub: WebsitePublication) {
  return `---
${yaml.stringify(pub.frontmatter)}
---
${pub.data}
`;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  let allEntries = await fetchHidivePublications();
  let mds = allEntries
    .map(zoteroToWebsitePublication)
    .map(writePublicationMarkdown);
  console.log(mds);
}
