const audioCtx = new window.AudioContext();
let analyser = audioCtx.createAnalyser();

const AudioContextObject = {
  getAudioContext(): AudioContext {
    return audioCtx;
  },

  getAnalyser(): AnalyserNode {
    return analyser;
  },

  resetAnalyser() {
    analyser = audioCtx.createAnalyser();
  }
};

export default AudioContextObject;
