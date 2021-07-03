import { Api } from "~/lib/api";
import { Blob } from "buffer";
import combinePromises from "combine-promises";

const RecordingApi = new Api("_recordings", ".webm");

export const createNewRecording = (blob: Blob): Promise<void> =>
  combinePromises({
    slug: RecordingApi.getUniqueSlug(),
    arrayBuffer: blob.arrayBuffer()
  }).then(({ slug, arrayBuffer }) => {
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));
    return RecordingApi.saveItem(slug, buffer);
  });
