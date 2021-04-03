import { FC, useEffect, useState } from "react";
import styles from "./BlockRow.module.scss";
import Block from "./Block";

type Props = {
  blocks: number;
  onBreakBlock: () => void;
  onBreakRow: () => void;
};

const BlockRow: FC<Props> = ({ blocks, onBreakBlock, onBreakRow }) => {
  const [blocksBroken, setBlocksBroken] = useState<number>(0);

  const onBreak = () => {
    setBlocksBroken((b) => b + 1);
    onBreakBlock();
  };

  useEffect(() => {
    if (blocksBroken == blocks) onBreakRow();
  }, [blocksBroken]);

  return (
    <div className={styles.blockRow}>
      {Array.from(Array(blocks).keys()).map((i) => (
        <Block onBreak={onBreak} key={i} />
      ))}
    </div>
  );
};

export default BlockRow;
