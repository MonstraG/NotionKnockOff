import { FC } from "react";
import styled from "styled-components";

const Main = styled.main`
  flex: 1 1 auto;
`;

const Content: FC = ({ children }) => <Main>{children}</Main>;

export default Content;
