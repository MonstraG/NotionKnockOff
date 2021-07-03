import { FC, useState } from "react";
import ReactMic from "~/components/Mic/ReactMic";
import { Button } from "@material-ui/core";

const ActualMic: FC = () => {
  const [record, setRecord] = useState<boolean>(false);
  const toggleRecord = () => setRecord((prev) => !prev);

  return (
    <>
      <Button onClick={toggleRecord} variant="contained">
        {record ? "Start recording" : "stop recording"}
      </Button>
      <ReactMic record={record} />
    </>
  );
};

export default ActualMic;
