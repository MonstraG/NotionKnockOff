import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

const Header = styled.header`
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

const NavLink = styled.a`
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
  cursor: pointer;
`;

const NavBar: FC = () => (
  <Header>
    <Logo>¤</Logo>
    <Nav>
      <Link href="/">
        <NavLink>Home</NavLink>
      </Link>
      <Link href="/about">
        <NavLink>About</NavLink>
      </Link>
    </Nav>
  </Header>
);

export default NavBar;
