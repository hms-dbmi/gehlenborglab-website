import * as io from "@std/io";

async function readAllBytes(fname: string): Promise<Uint8Array> {
  if (fname === "-") {
    return await io.readAll(Deno.stdin);
  }
  using file = await Deno.open(fname, { read: true });
  return await io.readAll(file);
}

export async function readJson(fname: string): Promise<unknown> {
  let bytes = await readAllBytes(fname);
  let text = new TextDecoder().decode(bytes);
  return JSON.parse(text);
}

export function parseImageMarkdown(imgTag: string | null): {
  src: string | null;
  alt: string | null;
} {
  let alt = null;
  let src = null;
  if (imgTag?.match(/<img[^>]*>/)) {
    alt = imgTag.match(/alt="([^"]*)"/)?.[1] ?? null;
    src = imgTag.match(/src="([^"]*)"/)?.[1] ?? null;
  } else if (imgTag?.match(/!\[[^\]]*\]\([^\)]*\)/)) {
    alt = imgTag.match(/!\[([^\]]*)\]/)?.[1] ?? null;
    src = imgTag.match(/\(([^\)]*)\)/)?.[1] ?? null;
  }
  return { alt, src };
}

export async function downloadImageResponse(
  resp: Response,
  options: { to: URL },
): Promise<void> {
  using file = await Deno.open(options.to, { write: true, create: true });
  await io.copy(
    io.readerFromStreamReader(resp.body!.getReader()),
    file,
  );
}
