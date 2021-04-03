import Link from "next/link";
import { FC } from "react";

import styles from "./Navigation.module.css";

const Navigation: FC = () => (
  <header className={styles.root}>
    <div className={styles.currLogo}>¤</div>
    <nav className={styles.right}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  </header>
);

export default Navigation;
