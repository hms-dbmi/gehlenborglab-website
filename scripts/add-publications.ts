import { z } from "npm:zod@3.23.8";
import * as yaml from "jsr:@std/yaml@1.0.5";
import { Octokit } from "npm:@octokit/core@6.1.2";
import { composeCreatePullRequest } from "npm:octokit-plugin-create-pull-request@6.0.0";

/** A path-like object. */
interface Path {
  /** The name of the file. */
  name: string;
  /** The stem of the file (name without extension). */
  stem: string;
  /** The URL of the file. */
  url: URL;
}

interface PublicationData {
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
    type: "preprint" | "article" | "book" | "other";
    /* TODO: figure out. DOI href to the publisher's website */
    publisher: string;
    cite: {
      /* Formatted authors list (e.g., "B Morrow, T Manz, AE Chung, N Gehlenborg, D Gotz") */
      authors: string;
      /* TODO: markdown formatted string of citation info (e.g., "*Cell* **164**:550-563") */
      published: string;
    };
    /* A key for this entity in the Zotero API */
    'zotero-key': string;
    /* A URL for a website related to the publication */
    website: string;
    /* A GitHub link for the code related to the publication */
    code: string;
    /* A link to the preprint */
    preprint: string;
    /* Video resources */
    videos: Array<{ title: string; url: string }>;
    /* Other resources */
    'other-resources': Array<{ title: string; url: string }>;
  };
  /* Abstract of the publication */
  data: string;
}

/**
 * A zod schema that parses the Zotero API response and transforms
 * it to a structured format for our lab website.
 */
function schemaForPublication(options: { memberTags?: Array<string> } = {}) {
  /** https://www.zotero.org/support/dev/web_api/v3/basics */
  const zoteroPublicationSchema = z.object({
    key: z.string(),
    data: z.object({
      key: z.string(),
      itemType: z.string(),
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
      date: z.string().optional(),
      DOI: z.string().optional(),
      citationKey: z.string().optional(),
      url: z.string().optional(),
    }),
  });

  function zoteroToLabWebsitePublication(
    pub: z.infer<typeof zoteroPublicationSchema>,
  ): PublicationData {
    const noneValue = "<TODO>";
    const authors = (pub.data.creators ?? [])
      .filter((a) => a.creatorType === "author")
      .filter((a) => !!a.lastName);
    return {
      frontmatter: {
        title: pub.data.title,
        image: "<TODO.png>",
        members: authors
          .map((a) => closetMemberTag(a, options.memberTags ?? []))
          .filter((m): m is string => !!m),
        year: pub.data.date
          ? new Date(pub.data.date).getFullYear().toString()
          : noneValue,
        type: ({
          "preprint": "preprint",
          "conferencePaper": "article",
          "journalArticle": "article",
        } as const)[pub.data.itemType] ?? "other",
        publisher: pub.data.DOI ?? noneValue,
        cite: {
          authors: formatAuthors(authors),
          published: noneValue,
        },
        'zotero-key': pub.key,
        // additional resources
        website: noneValue,
        code: noneValue,
        preprint: noneValue,
        videos: [],
        'other-resources': [],
      },
      data: pub.data.abstractNote ?? noneValue,
    };
  }

  return zoteroPublicationSchema.transform(zoteroToLabWebsitePublication);
}

/**
 * Fetches the publications from the HiDive Zotero group.
 * @see https://www.zotero.org/support/dev/web_api/v3/basics
 * @returns A list of publications.
 */
async function fetchHidivePublications(): Promise<unknown> {
  const hidiveGroupId = "5145258";
  const hidivePublicationsCollectionId = "4JTW5K6H";
  const url = new URL(
    `https://api.zotero.org/groups/${hidiveGroupId}/collections/${hidivePublicationsCollectionId}/items`,
  );
  url.searchParams.set("format", "json");
  url.searchParams.set("include", "data");
  url.searchParams.set("itemType", "-attachment");
  url.searchParams.set("style", "ieee");
  url.searchParams.set("sort", "date");
  url.searchParams.set("direction", "desc");
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

/**
 * Formats a list of authors into a comma-separated list of author names.
 * e.g., "B Morrow, T Manz, AE Chung, N Gehlenborg, D Gotz"
 */
function formatAuthors(
  authors: Array<{ firstName?: string; lastName?: string }>,
) {
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
            .join("")
        )
        .join("");
      return `${firstName} ${a.lastName}`;
    })
    .join(", ");
}

function createWebsitePublicationMarkdownContents(pub: PublicationData) {
  return `---
${yaml.stringify(pub.frontmatter)}
---
${pub.data}
`;
}

function determineFilename(pub: PublicationData) {
  // first author last name
  let last = pub.frontmatter.cite.authors.split(",")[0].split(" ")[1];
  last = last.replace("'", ""); // For Sehi
  last = last.replace("ö", "oe"); // For Eric
  last = last.replace("ä", "ae");
  return `${last}-${pub.frontmatter.year}-${pub.frontmatter.zoteroKey}.md`
    .toLowerCase();
}

async function shouldWritePublicationFile(
  pub: PublicationData,
  options: {
    filename: string;
    existingPublications: Array<Path>;
  },
) {
  // existing file could make first two parts of filename
  const needle = options.filename.split("-").slice(0, 2).join("-");
  for (const file of options.existingPublications) {
    const parts = file.stem.split("-") ?? [];
    const matchesFileName = file.stem.startsWith(needle) ||
      // trevor has not done this convention, so we need to check for <name>-<blah>-<year>.md
      needle === `${parts.at(0)}-${parts.at(-1)}`;
    if (!matchesFileName) {
      continue;
    }
    // we need to read the contents and check the title
    const contents = await Deno.readTextFile(file.url);
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

/**
 * Tries to map an author to an existing hidive member tag.
 *
 * e.g. { firstName: "Nils", lastName: "Gehlenborg" } => "nils-gehlenborg"
 */
function closetMemberTag(
  author: { firstName?: string; lastName?: string },
  members: Array<string>,
): string | undefined {
  for (const member of members) {
    const [first, last] = member.split("-");
    if (
      last?.toLowerCase() === author?.lastName?.toLowerCase() &&
      first?.[0].toLowerCase() === author?.firstName?.[0].toLowerCase()
    ) {
      return member;
    }
  }
}

async function filesInDir(
  dir: URL,
): Promise<Array<Path>> {
  return (
    await Array.fromAsync(Deno.readDir(dir))
  )
    .filter((f) => f.isFile)
    .map((f) => ({
      name: f.name,
      get stem() {
        return f.name.split(".")[0];
      },
      get url() {
        return new URL(f.name, dir);
      },
    }));
}

if (import.meta.main) {
  const octokit = new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") });
  const dryRun = Deno.args.includes("--dry-run");
  const [memberFiles, publicationFiles] = await Promise.all([
    filesInDir(new URL("../_members/", import.meta.url)),
    filesInDir(new URL("../_publications/", import.meta.url)),
  ]);
  const data = await fetchHidivePublications();
  const schema = schemaForPublication({
    memberTags: memberFiles.map((m) => m.stem),
  });
  for (const pub of schema.array().parse(data)) {
    const filename = determineFilename(pub);
    if (
      await shouldWritePublicationFile(pub, {
        filename,
        existingPublications: publicationFiles,
      })
    ) {
      console.log(
        `Adding ${filename}, "${pub.frontmatter.title}" (${pub.frontmatter.zoteroKey})`,
      );
      if (dryRun) continue;
      await new Promise((resolve) => setTimeout(resolve, 100)); // rate limit
      await composeCreatePullRequest(octokit, {
        owner: "manzt",
        repo: "gehlenborglab-website",
        title: `Add ${filename}`,
        body: `
This is an automated PR adding a new publication to the website.

> ${pub.frontmatter.title}

Please review the changes and address the remaining \`<TODO>\`s in the file.

You can use the [GitHub CLI](https://cli.github.com/) to pull down this branch and make changes:

\`\`\`sh
# Check out the PR
gh pr checkout <PR number>
# Make changes
git add .
git commit -m "Update ${filename.replace(".md", "")}"
git push
\`\`\`

- [ ] Ensure title is correct
- [ ] Ensure authors are correct
- [ ] Add your (and other lab members) member tag (e.g., \`nils-gehlenborg\`)
- [ ] Add image to \`assets/img/publications/fullsize/<image.png>\` (and update frontmatter)
- [ ] Add \`cite.published\` info (e.g., "*Cell* **164**:550-563", "Preprint")
          `,
        update: true,
        labels: ["publication"],
        head: filename.replace(".md", ""),
        changes: [
          {
            files: {
              [`_publications/${filename}`]:
                createWebsitePublicationMarkdownContents(pub),
            },
            commit: `Add ${filename}`,
          },
        ],
      });
    }
  }
}
