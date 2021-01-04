import { FC } from 'react'
import styles from './PageBody.module.css'

const PageBody: FC = ({ children }) => {
  return <section className={styles.root}>{children}</section>
}

export default PageBody
