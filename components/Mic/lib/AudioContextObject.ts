let audioCtx: AudioContext | null = null;
if (typeof window !== "undefined") {
  audioCtx = new window.AudioContext();
}
let analyser: AnalyserNode | undefined = audioCtx?.createAnalyser();

const AudioContextObject = {
  getAudioContext(): AudioContext | null {
    return audioCtx;
  },

  getAnalyser(): AnalyserNode | undefined {
    return analyser;
  },

  resetAnalyser() {
    analyser = audioCtx?.createAnalyser();
  }
};

export default AudioContextObject;
