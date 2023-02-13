import * as Dialog from '@radix-ui/react-dialog'
import style from './Modal.module.scss'

import React, { forwardRef } from 'react'

const Modal = ({ children, ...props }: Dialog.DialogProps) => {
  return <Dialog.Root {...props}>{children}</Dialog.Root>
}
export const Portal = ({ children, ...props }: Dialog.DialogPortalProps) => (
  <Dialog.Portal {...props}>
    <Dialog.Overlay className={style.overlay} />
    {children}
  </Dialog.Portal>
)
export const Content = forwardRef<
  React.ForwardRefExoticComponent<
    Dialog.DialogContentProps & React.RefAttributes<HTMLDivElement>
  >,
  Dialog.DialogContentProps
>(({ children, ...props }, _) => {
  return (
    <Dialog.Content className={style.content} {...props}>
      {children}
    </Dialog.Content>
  )
})

export const Close = ({ children, ...props }: Dialog.DialogCloseProps) => (
  <Dialog.Close {...props}>{children}</Dialog.Close>
)

export const Trigger = ({ children, ...props }: Dialog.DialogTriggerProps) => {
  return <Dialog.Trigger {...props}>{children}</Dialog.Trigger>
}

Modal.Portal = Portal
Modal.Content = Content
Modal.Close = Close
Modal.Trigger = Trigger

export { Modal }
