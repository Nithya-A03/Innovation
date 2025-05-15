export function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')  // remove punctuation
    .trim();
}
