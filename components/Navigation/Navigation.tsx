import { FC } from "react";
import styles from "./Navigation.module.css";
import { Linka } from "~/utils/common";

const Navigation: FC = () => (
  <header className={styles.root}>
    <div className={styles.currLogo}>¤</div>
    <nav className={styles.right}>
      <Linka href="/">Home</Linka>
      <Linka href="/about">About</Linka>
    </nav>
  </header>
);

export default Navigation;
