// cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

import { createRef, FC, useEffect, useState } from "react";
import { MicrophoneRecorder, MicrophoneRecorderParams } from "~/components/Mic/lib/MicrophoneRecorder";
import AudioPlayer from "~/components/Mic/lib/AudioPlayer";
import Visualizer from "~/components/Mic/lib/Visualizer";

type VisualType = "sinewave" | "frequencyBars" | "frequencyCircles";

type Props = {
  record: boolean;

  backgroundColor?: string;
  strokeColor?: string;
  className?: string;

  width?: number;
  height?: number;
  visualSetting?: VisualType;

  recorderParams?: MicrophoneRecorderParams;
  audioElem?: HTMLMediaElement;
};

type MicState = {
  microphoneRecorder?: any;
  canvas: HTMLCanvasElement | null;
  canvasCtx: CanvasRenderingContext2D | null;
};

const Mic: FC<Props> = ({
  backgroundColor = "rgba(255, 255, 255, 0.5)",
  strokeColor = "#000000",
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
  record = false,
  width = 640,
  height = 100,
  visualSetting = "sinewave",
  audioElem
}) => {
  const visualizerRef = createRef<HTMLCanvasElement>();
  const [recorder, setRecorder] = useState<MicrophoneRecorder>(new MicrophoneRecorder(recorderParams));
  useEffect(() => {
    setRecorder(new MicrophoneRecorder(recorderParams));
  }, [recorderParams]);
  const [state, setState] = useState<MicState>({
    microphoneRecorder: null,
    canvas: null,
    canvasCtx: null
  });

  useEffect(() => {
    if (recorder) {
      if (record) {
        recorder.startRecording();
        return;
      }

      recorder.stopRecording();
      state.canvasCtx?.clearRect(0, 0, width, height);
    }
  }, [state.canvasCtx, recorder, record, width, height]);

  useEffect(() => {
    if (visualizerRef.current) {
      if (audioElem) {
        AudioPlayer.create(audioElem);
      }
      const canvas = visualizerRef.current;
      setState({
        canvas,
        canvasCtx: canvas?.getContext("2d")
      });
    }
  }, [audioElem, visualizerRef]);

  useEffect(() => {
    if (state.canvas != null) {
      const params = {
        canvasCtx: state.canvasCtx,
        canvas: state.canvas,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        strokeColor: strokeColor
      };
      if (visualSetting === "sinewave") {
        Visualizer.visualizeSineWave(params);
      } else if (visualSetting === "frequencyBars") {
        Visualizer.visualizeFrequencyBars(params);
      } else if (visualSetting === "frequencyCircles") {
        Visualizer.visualizeFrequencyCircles(params);
      }
    }
  }, [backgroundColor, height, state, strokeColor, visualSetting, width]);

  return <canvas ref={visualizerRef} height={height} width={width} className={className} />;
};

export default Mic;
