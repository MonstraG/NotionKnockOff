import { createContext, FC, useEffect, useState } from "react";

const MobileContext = createContext<boolean>(false);

export const MobileContextProvider: FC = ({ children }) => {
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      const onResize = () => setMobile(window.innerWidth < 768);
      onResize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

  return <MobileContext.Provider value={mobile}>{children}</MobileContext.Provider>;
};

export default MobileContext;
