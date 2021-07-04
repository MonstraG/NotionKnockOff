import AudioContextObject from "./AudioContextObject";

export type VisualizerParams = {
  width: number;
  height: number;
  backgroundColor: string;
  strokeColor: string;
  visualizationType: VisualizationType;
};

type VisualizeProps = VisualizerParams & {
  canvasCtx: any;
  canvas: any;
};

type VisualizationStyleProps = Omit<VisualizeProps, "visualizationType">;

export type VisualizationType = "sinewave" | "frequencyBars" | "frequencyCircles";

const Visualizer = {
  visualize({ visualizationType, ...props }: VisualizeProps) {
    if (visualizationType === "sinewave") {
      Visualizer.visualizeSineWave(props);
    }
    if (visualizationType === "frequencyBars") {
      Visualizer.visualizeFrequencyBars(props);
    }
    if (visualizationType === "frequencyCircles") {
      Visualizer.visualizeFrequencyCircles(props);
    }
  },

  visualizeSineWave({ canvasCtx, canvas, width, height, backgroundColor, strokeColor }: VisualizationStyleProps) {
    let analyser = AudioContextObject.getAnalyser();
    if (analyser == null) {
      console.log("VISUALIZER: WARN: attempt to visualize with undefined analyzer");
      return;
    }

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, width, height);

    requestAnimationFrame(() => {
      analyser = AudioContextObject.getAnalyser();
      if (analyser == null) {
        console.log("VISUALIZER: WARN: attempt to visualize with undefined analyzer");
        return;
      }

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = backgroundColor;
      canvasCtx.fillRect(0, 0, width, height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = strokeColor;

      canvasCtx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    });
  },

  visualizeFrequencyBars({ canvasCtx, width, height, backgroundColor, strokeColor }: VisualizationStyleProps) {
    let analyser = AudioContextObject.getAnalyser();
    if (analyser == null) {
      console.log("VISUALIZER: WARN: attempt to visualize with undefined analyzer");
      return;
    }
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, width, height);

    requestAnimationFrame(() => {
      analyser = AudioContextObject.getAnalyser();
      if (analyser == null) {
        console.log("VISUALIZER: WARN: attempt to visualize with undefined analyzer");
        return;
      }
      analyser.getByteFrequencyData(dataArray);

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
    });
  },

  visualizeFrequencyCircles({ canvasCtx, width, height, backgroundColor, strokeColor }: VisualizationStyleProps) {
    let analyser = AudioContextObject.getAnalyser();
    if (analyser == null) {
      console.log("attempt to visualize with undefined analyzer");
      return;
    }
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, width, height);

    requestAnimationFrame(() => {
      analyser = AudioContextObject.getAnalyser();
      if (analyser == null) {
        console.log("VISUALIZER: WARN: attempt to visualize with undefined analyzer");
        return;
      }
      analyser.getByteFrequencyData(dataArray);
      const reductionAmount = 3;
      const reducedDataArray = new Uint8Array(bufferLength / reductionAmount);

      for (let i = 0; i < bufferLength; i += reductionAmount) {
        let sum = 0;
        for (let j = 0; j < reductionAmount; j++) {
          sum += dataArray[i + j];
        }
        reducedDataArray[i / reductionAmount] = sum / reductionAmount;
      }

      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.beginPath();
      canvasCtx.arc(width / 2, height / 2, Math.min(height, width) / 2, 0, 2 * Math.PI);
      canvasCtx.fillStyle = backgroundColor;
      canvasCtx.fill();
      const stepSize = Math.min(height, width) / 2.0 / reducedDataArray.length;
      canvasCtx.strokeStyle = strokeColor;

      for (let i = 0; i < reducedDataArray.length; i++) {
        canvasCtx.beginPath();
        const normalized = reducedDataArray[i] / 128;
        const r = stepSize * i + stepSize * normalized;
        canvasCtx.arc(width / 2, height / 2, r, 0, 2 * Math.PI);
        canvasCtx.stroke();
      }
    });
  }
};

export default Visualizer;
