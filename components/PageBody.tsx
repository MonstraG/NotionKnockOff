import { FC } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 0 1.5rem 2rem;
`;

const PageBody: FC = ({ children }) => <Section>{children}</Section>;

export default PageBody;
