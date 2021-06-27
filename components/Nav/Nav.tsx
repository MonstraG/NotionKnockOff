import { FC, useState } from "react";
import useMobileContext from "~/components/Common/MobileContext/useMobileContext";
import { Backdrop } from "@material-ui/core";
import NavAside, { StyledAside } from "~/components/Nav/NavAside";
import styled, { css } from "styled-components";
import NavBar from "~/components/Nav/NavBar";

const AsideWrapper = styled.div<{ $open: boolean; $mobile: boolean }>`
  height: 100vh;
  width: 100vw;
  ${({ $mobile, $open }) =>
    $mobile &&
    css`
      transition: 0.2s all;
      position: absolute;
      top: 0;
      left: -250px;

      ${() =>
        $open &&
        css`
          left: 0;
        `}
    `}
  ${StyledAside} {
    height: 100%;
    width: 90%;
  }
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: 1;
`;

const Nav: FC = () => {
  const mobile = useMobileContext();
  const [asideOpen, setAsideOpen] = useState<boolean>(false);

  if (!mobile) {
    return <NavAside />;
  }

  const openAside = () => setAsideOpen(true);
  const closeAside = () => setAsideOpen(false);

  return (
    <>
      <NavBar openAside={openAside} />
      <StyledBackdrop open={asideOpen} onClick={closeAside}>
        <AsideWrapper $mobile={mobile} $open={asideOpen}>
          <NavAside />
        </AsideWrapper>
      </StyledBackdrop>
    </>
  );
};

export default Nav;
