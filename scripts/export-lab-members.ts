/**
 * @module Export HIDIVE lab members (from '../_members/') to a CSV ('../assets/members.csv').
 *
 * @see {@link LabMemberSchema} below for output schema.
 *
 * @example
 * ```sh
 * deno run -A export-lab-members.ts
 * ```
 */
import * as csv from "@std/csv";
import * as frontMatter from "@std/front-matter";
import * as z from "zod";

let MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

let MonthDateSchema = z.string()
  .transform((value) => value.trim().split(/\s+/))
  .transform(([month, year]) => ({ month, year }))
  .pipe(
    z.object({ month: z.enum(MONTHS), year: z.coerce.number().int() }),
  ).transform(({ month, year }) =>
    `${year}-${(MONTHS.indexOf(month) + 1).toString().padStart(2, "0")}`
  );

type LabMember = z.infer<typeof LabMemberSchema>;
let LabMemberSchema = z.object({
  title: z.string(),
  // name_degree: z.string(),
  // photo: z.string().optional(),
  // alt: z.string().nullish(),
  job_title: z.string(),
  role: z.string(),
  end: MonthDateSchema.nullish().transform((value) => value ?? null),
  start: MonthDateSchema,
  // NB: Ordering is important here. Last field cannot be nullable to encode CSV correctly
  // https://github.com/denoland/std/issues/6439
}).transform(({ title, job_title, ...rest }) => ({
  name: title,
  title: job_title,
  ...rest,
}));

if (import.meta.main) {
  let membersDir = new URL("../_members/", import.meta.url);
  let members: Array<LabMember> = [];
  for await (const entry of Deno.readDir(membersDir)) {
    if (entry.isDirectory || entry.name == "template.md") {
      continue;
    }
    let contents = await Deno.readTextFile(
      new URL(entry.name, membersDir),
    );
    let result = LabMemberSchema.safeParse(
      frontMatter.extractYaml(contents).attrs,
    );
    if (!result.success) {
      console.log(
        "%cerror%c: Failed to parse %c%s",
        "color: red; font-weight: bold;",
        "",
        "font-weight: bold;",
        entry.name,
        "",
        "Fields:",
        result.error.flatten().fieldErrors,
      );
      console.log(
        "%c\nPlease fix the errors and try again.",
        "color: red; font-weight: bold;",
      );
      Deno.exit(1);
    }
    members.push(result.data);
  }

  await Deno.writeTextFile(
    new URL("../assets/members.csv", import.meta.url),
    csv.stringify(members, { columns: Object.keys(members[0]) }),
  );
}
