// cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

import { createRef, FC, useEffect, useState } from "react";
import AudioPlayer from "../libs/AudioPlayer";
import Visualizer from "../libs/Visualizer";
import { MicrophoneRecorder } from "~/components/Mic/MicrophoneRecorder";

type VisualType = "sinewave" | "frequencyBars" | "frequencyCircles";

type Props = {
  backgroundColor?: string;
  strokeColor?: string;
  className?: string;
  audioBitsPerSecond?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  record: boolean;
  visualSetting: VisualType;
  echoCancellation: boolean;
  autoGainControl: boolean;
  noiseSuppression: boolean;
  onStart?: () => void;
  onStop?: () => void;
  onData?: () => void;
  onSave?: () => void;
  audioElem: any;
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
  audioBitsPerSecond = 128000,
  mimeType = "audio/webm;codecs=opus",
  record = false,
  width = 640,
  height = 100,
  visualSetting = "sinewave",
  echoCancellation = false,
  autoGainControl = false,
  noiseSuppression = false,
  audioElem,
  onStart,
  onStop,
  onData,
  onSave
}) => {
  const visualizerRef = createRef<HTMLCanvasElement>();
  const [state, setState] = useState<MicState>({
    microphoneRecorder: null,
    canvas: null,
    canvasCtx: null
  });

  const visualize = () => {
    if (visualSetting === "sinewave") {
      Visualizer.visualizeSineWave(state.canvasCtx, state.canvas, width, height, backgroundColor, strokeColor);
    } else if (visualSetting === "frequencyBars") {
      Visualizer.visualizeFrequencyBars(state.canvasCtx, state.canvas, width, height, backgroundColor, strokeColor);
    } else if (visualSetting === "frequencyCircles") {
      Visualizer.visualizeFrequencyCircles(state.canvasCtx, state.canvas, width, height, backgroundColor, strokeColor);
    }
  };

  useEffect(() => {
    if (state.microphoneRecorder) {
      if (record) {
        state.microphoneRecorder.startRecording();
        return;
      }

      state.microphoneRecorder.stopRecording(onStop);
      state.canvasCtx?.clearRect(0, 0, width, height);
    }
  }, [record]);

  useEffect(() => {
    if (visualizerRef.current) {
      const canvas = visualizerRef.current;
      const canvasCtx = canvas?.getContext("2d");

      if (audioElem) {
        AudioPlayer.create(audioElem);

        setState({
          canvas,
          canvasCtx
        });
      } else {
        const options = {
          audioBitsPerSecond,
          mimeType
        };
        const soundOptions = {
          echoCancellation,
          autoGainControl,
          noiseSuppression
        };
        setState({
          microphoneRecorder: new MicrophoneRecorder(onStart, onStop, onSave, onData, options, soundOptions),
          canvas,
          canvasCtx
        });
      }
    }
  }, [visualizerRef]);

  useEffect(() => {
    if (state.canvas != null) {
      visualize();
    }
  }, [state]);

  return <canvas ref={visualizerRef} height={height} width={width} className={className} />;
};

export default Mic;
