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

export const Label = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <span className={style.label} {...props}>
      {children}
    </span>
  )
}

export const Value = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <span className={style.value} {...props}>
      {children}
    </span>
  )
}

export const Bottom = ({ children, ...props }: { children: ReactNode }) => {
  return <div className={style.bottom}>{children}</div>
}

Card.Action = Action
Card.Label = Label
Card.Value = Value
Card.Bottom = Bottom

export { Card }
