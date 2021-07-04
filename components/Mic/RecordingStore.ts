import create from "zustand";

namespace RecordingStore {
  interface Params {
    mediaOptions: MediaRecorderOptions;
    soundOptions: MediaTrackConstraints;
  }

  const params: Params = {
    mediaOptions: {
      audioBitsPerSecond: 128000,
      mimeType: "audio/ogg;codecs:opus"
    },
    soundOptions: {
      echoCancellation: false,
      autoGainControl: true,
      noiseSuppression: true,
      channelCount: 2
    }
  };

  type RecordingContextStore = {
    ctx: AudioContext | null;
    analyzer: AnalyserNode | null;
  };

  export const useContextStore = create<RecordingContextStore>(() => ({
    ctx: null,
    analyzer: null
  }));

  type RecordStore = {
    mediaOptions: MediaRecorderOptions | null;
    mediaRecorder: MediaRecorder | null;
    stream: MediaStream | null;
    chunks: BlobPart[];
  };

  export const useRecordStore = create<RecordStore>(() => ({
    mediaOptions: null,
    mediaRecorder: null,
    stream: null,
    chunks: []
  }));

  export const start = () => {
    if (typeof window == "undefined") {
      console.warn("Attempt to record audio without audio context");
      return;
    }

    const ctx = new window.AudioContext();
    const analyzer = ctx.createAnalyser();
    useContextStore.setState({ ctx, analyzer });

    const { mediaOptions, soundOptions } = params;
    navigator.mediaDevices.getUserMedia({ audio: soundOptions, video: false }).then((stream: MediaStream) => {
      let mediaRecorder: MediaRecorder;
      if (mediaOptions.mimeType && MediaRecorder.isTypeSupported(mediaOptions.mimeType)) {
        mediaRecorder = new MediaRecorder(stream, mediaOptions);
      } else {
        mediaRecorder = new MediaRecorder(stream);
      }

      const { chunks } = useRecordStore.getState();

      mediaRecorder.ondataavailable = (event: BlobEvent) => chunks.push(event.data);

      ctx?.resume().then(() => {
        mediaRecorder?.start(10);
        ctx?.createMediaStreamSource(stream).connect(analyzer);
      });
    });
  };

  export const stop = (): Data => {
    const { mediaRecorder, stream, chunks } = useRecordStore.getState();
    mediaRecorder?.stop();
    stream?.getAudioTracks().forEach((track: MediaStreamTrack) => track.stop());
    const blob = new Blob(chunks, { type: params.mediaOptions.mimeType });
    useRecordStore.setState({ chunks: [] });
    useContextStore.setState({ analyzer: null });

    return {
      blob,
      blobUrl: window.URL.createObjectURL(blob)
    };
  };

  export type Data = {
    blob: Blob;
    blobUrl: string;
  };
}

export default RecordingStore;
