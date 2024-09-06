import { z } from "npm:zod@3.23.8";
import * as yaml from "jsr:@std/yaml@1.0.5";
import { Octokit as OctokitBase } from "npm:@octokit/core@6.1.2";
import { createPullRequest } from "npm:octokit-plugin-create-pull-request@6.0.0";

type Publication = z.infer<typeof publicationSchema>;

const Octokit = OctokitBase.plugin(createPullRequest);

const publicationSchema = z.object({
  key: z.string(),
  data: z.object({
    key: z.string(),
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
    date: z.string().optional(),
    DOI: z.string().optional(),
    citationKey: z.string().optional(),
    url: z.string().optional(),
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

function zoteroToWebsitePublication(
  pub: Publication,
  options: {
    memberTags: Array<string>;
  },
): WebsitePublication {
  const noneValue = "<TODO>";
  const authors = (pub.data.creators ?? [])
    .filter((a) => a.creatorType === "author")
    .filter((a) => !!a.lastName);
  return {
    frontmatter: {
      title: pub.data.title,
      image: "<TODO.png>",
      members: authors
        .map((a) =>
          closet(
            `${a.firstName} ${a.lastName}`.toLowerCase(),
            options.memberTags,
          )
        )
        .filter((a) => a.max > 0.8)
        .map((a) => a.best),
      year: pub.data.date
        ? new Date(pub.data.date).getFullYear().toString()
        : noneValue,
      type: pub.data.itemType === "journalArticle"
        ? "article"
        : pub.data.itemType,
      publisher: pub.data.DOI ?? noneValue,
      cite: {
        authors: formatAuthors(authors),
        published: noneValue,
      },
      zoteroKey: pub.key,
    },
    data: pub.data.abstractNote ?? noneValue,
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
  return `${last}-${pub.frontmatter.year}-${pub.frontmatter.zoteroKey}.md`
    .toLowerCase();
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
    const matchesFileName = file.startsWith(needle) ||
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

function levenshteinDistance(a: string, b: string): number {
  const matrix: Array<Array<number>> = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculate the similarity between two strings.
 */
function stringSimilarity(s1: string, s2: string): number {
  const longerLength = Math.max(s1.length, s2.length);
  if (longerLength == 0) return 1.0;
  return (longerLength - levenshteinDistance(s1, s2)) / longerLength;
}

/**
 * Find the closest string in a list of options to a target string.
 * @param target The target string.
 * @param options The list of options to compare against.
 * @returns The closest string and the similarity score.
 */
function closet(
  target: string,
  options: Array<string>,
): { best: string; max: number } {
  let max = 0;
  let best = "";
  for (const option of options) {
    const similarity = stringSimilarity(target, option);
    if (similarity > max) {
      max = similarity;
      best = option;
    }
  }
  return { best, max };
}

if (import.meta.main) {
  const octokit = new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") });
  const publicationsDir = new URL("../_publications/", import.meta.url);
  const membersDir = new URL("../_members/", import.meta.url);

  const memberTags = (
    await Array.fromAsync(Deno.readDir(membersDir))
  )
    .filter((f) => f.isFile)
    .map((f) => f.name.split(".")[0]);

  const existingFileNames = (
    await Array.fromAsync(Deno.readDir(publicationsDir))
  )
    .filter((f) => f.isFile)
    .map((f) => f.name);

  const pubs = await fetchHidivePublications();
  const websitePubs = pubs.map((pub) =>
    zoteroToWebsitePublication(pub, { memberTags })
  );
  for (const pub of websitePubs) {
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
      await new Promise((resolve) => setTimeout(resolve, 100)); // rate limit
      await octokit.createPullRequest({
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
