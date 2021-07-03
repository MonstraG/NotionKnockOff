import AudioContextObject from "~/components/Mic/lib/AudioContextObject";

let audioSource: MediaElementAudioSourceNode;

const AudioPlayer = {
  create(audioElem: HTMLMediaElement) {
    const audioCtx = AudioContextObject.getAudioContext();
    const analyser = AudioContextObject.getAnalyser();

    if (audioSource === undefined) {
      const source = audioCtx.createMediaElementSource(audioElem);
      source.connect(analyser);
      audioSource = source;
    }

    analyser.connect(audioCtx.destination);
  }
};

export default AudioPlayer;
