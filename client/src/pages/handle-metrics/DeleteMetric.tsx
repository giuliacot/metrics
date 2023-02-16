import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Metric } from './MetricsSetup'
import style from './MetricSetup.module.scss'
import { useEffect, useReducer } from 'react'
import { initReducer, reducer } from './reducer'
import * as Toast from '@radix-ui/react-toast'
import { TOAST_DURATION_TIME } from '../../utils/consts'

export const DeleteMetric = ({
  id,
  action,
}: {
  id: string
  action: (
    onClickEvent: React.MouseEventHandler<HTMLButtonElement>
  ) => JSX.Element
}) => {
  const [{ done, error }, dispatch] = useReducer(reducer, initReducer)

  const queryClient = useQueryClient()

  const { mutate: deleteMetricMutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`http://localhost:8080/metric/${id}`)
      return res.data
    },
  })

  const handleDelete = () => {
    deleteMetricMutate(id, {
      onSuccess: () => {
        dispatch({ type: 'onSuccess' })
      },
      onError: () => {
        dispatch({ type: 'onError' })
      },
    })
  }

  useEffect(() => {
    let idTimeout: number

    if (done || error) {
      idTimeout = setTimeout(() => {
        dispatch({ type: 'onReset' })
        const oldMetrics = queryClient.getQueryData<Metric[]>(['metrics'])
        const updatedMetrics = oldMetrics
          ? oldMetrics.filter((m) => m.id !== id)
          : []

        queryClient.setQueryData(['metrics'], updatedMetrics)
      }, TOAST_DURATION_TIME)
    }
    return () => clearTimeout(idTimeout)
  }, [done, error, id, queryClient])

  return (
    <>
      {done && (
        <Toast.Root className={style.toastRoot} duration={TOAST_DURATION_TIME}>
          <Toast.Description>Deleted! 🧹</Toast.Description>
        </Toast.Root>
      )}
      {error && (
        <Toast.Root className={style.toastRoot} duration={TOAST_DURATION_TIME}>
          <Toast.Description>
            Oh no! Something went wrong during on delete 🥺!
          </Toast.Description>
        </Toast.Root>
      )}
      {action(handleDelete)}
    </>
  )
}
