import { FC } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import useMobileContext from "~/components/Common/MobileContext/useMobileContext";

const Nav = styled.nav<{ $hidden: boolean }>`
  width: 100%;
  border-bottom: 1px solid #333;
  position: fixed;
  padding: 0.4rem;

  .MuiIconButton-root {
    :last-of-type {
      margin-right: 0.3rem;
    }
    svg {
      fill: ${(props) => props.theme.navText};
      fill-opacity: 0.8;
    }
  }
  display: ${({ $hidden }) => $hidden && "none"};
`;

type Props = {
  openAside: () => void;
};

const NavBar: FC<Props> = ({ openAside }) => {
  const mobile = useMobileContext();
  return (
    <Nav $hidden={!mobile}>
      <IconButton aria-label="menu" size="small" edge="start" onClick={openAside}>
        <MenuIcon />
      </IconButton>
    </Nav>
  );
};

export default NavBar;
