import { FC, useState } from "react";
import ReactMic from "~/components/Mic/ReactMic";
import { Button, CircularProgress } from "@material-ui/core";
import { RecordingData } from "~/components/Mic/lib/MicrophoneRecorder";

const Recorder: FC = () => {
  const [record, setRecord] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toggleRecord = () => {
    if (!loading) {
      setRecord((prev) => !prev);
    }
  };
  const [audioSrc, setAudioSrc] = useState<string>("");

  const storeRecording = (recordingData: RecordingData) => {
    setLoading(true);
    setAudioSrc(recordingData.blobURL);

    fetch(`/api/recordings/newRecording`, {
      body: recordingData.blob,
      method: "POST"
    }).finally(() => setLoading(false));
  };

  return (
    <>
      <Button onClick={toggleRecord} variant="contained">
        {loading ? <CircularProgress size={"24px"} /> : record ? "Stop recording" : "Start recording"}
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
          onSave: storeRecording
        }}
      />
      <audio controls={Boolean(audioSrc)} src={audioSrc} />
    </>
  );
};

export default Recorder;
