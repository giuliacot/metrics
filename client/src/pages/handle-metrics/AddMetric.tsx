import { Modal } from '../../components/Modal/Modal'
import {
  addMetricSchema,
  AddUpdateMetricFormData,
  structureMetricToSubmit,
} from './formSchema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
import { Metric } from './MetricsSetup'
import style from './MetricSetup.module.scss'

export const AddMetric = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
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
    addMetricMutate(structureMetricToSubmit(data), {
      onSuccess: () => {
        alert('Form submitted successfully')
        setOpenModal(false)
      },
      onError: (response) => {
        alert('An error occured while submiting the form')
        console.log(response)
      },
    })
  }

  return (
    <Modal open={openModal} onOpenChange={setOpenModal}>
      <Modal.Trigger asChild>
        <button className={style.addMetricBtn}>Add new metric</button>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content>
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
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  )
}
