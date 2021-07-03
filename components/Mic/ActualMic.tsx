import { FC, useState } from "react";
import ReactMic from "~/components/Mic/ReactMic";
import { Button } from "@material-ui/core";

const ActualMic: FC = () => {
  const [record, setRecord] = useState<boolean>(false);
  const toggleRecord = () => setRecord((prev) => !prev);

  return (
    <>
      <Button onClick={toggleRecord} variant="contained">
        {record ? "Stop recording" : "Start recording"}
      </Button>
      <ReactMic
        record={record}
        recorderParams={{
          mediaOptions: {
            audioBitsPerSecond: 128000,
            mimeType: "audio/webm;codecs=opus"
          },
          soundOptions: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            channelCount: 2
          },
          // onData: (blob) => console.log("blob", blob),
          onSave: (blobData) => console.log("Save blobData", blobData),
          onStop: (blobData) => console.log("Stop blobData", blobData),
          onStart: () => console.log("start")
        }}
      />
    </>
  );
};

export default ActualMic;
