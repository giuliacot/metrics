/** Total order card*/
import { forwardRef, ReactNode } from 'react'
import style from './Card.module.scss'

const Card = ({ children }: { children: ReactNode }) => {
  return <div className={style.box}>{children}</div>
}

/** To solve warning on RadixUI: https://github.com/radix-ui/primitives/issues/1013*/
const Action = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, forwardedRef) => {
  return (
    <button className={style.button} {...props} ref={forwardedRef}>
      {children}
    </button>
  )
})

const Label = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <span className={style.label} {...props}>
      {children}
    </span>
  )
}

const Value = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <span className={style.value} {...props}>
      {children}
    </span>
  )
}

const Bottom = ({ children, ...props }: { children: ReactNode }) => {
  return <div className={style.bottom}>{children}</div>
}

Card.Action = Action
Card.Label = Label
Card.Value = Value
Card.Bottom = Bottom

export { Card }
