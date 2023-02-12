import * as Dialog from '@radix-ui/react-dialog'
import style from './Modal.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    code: yup.string().required('Marketing campaing code is required'),
    date: yup.date().required('Acquisition orders date is required'),
    orders: yup.string().matches(/^\d+(,\d+)*$/, {
      message:
        'Orders can be a single number or numbers splitted by comma. Example 1,2,5',
    }),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data) => console.log(data)

  return (
    <Dialog.Root>
      <Dialog.Trigger className={style.addMetricBtn}>
        Add new metric
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={style.overlay} />
        <Dialog.Content className={style.content}>
          <fieldset className={style.fieldset}>
            <label className={style.label} htmlFor="code">
              Marketing campaign code
            </label>
            <input className={style.input} id="code" {...register('code')} />
            <p className={style.error}>{errors.code?.message}</p>
          </fieldset>
          <fieldset className={style.fieldset}>
            <label className={style.label} htmlFor="date">
              Acquisition orders date
            </label>
            <input
              className={style.input}
              id="date"
              type="date"
              {...register('date')}
            />
            <p className={style.error}>{errors.date?.message}</p>
          </fieldset>
          <fieldset className={style.fieldset}>
            {/* TODO: Add tooltip to explain what orders mean*/}
            <label className={style.label} htmlFor="orders">
              Orders
            </label>
            <input
              className={style.input}
              id="orders"
              {...register('orders')}
            />
            <p className={style.error}>{errors.orders?.message}</p>
          </fieldset>
          <Dialog.Close asChild>
            <button className={style.addMetricBtn} onSubmit={onSubmit}>
              Add metric
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
