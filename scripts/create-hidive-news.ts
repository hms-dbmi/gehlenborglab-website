/**
 * @module Creates a markdown file for an announcement for the lab website.
 *
 * This script is intended to be used in conjunction with GitHub Actions to
 * create announcements for the lab website.
 *
 * It reads a JSON file with the following structure:
 *
 * ```json
 * {
 *   "title": "Announcement Title",
 *   "slug": "announcement-slug",
 *   "members": "MEMBER1\nMEMBER2\n...",
 *   "publications": "PUBLICATION1\nPUBLICATION2\n...",
 *   "projects": "PROJECT1\nPROJECT2\n...",
 *   "blurb": "Announcement blurb",
 *   "announcement": "Announcement content..."
 * }
 * ```
 *
 * @example
 * ```sh
 * deno run -A scripts/create-hidive-news.ts paper.json
 * ```
 */
import * as yaml from "@std/yaml";
import { z } from "zod";
import * as util from "./util.ts";

function splitLines(x: string | undefined | null): Array<string> {
  if (!x) return [];
  return x.split("\n").map((y) => y.trim()).filter((y) => y);
}

type News = z.infer<typeof issueTemplateSchema>;

let issueTemplateSchema = z.object({
  title: z.string().transform((x) => x.trim()),
  blurb: z.string().transform((x) => x.trim()),
  announcement: z.string().transform((x) => x.trim()),
  slug: z.string()
    .nullable()
    .optional()
    .transform((x) => x?.trim())
    .transform((x) => x === "" ? undefined : x),
  date: z.string()
    .nullable()
    .optional()
    .transform((x) => x?.trim())
    .transform((x) =>
      (x === undefined || x === "") ? new Date().toISOString().split("T")[0] : x
    ),
  members: z.string()
    .nullable()
    .optional()
    .transform(splitLines),
  publications: z.string()
    .nullable()
    .optional()
    .transform(splitLines),
  projects: z.string()
    .nullable()
    .optional()
    .transform(splitLines),
});

/**
 * Convert a News object to a lab news markdown file.
 *
 * See `_news/` for examples.
 *
 * @param news The news object
 * @returns The markdown content
 */
function toMarkdown({ announcement, ...frontmatter }: News): string {
  let fm = yaml.stringify(frontmatter, { lineWidth: 120 });
  let body = announcement.trim();
  // ensure there is a newline at the end
  return `---\n${fm}---\n${body}${body.endsWith("\n") ? "" : "\n"}`;
}

function getFilename({ title, slug, date }: News): string {
  let base = slug ?? title.toLowerCase().replace(/[^\w]+/g, "-");
  // ensure ends with .md
  if (!base.endsWith(".md")) {
    base += ".md";
  }
  return `${date}-${base}`;
}

if (import.meta.main) {
  let json = await util.readJson(Deno.args[0]);
  let news = issueTemplateSchema.parse(json);

  await Deno.writeTextFile(
    new URL(`../_news/${getFilename(news)}`, import.meta.url),
    toMarkdown(news),
  );

  Deno.stdout.write(new TextEncoder().encode(`\
This is an automated PR adding a new announcement to the lab website.

> ${news.title}

Please review the changes and merge the PR if everything looks good.
`));
}
