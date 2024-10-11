/**
 * @module Creates a markdown file for a new member for the lab website.
 *
 * This script is intended to be used in conjunction with GitHub Actions.
 *
 * It reads a JSON file with the following structure:
 *
 * ```json
 * {
 *   "slug": "jane-doe",
 *   "name": "Jane Doe",
 *   "degree": "PhD",
 *   "image": "<img alt=\"image\" src=\"https://github.com/user-attachments/assets/32f4b95c-7d2f-452e-85f5-c0351328023d\">",
 *   "job_title": "Postdoctoral Researcher",
 *   "role": "postdoc",
 *   "social_media": "linked-in | https://www.linkedin.com/in/jane-doe\ngithub | https://github.com/foo",
 *   "start_date": "October 2021",
 *   "biography": "Jane Doe is a postdoctoral researcher..."
 * }
 * ```
 *
 * @example
 * ```sh
 * deno run -A scripts/create-hidive-member.ts paper.json
 * ```
 */
import * as yaml from "jsr:@std/yaml@1.0.5";
import { z } from "npm:zod@3.9.8";
import * as util from "./util.ts";

type Member = z.infer<typeof issueTemplateSchema>;

let issueTemplateSchema = z.object({
  slug: z.string()
    .transform((x) => x.trim())
    .transform((x) => x.endsWith(".md") ? x.slice(0, -3) : x),
  name: z.string().transform((x) => x.trim()),
  degree: z.string().transform((x) => x.trim()),
  image: z.string()
    .nullable()
    .transform(util.parseImageMarkdown),
  job_title: z.string().transform((x) => x.trim()),
  role: z.string().transform((x) => x.trim()),
  social_media: z
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
  start_date: z.string().transform((x) => x.trim()),
  biography: z.string().transform((x) => x.trim()),
});

/**
 * Convert a News object to a lab news markdown file.
 *
 * See `_news/` for examples.
 *
 * @param news The news object
 * @returns The markdown content
 */
function toMarkdown({ biography, ...m }: Member): string {
  // lab member frontmatter
  let frontmatter: {
    title: string;
    name_degree: string;
    photo: string;
    alt: string;
    job_title: string;
    role: string;
    services: Array<string>;
    start: string;
    end: string | null;
  } = {
    title: m.name,
    name_degree: `${m.name}, ${m.degree}`,
    photo: m.image.src ?? "<TODO>",
    alt: m.image.alt ?? m.name,
    job_title: m.job_title,
    role: m.role,
    services: m.social_media?.map((x) => `${x.title}: ${x.url}`) ?? [],
    start: m.start_date,
    end: "",
  };
  let fm = yaml.stringify(frontmatter, { lineWidth: 120 });
  let body = biography.trim();
  // ensure there is a newline at the end
  return `---\n${fm}---\n${body}${body.endsWith("\n") ? "" : "\n"}`;
}

if (import.meta.main) {
  let json = await util.readJson(Deno.args[0]);
  let issue = issueTemplateSchema.parse(json);

  if (issue.image.src) {
    let resp = await fetch(issue.image.src);
    let type = resp.headers.get("content-type");
    if (!resp.ok || !type) {
      console.error(`Failed to fetch image: ${issue.image.src}`);
    } else {
      let fname = `${issue.slug}.${type.split("/")[1]}`;
      await util.downloadImageResponse(resp, {
        to: new URL(
          `../assets/img/members/fullsize/${fname}`,
          import.meta.url,
        ),
      });
      issue.image.src = fname;
    }
  }

  await Deno.writeTextFile(
    new URL(`../_members/${issue.slug}.md`, import.meta.url),
    toMarkdown(issue),
  );

  Deno.stdout.write(new TextEncoder().encode(`\
This is an automated PR adding a new announcement to the lab website.

> ${issue.name} joined the lab as a ${issue.job_title} in ${issue.start_date}.

Please review the changes and merge the PR if everything looks good.
`));
}
