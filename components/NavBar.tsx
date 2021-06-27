import { FC } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";

const Nav = styled.nav`
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
`;

const NavBar: FC = () => {
  return (
    <Nav>
      <IconButton aria-label="menu" size="small" edge="start">
        <MenuIcon />
      </IconButton>
    </Nav>
  );
};

export default NavBar;
