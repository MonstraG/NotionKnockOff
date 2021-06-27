import styled from "styled-components";
import { FC } from "react";

const SpinnerStyled = styled.div`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;

  border: 0.375rem solid #ffffff33;
  border-left: 0.375rem solid #ffffff;
  animation: load 1s infinite linear;

  @keyframes load {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Centered = styled.div`
  display: flex;

  //to be centered in both axis
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Spinner: FC = () => (
  <Centered>
    <SpinnerStyled />
  </Centered>
);
