import { join } from "path";
import fs from "fs";
import { Stream } from "stream";

export class Api {
  public readonly directory: string;
  public readonly extension: string;
  constructor(directory: string, extension: string) {
    this.directory = join(process.cwd(), directory);
    this.extension = extension;
  }

  getItemPath = (slug: string): string => join(this.directory, `${slug}${this.extension}`);

  // will check if directory exists tru stats and create it if fails
  getItemSlugs = (): Promise<string[]> =>
    fs.promises
      .stat(this.directory)
      .catch((error) => error && fs.promises.mkdir(this.directory))
      .then(this.readSlugs);

  private readSlugs = (): Promise<string[]> =>
    fs.promises.readdir(this.directory).then((filenames) => filenames.map((file) => file.replace(this.extension, "")));

  getUniqueSlug = async (): Promise<string> => {
    const existingSlugs = await this.getItemSlugs();
    let newSlug;
    do {
      newSlug = Api.generateSlug();
    } while (existingSlugs.includes(newSlug));
    return newSlug;
  };

  //technically, content should be Parameters<typeof fs.promises.writeFile>[2], but id doesnt work
  saveItem = (
    slug: string,
    content:
      | string
      | NodeJS.ArrayBufferView
      | Iterable<string | NodeJS.ArrayBufferView>
      | AsyncIterable<string | NodeJS.ArrayBufferView>
      | Stream
  ): Promise<void> => fs.promises.writeFile(this.getItemPath(slug), content);

  removeItem = (slug: string): Promise<void> => fs.promises.rm(this.getItemPath(slug));

  private static generateSlug = (): string => {
    const result = [];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("");
  };
}
