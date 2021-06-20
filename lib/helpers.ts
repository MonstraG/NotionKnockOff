export interface Post {
  slug: string;
  content: string;
  title: string;
  date: string;
}

export type PostFields = (keyof Post)[];

export const allFields: (keyof Post)[] = ["title", "date", "slug", "content"];

export const byDate = <T extends { date: string }>(a: T, b: T) => new Date(b.date).getTime() - new Date(a.date).getTime();

export const resolveTitle = (content: string): string => {
  const lines = content.split("\n");
  //https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s08.html
  // This regular expression limits input to letters and numbers from any language or script
  const predicate = (line: string): string[] | null => line.match(/[\p{L}\p{M}\p{Nd}]+/u);
  const header = findValue(lines, predicate);
  //.length === 0 should not happen but safety first
  if (header == null || header.length === 0) {
    return "Untitled";
  }
  return header[0];
}

//just like find, except returns truthful value
export const findValue = <T extends any, K extends any>(array: T[], predicate: (el: T) => K): K | undefined => {
  for (let el of array) {
    const result = predicate(el);
    if (result) {
      return result;
    }
  }
  return undefined;
}
