import * as Dialog from '@radix-ui/react-dialog'

import style from './Modal.module.scss'

import React from 'react'

const Modal = ({ children, ...props }: Dialog.DialogProps) => {
  return <Dialog.Root {...props}>{children}</Dialog.Root>
}

export const Content = React.forwardRef<
  HTMLDivElement | null,
  Dialog.DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <Dialog.Portal>
    <Dialog.Overlay className={style.overlay} />
    <Dialog.Content className={style.content} {...props} ref={forwardedRef}>
      {children}
    </Dialog.Content>
  </Dialog.Portal>
))

export const Close = ({ children, ...props }: Dialog.DialogCloseProps) => (
  <Dialog.Close {...props}>{children}</Dialog.Close>
)

export const Trigger = ({ children, ...props }: Dialog.DialogTriggerProps) => {
  return <Dialog.Trigger {...props}>{children}</Dialog.Trigger>
}

Modal.Content = Content
Modal.Close = Close
Modal.Trigger = Trigger

export { Modal }
