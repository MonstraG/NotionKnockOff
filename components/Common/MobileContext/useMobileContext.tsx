import { useContext } from "react";
import MobileContext from "~/components/Common/MobileContext/MobileContext";

const useMobileContext = () => {
  const mobile = useContext(MobileContext);
  if (mobile == null) {
    throw `useMobileContext must be used within it's provider`;
  }
  return mobile;
};

export default useMobileContext;
