import { CSSProperties, FC } from "react";
import Link from "next/link";

export type Style = {
  style?: CSSProperties;
};

export const Linka: FC<{ href: string }> = ({ href, children }) => (
  <Link href={href}>
    <a>{children}</a>
  </Link>
);
