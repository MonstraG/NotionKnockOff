import { CSSProperties, FC } from "react"
import styles from "./Button.module.css"


type Props = {
  style?: CSSProperties;
  cb?: () => void;
}

const Button: FC<Props> = ({ children, style, cb }) => {
  return (
    <button className={styles.button} style={style} onClick={cb}>{children}</button>
  )
}

export default Button;
