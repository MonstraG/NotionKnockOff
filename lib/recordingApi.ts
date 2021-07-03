import { Api } from "~/lib/api";

const RecordingApi = new Api("_recordings", ".ogg");

export const createNewRecording = (blob: string): Promise<void> =>
  RecordingApi.getUniqueSlug().then((slug) => RecordingApi.saveItem(slug, blob));
