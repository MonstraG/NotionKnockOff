import { FC } from "react";
import styled from "styled-components";

const Header = styled.header`
  padding: 2rem 1.5rem 1rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const PageHeader: FC = ({ children }) => (
  <Header>
    <Title>{children}</Title>
  </Header>
);

export default PageHeader;