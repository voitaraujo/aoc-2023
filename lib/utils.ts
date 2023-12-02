async function readTextFile(filepath: string) {
  const file = Bun.file(filepath);
  const inputText = await file.text();

  return inputText.split(/\r?\n|\r|\n/g);
}

export { readTextFile };
