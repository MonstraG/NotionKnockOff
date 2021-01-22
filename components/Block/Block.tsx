import { FC, useEffect, useState } from "react";
import { Style } from "~/utils/Style";
import styles from "./Block.module.scss"

const crackDisplay = (crackN: number) => (curr: number) => curr >= crackN ? "block" : "none";
const isBroken = (curr: number) => curr >= 5;

type Props = {
  onBreak: () => void;
}

const Block: FC<Props & Style> = ({ style, onBreak }) => {
  const [state, setState] = useState<number>(0);
  const breakMore = () => setState((s) => Math.min(s + 1, 5));

  useEffect(() => {
    if (isBroken(state)) {
      onBreak();
      setTimeout(() => setState(0), 1200) //same as animation duration
    }
  }, [state]);

  const appliedStyles = isBroken(state) ? undefined : style;

  return (
    <div style={appliedStyles} className={`${styles.container} ${isBroken(state) && styles.broken}`}>
      <div className={isBroken(state) ? styles.fragmets : styles.block} onPointerDown={breakMore}>
        <div className={`${styles.part} ${styles.p1}`} style={{ display: crackDisplay(1)(state) }} />
        <div className={`${styles.part} ${styles.p2}`} style={{ display: crackDisplay(2)(state) }} />
        <div className={`${styles.part} ${styles.p3}`} style={{ display: crackDisplay(3)(state) }} />
        <div className={`${styles.part} ${styles.p4}`} style={{ display: crackDisplay(4)(state) }} />
      </div>
    </div>
  )
}

export default Block;
