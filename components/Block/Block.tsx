import { CSSProperties, FC, useEffect, useState } from "react";
import { Style } from "~/utils/Style";
import styles from "./Block.module.css"

const crackDisplay = (crackN: number) => (curr: number) => curr >= crackN ? "block" : "none";
const isBroken = (curr: number) => curr >= 5;

type Props = {
  onBreak: () => void;
}

const Block: FC<Props & Style> = ({ style, onBreak }) => {
  const [state, setState] = useState<number>(0);
  const breakMore = () => setState((s) => s + 1);

  useEffect(() => {
    if (isBroken(state)) {
      onBreak();
      setTimeout(() => setState(0), 1200) //same as animation duration
    }
  }, [state])

  return (
    <div style={style} className={`${isBroken(state) && styles.falling}`}>
      <div className={styles.block} onClick={breakMore}>
        <div className={`${styles.crack} ${styles.c1}`} style={{ display: crackDisplay(1)(state) }} />
        <div className={`${styles.crack} ${styles.c2}`} style={{ display: crackDisplay(2)(state) }} />
        <div className={`${styles.crack} ${styles.c3}`} style={{ display: crackDisplay(3)(state) }} />
        <div className={`${styles.crack} ${styles.c4}`} style={{ display: crackDisplay(4)(state) }} />
      </div>
    </div>
  )
}

export default Block;
