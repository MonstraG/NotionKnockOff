import { FC } from "react";
import { Linka } from "~/utils/common";
import styled from "styled-components";

const Root = styled.header`
  display: flex;
  flex-direction: row;
  padding: 0.75rem 1.5rem;
  background-color: black;
  color: white;
`;

const Logo = styled.div`
  margin-right: 1.5rem;
  user-select: none;
  font-size: 2rem;
  line-height: 0.9rem;
`;

const Nav = styled.nav`
  flex: 1 1 auto;
`;

const NavLink = styled(Linka)`
  color: white;
  text-decoration: none;
  margin: 0 0.75rem;
  :hover,
  :focus {
    text-decoration: underline;
  }
  :first-child {
    margin-left: 0;
  }
  :last-child {
    margin-right: 0;
  }
`;

const Navigation: FC = () => (
  <Root>
    <Logo>¤</Logo>
    <Nav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
    </Nav>
  </Root>
);

export default Navigation;
