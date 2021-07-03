import AudioContextObject from "~/components/Mic/lib/AudioContextObject";

let analyser: AnalyserNode | undefined;
let audioCtx: AudioContext | null;
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
  onStop?: (recordingData: RecordingData) => void;
  onData?: (blob: Blob) => void;
  onSave?: (recordingData: RecordingData) => void;
  mediaOptions: MicMediaOptions;
  soundOptions: MicSoundOptions;
}

export class MicrophoneRecorder {
  private onStart: (() => void) | undefined;
  private onStop: ((recordingData: RecordingData) => void) | undefined;
  private onSave: ((recordingData: RecordingData) => void) | undefined;
  private onData: ((blob: Blob) => void) | undefined;
  private mediaOptions: MicMediaOptions;
  private constraints: {
    audio: MicSoundOptions;
    video: false;
  };
  private startTime: number = 0;
  public recording: boolean = false;

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
    if (this.recording) {
      return;
    }
    this.startTime = Date.now();
    this.recording = true;
    console.log("STARTED");

    //if mediaRecorder set up
    if (mediaRecorder) {
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      if (mediaRecorder && mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        return;
      }

      if (audioCtx && mediaRecorder && mediaRecorder.state === "inactive") {
        if (analyser == null) {
          console.log("RECORDER WARN: attempt to do something else with undefined analyzer");
          return;
        }

        mediaRecorder.start(10);
        audioCtx.createMediaStreamSource(stream).connect(analyser);

        this.onStart && this.onStart();
      }

      console.log("RECORDER: CONTINUED");

      return;
    }

    //set it up otherwise
    if (navigator.mediaDevices) {
      console.log("RECORDER: getUserMedia supported.");

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
        if (audioCtx == null) {
          console.log("RECORDER WARN: attempt to start recording with null audioCtx");
          return;
        }

        audioCtx.resume().then(() => {
          analyser = AudioContextObject.getAnalyser();
          if (analyser == null) {
            console.log("RECORDER WARN: attempt to resume context with undefined analyzer");
            return;
          }
          mediaRecorder?.start(10);
          audioCtx?.createMediaStreamSource(stream).connect(analyser);
        });
      });

      console.log("RECORDER: STARTED");
      return;
    }

    console.error("Your browser does not support audio recording");
  };

  stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      console.log("RECORDER: STOPPED");
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
    this.recording = false;
  }
}

export type RecordingData = {
  blob: Blob;
  startTime: number;
  stopTime: number;
  options: MicMediaOptions;
  blobURL: string;
};
