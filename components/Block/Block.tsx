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

  // todo: refactor to use minimum amount of DOM elements ?

  const appliedStyles = isBroken(state) ? undefined : style;

  return (
    <div style={appliedStyles} className={`${styles.container} ${isBroken(state) && styles.broken}`}>
      <div className={styles.block} onPointerDown={breakMore}>
        <div className={`${styles.crack} ${styles.c1}`} style={{ display: crackDisplay(1)(state) }} />
        <div className={`${styles.crack} ${styles.c2}`} style={{ display: crackDisplay(2)(state) }} />
        <div className={`${styles.crack} ${styles.c3}`} style={{ display: crackDisplay(3)(state) }} />
        <div className={`${styles.crack} ${styles.c4}`} style={{ display: crackDisplay(4)(state) }} />
      </div>
      <div className={styles.fragments}>
        <div className={`${styles.fragment} ${styles.f1}`} />
        <div className={`${styles.fragment} ${styles.f2}`} />
        <div className={`${styles.fragment} ${styles.f3}`} />
        <div className={`${styles.fragment} ${styles.f4}`} />
      </div>
    </div>
  )
}

export default Block;
