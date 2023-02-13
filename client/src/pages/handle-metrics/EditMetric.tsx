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
import { useEffect, useReducer, useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { initReducer, reducer } from './reducer'

export const EditMetric = ({ metric }: { metric: Metric }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, initReducer)
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
    const updatedMetric = data
    updateMetricMutate(structureMetricToUpdate(updatedMetric), {
      onSuccess: () => {
        dispatch({ type: 'onSuccess' })
        const oldMetrics = queryClient.getQueryData<Metric[]>(['metrics'])

        const updated = oldMetrics
          ? oldMetrics.map((m) => {
              if (m.id === data.id) {
                return { ...m, ...structureMetricToUpdate(updatedMetric) }
              }
              return m
            })
          : oldMetrics

        queryClient.setQueryData(['metrics'], () => {
          return updated
        })
      },
      onError: (response) => {
        dispatch({ type: 'onError' })
        console.log(response)
      },
    })
  }

  useEffect(() => {
    let id: number
    if (state.done || state.error) {
      id = setTimeout(() => {
        dispatch({ type: 'onReset' })
        setOpenModal(false)
      }, 2000)
      return clearInterval(id)
    }
  }, [state.done, state.error])

  const formattedOrders = metric.amounts
    ? metric.amounts.reduce((acc, v) => (acc ? `${acc},${v}` : `${v}`), '')
    : []

  const formattedDate = new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(metric.date))

  return (
    <>
      <Modal open={openModal} onOpenChange={setOpenModal}>
        <Modal.Trigger asChild>
          <button className={style.cardButton}>Edit</button>
        </Modal.Trigger>
        <Modal.Portal>
          <Modal.Content>
            {!state.done && !state.error && (
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
                    {...register('date')}
                    defaultValue={formattedDate}
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
            )}
            {state.done && <span>Saved 🎉</span>}
            {state.error && (
              <span>Oh no! Something went wrong during on save 🥺</span>
            )}
          </Modal.Content>
        </Modal.Portal>
      </Modal>
    </>
  )
}
