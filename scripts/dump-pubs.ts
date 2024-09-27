import { z } from "npm:zod@3.9.8";
import { extractYaml } from "jsr:@std/front-matter@1.0.5";
import * as yaml from "jsr:@std/yaml@1.0.5";
import { stringify } from "jsr:@std/csv@1.0.3/stringify";

const pubSchema = z.object({
  year: z.number(),
  title: z.string(),
  cite: z.object({
    authors: z.string(),
    published: z.string(),
  }),
}).transform(({ year, title, cite }) => ({
  year,
  title,
  citation: `${cite.authors}, "${title}", ${cite.published} (${year}).`,
}));

if (import.meta.main) {
  const pubs: Array<z.infer<typeof pubSchema>> = [];
  const pubsDir = new URL("../_publications/", import.meta.url);

  for await (const entry of Deno.readDir(pubsDir)) {
    if (!entry.isFile) {
      continue;
    }
    const text = await Deno.readTextFile(new URL(entry.name, pubsDir));
    const md = extractYaml(text);
    const pub = pubSchema.parse(yaml.parse(md.frontMatter));
    pubs.push(pub);
  }

  pubs.sort((a, b) => {
    // first by year, then by title
    const diff = a.year - b.year;
    return diff === 0 ? a.title.localeCompare(b.title) : diff;
  });
  pubs.reverse();

  const data = stringify(pubs, { columns: ["year", "citation"] });

  await Deno.writeTextFile(new URL("../assets/pubs.csv", import.meta.url), data);
}
