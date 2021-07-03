// cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

import { createRef, FC, useEffect } from "react";
import { MicrophoneRecorder, MicrophoneRecorderParams } from "~/components/Mic/lib/MicrophoneRecorder";
import AudioPlayer from "~/components/Mic/lib/AudioPlayer";
import Visualizer, { VisualizerParams } from "~/components/Mic/lib/Visualizer";

type Props = {
  record: boolean;
  className?: string;
  visualizerParams?: VisualizerParams;
  recorderParams?: MicrophoneRecorderParams;
  audioElem?: HTMLMediaElement;
};

const Mic: FC<Props> = ({
  className = "visualizer",
  recorderParams = {
    mediaOptions: {
      audioBitsPerSecond: 128000,
      mimeType: "audio/webm;codecs=opus"
    },
    soundOptions: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      channelCount: 2
    }
  },
  visualizerParams = {
    width: 250,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    strokeColor: "#000000",
    visualizationType: "sinewave"
  },
  record = false,
  audioElem
}) => {
  const visualizerRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (record) {
      const recorder = new MicrophoneRecorder(recorderParams);
      recorder.startRecording();
      return () => recorder.stopRecording();
    }
  }, [recorderParams, record]);

  useEffect(() => {
    if (visualizerRef.current != null) {
      if (audioElem) {
        AudioPlayer.create(audioElem);
      }
      Visualizer.visualize({
        canvas: visualizerRef.current,
        canvasCtx: visualizerRef.current.getContext("2d"),
        ...visualizerParams
      });
    }
  }, [visualizerParams, visualizerRef, audioElem]);

  const { width, height } = visualizerParams;
  return <canvas ref={visualizerRef} height={height} width={width} className={className} />;
};

export default Mic;
