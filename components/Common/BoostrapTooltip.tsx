import { makeStyles, Theme, Tooltip, TooltipProps } from "@material-ui/core";
import { FC } from "react";

//todo: replace with styled components

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: "0.75rem"
  }
}));

const BootstrapTooltip: FC<TooltipProps> = ({ children, ...props }) => {
  const classes = useStylesBootstrap();

  return (
    <Tooltip arrow classes={classes} {...props}>
      {children}
    </Tooltip>
  );
};

export default BootstrapTooltip;
