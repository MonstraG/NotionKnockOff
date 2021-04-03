import Head from "next/head";
import { FC } from "react";

import styles from "./Page.module.css";

interface PageProps {
  title?: string;
}

const Page: FC<PageProps> = ({ children, title }) => (
  <div className={styles.root}>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </div>
);

export default Page;
