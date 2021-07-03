import AudioContextObject from "~/components/Mic/lib/AudioContextObject";

let analyser: AnalyserNode;
let audioCtx: AudioContext;
let mediaRecorder: MediaRecorder | null;
let chunks: BlobPart[] = [];
let stream: MediaStream;

export type MicSoundOptions = {
  echoCancellation: boolean;
  autoGainControl: boolean;
  noiseSuppression: boolean;
  channelCount: number;
};

export type MicMediaOptions = {
  audioBitsPerSecond: number;
  mimeType: string;
};

export interface MicrophoneRecorderParams {
  onStart?: () => void;
  onStop?: (blobData: RecordingData) => void;
  onData?: (blob: Blob) => void;
  onSave?: (blobData: RecordingData) => void;
  mediaOptions: MicMediaOptions;
  soundOptions: MicSoundOptions;
}

export class MicrophoneRecorder {
  private onStart: (() => void) | undefined;
  private onStop: ((blobData: RecordingData) => void) | undefined;
  private onSave: ((blobData: RecordingData) => void) | undefined;
  private onData: ((blob: Blob) => void) | undefined;
  private mediaOptions: MicMediaOptions;
  private constraints: {
    audio: MicSoundOptions;
    video: false;
  };
  private startTime: number = 0;

  constructor({ onStart, onStop, onSave, onData, mediaOptions, soundOptions }: MicrophoneRecorderParams) {
    this.onStart = onStart;
    this.onStop = onStop;
    this.onSave = onSave;
    this.onData = onData;
    this.mediaOptions = mediaOptions;
    this.constraints = {
      audio: soundOptions,
      video: false
    };
  }

  startRecording = () => {
    this.startTime = Date.now();

    if (mediaRecorder) {
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      if (mediaRecorder && mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        return;
      }

      if (audioCtx && mediaRecorder && mediaRecorder.state === "inactive") {
        mediaRecorder.start(10);
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        this.onStart && this.onStart();
      }
    } else if (navigator.mediaDevices) {
      console.log("getUserMedia supported.");

      navigator.mediaDevices.getUserMedia(this.constraints).then((str) => {
        stream = str;

        if (MediaRecorder.isTypeSupported(this.mediaOptions.mimeType)) {
          mediaRecorder = new MediaRecorder(str, this.mediaOptions);
        } else {
          mediaRecorder = new MediaRecorder(str);
        }
        this.onStart && this.onStart();

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          chunks.push(event.data);
          this.onData && this.onData(event.data);
        };

        audioCtx = AudioContextObject.getAudioContext();
        audioCtx.resume().then(() => {
          analyser = AudioContextObject.getAnalyser();
          mediaRecorder?.start(10);
          const sourceNode = audioCtx.createMediaStreamSource(stream);
          sourceNode.connect(analyser);
        });
      });
    } else {
      console.error("Your browser does not support audio recording");
    }
  };

  stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();

      stream.getAudioTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
      mediaRecorder = null;
      AudioContextObject.resetAnalyser();
      this.onStopRecording();
    }
  }

  onStopRecording() {
    const blob = new Blob(chunks, { type: this.mediaOptions.mimeType });
    chunks = [];

    const blobObject = {
      blob,
      startTime: this.startTime,
      stopTime: Date.now(),
      options: this.mediaOptions,
      blobURL: window.URL.createObjectURL(blob)
    };

    this.onStop && this.onStop(blobObject);
    this.onSave && this.onSave(blobObject);
  }
}

type RecordingData = {
  blob: Blob;
  startTime: number;
  stopTime: number;
  options: MicMediaOptions;
  blobURL: string;
};
