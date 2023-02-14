/** Total order card*/
import { ReactNode } from 'react'
import style from './Card.module.scss'

const Card = ({ children }: { children: ReactNode }) => {
  return <div className={style.box}>{children}</div>
}

export const Action = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={style.button} {...props}>
      {children}
    </button>
  )
}

Card.Action = Action
export { Card }
