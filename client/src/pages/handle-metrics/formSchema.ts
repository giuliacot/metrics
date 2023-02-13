import * as yup from 'yup'
import { nanoid } from 'nanoid'

export const schema = yup
  .object({
    id: yup.string().required(),
    code: yup.string().required('Marketing campaing code is required'),
    date: yup.date().required('Acquisition orders date is required'),
    amounts: yup.string().matches(/^\d+(,\d+)*$/, {
      message:
        'Orders can be a single number or numbers splitted by comma. Example 1,2,5',
    }),
  })
  .required()

export const addMetricSchema = yup
  .object({
    code: yup.string().required('Marketing campaing code is required'),
    date: yup.date().required('Acquisition orders date is required'),
    amounts: yup.string().matches(/^\d+(,\d+)*$/, {
      message:
        'Orders can be a single number or numbers splitted by comma. Example 1,2,5',
    }),
  })
  .required()

export type AddUpdateMetricFormData = yup.InferType<typeof schema>

export const structureMetricToSubmit = (d: AddUpdateMetricFormData) => {
  const { code, date } = d
  const dateString = date.toISOString()
  const amounts = d.amounts?.split(',').map((v) => Number.parseInt(v)) || null
  return { id: nanoid(5), code, date: dateString, amounts }
}

export const structureMetricToUpdate = (d: AddUpdateMetricFormData) => {
  const { code, date, id } = d
  const dateString = date.toISOString()
  const amounts = d.amounts?.split(',').map((v) => Number.parseInt(v)) || null
  return { id, code, date: dateString, amounts }
}
