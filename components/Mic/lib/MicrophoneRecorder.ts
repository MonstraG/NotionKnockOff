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
  private readonly onStart: (() => void) | undefined;
  private readonly onStop: ((recordingData: RecordingData) => void) | undefined;
  private readonly onSave: ((recordingData: RecordingData) => void) | undefined;
  private readonly onData: ((blob: Blob) => void) | undefined;
  private readonly mediaOptions: MicMediaOptions;
  private constraints: {
    audio: MicSoundOptions;
    video: false;
  };
  private startTime: number = 0;
  private readonly audioContext: AudioContext | null = null;
  private readonly analyzer: AnalyserNode | null = null;
  private chunks: BlobPart[] = [];
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;

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
    if (typeof window != "undefined") {
      this.audioContext = new window.AudioContext();
      this.analyzer = this.audioContext.createAnalyser();
    }
  }

  // todo: put start recording into constructor.
  startRecording = () => {
    if (this.audioContext == null) {
      console.warn("Attempt to record audio without audio context");
      return;
    }
    if (this.startTime != 0) {
      console.warn("Attempt to record audio while already recording");
      return;
    }
    this.startTime = Date.now();

    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
        //todo: technically speaking, there should be just one stream, test it

        let mediaRecorder: MediaRecorder;
        if (MediaRecorder.isTypeSupported(this.mediaOptions.mimeType)) {
          mediaRecorder = new MediaRecorder(stream, this.mediaOptions);
        } else {
          mediaRecorder = new MediaRecorder(stream);
        }

        this.onStart && this.onStart();

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          this.chunks.push(event.data);
          this.onData && this.onData(event.data);
        };

        this.audioContext?.resume().then(() => {
          mediaRecorder?.start(10);
          this.audioContext?.createMediaStreamSource(stream).connect(this.analyzer);
        });
      });

      console.log("RECORDER: STARTED");
      return;
    }

    console.error("Your browser does not support audio recording");
  };

  stopRecording() {
    this.mediaRecorder?.stop();
    this.stream?.getAudioTracks().forEach((track: MediaStreamTrack) => track.stop());
    const blob = new Blob(this.chunks, { type: this.mediaOptions.mimeType });

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

export type RecordingData = {
  blob: Blob;
  startTime: number;
  stopTime: number;
  options: MicMediaOptions;
  blobURL: string;
};
