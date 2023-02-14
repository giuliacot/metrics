import {
  AddUpdateMetricFormData,
  schema,
  structureMetricToUpdate,
} from './formSchema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import style from './MetricSetup.module.scss'
import { Metric } from './MetricsSetup'
import { ReactNode, useEffect, useReducer, useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { initReducer, reducer } from './reducer'
import { formatDatePicker } from '../../utils/formatDatePicker'
import * as Toast from '@radix-ui/react-toast'
import { TOAST_DURATION_TIME } from '../../utils/consts'

export const EditMetric = ({
  metric,
  children,
}: {
  metric: Metric
  children: ReactNode
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [{ done, error }, dispatch] = useReducer(reducer, initReducer)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUpdateMetricFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const { mutate: updateMetricMutate } = useMutation({
    mutationFn: async (data: Metric) => {
      const res = await axios.put(`http://localhost:8080/metric/${data.id}`, {
        ...data,
      })
      return res.data
    },
  })

  const onSubmit = (data: AddUpdateMetricFormData) => {
    const updatedMetric = structureMetricToUpdate(data)
    updateMetricMutate(updatedMetric, {
      onSuccess: () => {
        dispatch({ type: 'onSuccess' })
        const oldMetrics = queryClient.getQueryData<Metric[]>(['metrics'])

        const updated = oldMetrics
          ? oldMetrics.map((m) => {
              if (m.id === data.id) {
                return { ...m, ...updatedMetric }
              }
              return m
            })
          : oldMetrics

        console.log(updated, updatedMetric)

        queryClient.setQueryData(['metrics'], () => {
          return updated
        })
        setOpenModal(false)
      },
      onError: (response) => {
        dispatch({ type: 'onError' })
        console.error(response)
        setOpenModal(false)
      },
    })
  }

  useEffect(() => {
    let id: number
    if (done || error) {
      id = setTimeout(() => {
        dispatch({ type: 'onReset' })
      }, TOAST_DURATION_TIME)
    }
    return () => clearTimeout(id)
  }, [done, error])

  const formattedOrders = metric.amounts
    ? metric.amounts.reduce((acc, v) => (acc ? `${acc},${v}` : `${v}`), '')
    : []

  const formattedDate = formatDatePicker(metric.date)

  return (
    <>
      <Modal open={openModal} onOpenChange={setOpenModal}>
        <Modal.Trigger asChild>{children}</Modal.Trigger>
        <Modal.Content>
          <>
            <h4>Edit metric</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className={style.fieldset}>
                <input
                  hidden
                  id="id"
                  {...register('id')}
                  defaultValue={metric.id}
                />
              </fieldset>
              <fieldset className={style.fieldset}>
                <label className={style.label} htmlFor="code">
                  Marketing campaign code
                </label>
                <input
                  className={style.input}
                  id="code"
                  {...register('code')}
                  defaultValue={metric.code}
                />
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
                  defaultValue={formattedDate}
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
                  id="amounts"
                  {...register('amounts')}
                  defaultValue={formattedOrders}
                />
                <p className={style.error}>{errors.amounts?.message}</p>
              </fieldset>
              <button type="submit" className={style.addMetricBtn}>
                Save
              </button>
            </form>
          </>
        </Modal.Content>
      </Modal>
      {done && (
        <Toast.Root className={style.toastRoot} duration={TOAST_DURATION_TIME}>
          <Toast.Description>Edited! ✨</Toast.Description>
        </Toast.Root>
      )}
      {error && (
        <Toast.Root className={style.toastRoot} duration={TOAST_DURATION_TIME}>
          <Toast.Description>
            Oh no! Something went wrong during on edit 🥺!
          </Toast.Description>
        </Toast.Root>
      )}
    </>
  )
}
