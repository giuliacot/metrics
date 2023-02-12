/** Total order card*/
import { ReactNode } from 'react'
import style from './Card.module.scss'
export const Card = ({ children }: { children: ReactNode }) => {
  return <div className={style.box}>{children}</div>
}
