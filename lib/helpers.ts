export interface Post {
  slug: string;
  content: string;
  title: string;
  date: string;
}

export type PostFields = (keyof Post)[];

export const allFields: (keyof Post)[] = ["title", "date", "slug", "content"];

export const byDate = <T extends { date: string }>(a: T, b: T) => new Date(b.date).getTime() - new Date(a.date).getTime();
