import styled from "styled-components";

export const Spinner = styled.div`
  &,
  &:after {
    border-radius: 50%;
    width: 5em;
    height: 5em;
  }

  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.5em solid rgba(255, 255, 255, 0.2);
  border-right: 0.5em solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.5em solid rgba(255, 255, 255, 0.2);
  border-left: 0.5em solid #ffffff;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;

  @-webkit-keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const CenteredSpinner = () => (
  <Centered>
    <Spinner />
  </Centered>
);
