import { createRef, FC, useEffect } from "react";
import RecordingStore from "~/components/Mic/RecordingStore";

const visualize = ({ analyzer, canvasCtx, width, height, backgroundColor, strokeColor }: VisualizeProps) => {
  analyzer.fftSize = 256;
  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, width, height);

  const draw = () => {
    requestAnimationFrame(draw);
    analyzer.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = backgroundColor;
    canvasCtx.fillRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      canvasCtx.fillStyle = strokeColor;
      canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }
  };
  draw();
};

export type VisualizerProps = {
  width: number;
  height: number;
  backgroundColor: string;
  strokeColor: string;
};

type VisualizeProps = VisualizerProps & {
  canvasCtx: CanvasRenderingContext2D;
  analyzer: AnalyserNode;
};

const Visualizer: FC<VisualizerProps> = (props) => {
  const { analyzer } = RecordingStore.useContextStore();
  const visualizerRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (visualizerRef.current != null && analyzer != null) {
      const canvasCtx = visualizerRef.current!.getContext("2d");
      if (canvasCtx != null) {
        visualize({ canvasCtx, analyzer, ...props });
      }
    }
  }, [props, visualizerRef, analyzer]);

  const { width, height } = props;
  return <canvas ref={visualizerRef} height={height} width={width} />;
};

export default Visualizer;
