import { Tooltip } from "@material-ui/core";
import styled from "styled-components";

//https://next.material-ui.com/guides/interoperability/#portals
const ArrowTooltip = styled(({ className, children, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}>
    {children}
  </Tooltip>
))`
  .MuiTooltip-arrow {
    color: #000;
  }
  .MuiTooltip-tooltip {
    background-color: #000;
    font-size: 0.75rem;
  }
`;

export default ArrowTooltip;
