import { FC, useState } from "react";
import styled from "styled-components";
import SpeedDial from "@material-ui/lab/SpeedDial";
import { Create, Mic } from "@material-ui/icons";
import { SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";

const StyledSpeedDial = styled(SpeedDial)`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: #333;
`;

const actions = [
  { icon: <Mic />, name: "Audio" },
  { icon: <Create />, name: "Page" }
];

const CreateFab: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <StyledSpeedDial
      ariaLabel="SpeedDial create"
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
      FabProps={{
        color: "inherit"
      }}>
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
      ))}
    </StyledSpeedDial>
  );
};

export default CreateFab;
