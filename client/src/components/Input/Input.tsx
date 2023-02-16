import {
  createContext,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useContext,
} from 'react'
import style from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement>
type LabelProps = LabelHTMLAttributes<HTMLLabelElement>
interface RootProps extends HTMLAttributes<HTMLDivElement> {
  type: 'small' | 'normal'
  iconDir: 'right' | 'left'
}

const InputContext = createContext<{
  type: 'small' | 'normal'
  dir: 'right' | 'left'
}>({
  type: 'small',
  dir: 'right',
})

const Input = ({ children, className, ...props }: InputProps) => {
  const { type } = useContext(InputContext)
  return (
    <input
      className={`${style[`input-${type}`]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </input>
  )
}

const Root = ({ children, type, iconDir, className, ...props }: RootProps) => {
  return (
    <InputContext.Provider value={{ type, dir: iconDir }}>
      <div className={`${style.wrapper} ${className ?? ''}`}>{children}</div>
    </InputContext.Provider>
  )
}

const Icon = ({ children }: { children: ReactNode }) => {
  const { type, dir } = useContext(InputContext)
  return <span className={style[`icon-${dir}-${type}`]}>{children}</span>
}

const Label = ({ children, ...props }: LabelProps) => {
  return <label {...props}>{children}</label>
}

const Error = ({ children }: { children: ReactNode }) => {
  return <p className={style.error}>{children}</p>
}

Input.Label = Label
Input.Icon = Icon
Input.Error = Error
Input.Root = Root

export { Input }
