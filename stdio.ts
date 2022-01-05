type Reader = Deno.Reader & {
  readonly rid: number;
}

export async function* asyncIteratorReader(reader: Reader) {
  Deno.setRaw(reader.rid, true);
  while (true) {
    const buff = new Uint8Array(1);
    await reader.read(buff);
    yield buff[0];
  }
}
