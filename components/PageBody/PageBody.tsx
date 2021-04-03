import { FC } from "react";
import styles from "./PageBody.module.css";

const PageBody: FC = ({ children }) => <section className={styles.root}>{children}</section>;

export default PageBody;
