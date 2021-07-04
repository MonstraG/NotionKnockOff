import { FC, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import RecordingStore from "~/components/Mic/RecordingStore";
import Visualizer from "~/components/Mic/Visualizer";

const AudioRecordings: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [record, setRecord] = useState<boolean>(false);
  const toggleRecord = () => {
    if (loading) return;
    setRecord((wasRecoding) => {
      if (wasRecoding) {
        storeRecording(RecordingStore.stop());
      } else {
        RecordingStore.start();
      }
      return !wasRecoding;
    });
  };

  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);

  const storeRecording = (recordingData: RecordingStore.Data) => {
    setLoading(true);
    setAudioSrc(recordingData.blobUrl);

    fetch(`/api/recordings/newRecording`, {
      body: recordingData.blob,
      method: "POST"
    }).finally(() => setLoading(false));
  };

  return (
    <>
      <Button onClick={toggleRecord} variant="contained">
        {loading ? <CircularProgress size="24px" /> : record ? "Stop recording" : "Start recording"}
      </Button>
      {record && <Visualizer width={250} height={100} backgroundColor={"#555"} strokeColor={"#800080"} />}

      <audio controls={Boolean(audioSrc)} src={audioSrc} />
    </>
  );
};

export default AudioRecordings;
