import { FC } from "react";

import styles from "./Content.module.css";

const Content: FC = ({ children }) => <main className={styles.root}>{children}</main>;

export default Content;
