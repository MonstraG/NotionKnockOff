import AudioContextObject from "~/components/Mic/lib/AudioContextObject";

let audioSource: MediaElementAudioSourceNode;

const AudioPlayer = {
  create(audioElem: HTMLMediaElement) {
    const audioCtx: AudioContext | null = AudioContextObject.getAudioContext();
    const analyser: AnalyserNode | undefined = AudioContextObject.getAnalyser();

    if (audioCtx == null || analyser == null) {
      console.log("attempt to AudioPlayer.Create on undefined analyzer or audioContext", { audioCtx, analyser });
      return;
    }

    if (audioSource === undefined) {
      const source = audioCtx?.createMediaElementSource(audioElem);
      source.connect(analyser);
      audioSource = source;
    }

    analyser.connect(audioCtx.destination);
  }
};

export default AudioPlayer;
