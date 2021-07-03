import { FC, useRef, useState } from "react";
import ReactMic from "~/components/Mic/ReactMic";
import { Button, CircularProgress } from "@material-ui/core";
import { RecordingData } from "~/components/Mic/lib/MicrophoneRecorder";

const ActualMic: FC = () => {
  const [record, setRecord] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toggleRecord = () => setRecord((prev) => !prev);
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const storeRecording = (recordingData: RecordingData) => {
    setLoading(true);
    if (playerRef.current) {
      playerRef.current.src = recordingData.blobURL;
      playerRef.current?.play();
    }

    fetch(`/api/recordings/newRecording`, {
      body: recordingData.blob,
      method: "POST"
    }).finally(() => setLoading(false));
  };

  return (
    <>
      <Button onClick={toggleRecord} variant="contained">
        {loading ? <CircularProgress /> : record ? "Stop recording" : "Start recording"}
      </Button>
      <ReactMic
        record={record}
        recorderParams={{
          mediaOptions: {
            audioBitsPerSecond: 128000,
            mimeType: "audio/ogg;codecs:opus"
          },
          soundOptions: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            channelCount: 2
          },
          onSave: storeRecording,
          onStop: (blobData) => console.log("Stop blobData", blobData),
          onStart: () => console.log("start")
        }}
      />
      <audio controls ref={playerRef} />
    </>
  );
};

export default ActualMic;
