import { Modal } from '../../components/Modal/Modal'
import {
  addMetricSchema,
  AddUpdateMetricFormData,
  structureMetricToSubmit,
} from './formSchema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ReactNode, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Metric } from './MetricsSetup'
import style from './MetricSetup.module.scss'
import { reducer, initReducer } from './reducer'
import { wait } from '../../utils/waits'

export const AddMetric = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, initReducer)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUpdateMetricFormData>({
    resolver: yupResolver(addMetricSchema),
    mode: 'onChange',
  })
  const { mutate: addMetricMutate } = useMutation({
    mutationFn: (data: Metric) =>
      axios
        .post('http://localhost:8080/metric', { ...data })
        .then((res) => res.data),
  })

  const onSubmit = (data: AddUpdateMetricFormData) => {
    const addedMetric = structureMetricToSubmit(data)
    addMetricMutate(addedMetric, {
      onSuccess: () => {
        dispatch({ type: 'onSuccess' })
        const oldMetrics = queryClient.getQueryData<Metric[]>(['metrics'])

        const updated = oldMetrics
          ? [...oldMetrics, addedMetric]
          : [addedMetric]

        queryClient.setQueryData(['metrics'], () => {
          return updated
        })

        wait(1000).then(() => {
          dispatch({ type: 'onReset' })
          setOpenModal(false)
        })
      },
      onError: (response) => {
        dispatch({ type: 'onError' })
        console.error(response)
      },
    })
  }

  return (
    <Modal open={openModal} onOpenChange={setOpenModal}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content>
        {!state.done && !state.error && (
          <form onSubmit={handleSubmit(onSubmit)}>
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
                id="amounts"
                {...register('amounts')}
              />
              <p className={style.error}>{errors.amounts?.message}</p>
            </fieldset>
            <button type="submit" className={style.addMetricBtn}>
              Add metric
            </button>
          </form>
        )}
        {state.done && <span>Added new metric 🎉</span>}
        {state.error && (
          <span>Oh no! Something went wrong during on add 🥺</span>
        )}
      </Modal.Content>
    </Modal>
  )
}
