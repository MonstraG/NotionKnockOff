import { FC } from "react";
import styles from "./PageHeader.module.css";

const PageHeader: FC = ({ children }) => (
  <header className={styles.root}>
    <h1 className={styles.title}>{children}</h1>
  </header>
);

export default PageHeader;
