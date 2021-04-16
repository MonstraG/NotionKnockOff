import styled from "styled-components";

const Preview = styled.div`
  width: 50%;
  background-color: #222;

  pre,
  code {
    font-family: "JetBrains Mono", Menlo, Monaco, "Courier New", monospace;
  }

  pre {
    padding: 0.5rem;
    line-height: 1.25;
    overflow-x: scroll;
  }

  a,
  a:visited {
    color: #3498db;
    :hover,
    :focus,
    :active {
      color: #2980b9;
    }
  }

  @media screen and (min-width: 32rem) and (max-width: 48rem) {
    font-size: 15px;
  }

  @media screen and (min-width: 48rem) {
    font-size: 16px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: inherit;
  }

  h1 {
    font-size: 3.5rem;
    margin: 0.5rem 0 2rem;
  }

  h2 {
    font-size: 3rem;
    margin: 0 0 1.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  h6 {
    font-size: 1rem;
  }

  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 1rem;
  }

  small {
    font-size: 0.875rem;
  }

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  font-size: 18px;
  max-width: 100%;

  color: rgba(255, 255, 255, 0.87);
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 300;
  margin: 0 auto;
  padding: 0.5rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Helvetica, sans-serif;
  }

  blockquote {
    border-left: 8px solid #707070;
    padding: 1rem;
  }

  pre,
  code {
    background-color: #707070;
  }
`;

export default Preview;
