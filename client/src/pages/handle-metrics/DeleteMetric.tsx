import axios from 'axios'
import { cloneElement, isValidElement, ReactNode } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import style from './MetricSetup.module.scss'
import { Metric } from './MetricsSetup'

export const DeleteMetric = ({
  id,
  renderItem,
}: {
  id: string
  renderItem: (
    onClickEvent: React.MouseEventHandler<HTMLButtonElement>
  ) => JSX.Element
}) => {
  const queryClient = useQueryClient()
  const handleDelete = () => {
    deleteMetricMutate(id, {
      onSuccess: () => {
        const oldMetrics = queryClient.getQueryData<Metric[]>(['metrics'])
        const updatedMetrics = oldMetrics
          ? oldMetrics.filter((m) => m.id !== id)
          : []

        queryClient.setQueryData(['metrics'], updatedMetrics)
      },
      onError: (e) => {
        alert('Oh no! We cannot delete the item')
      },
    })
  }

  const { mutate: deleteMetricMutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`http://localhost:8080/metric/${id}`)
      return res.data
    },
  })

  return renderItem(handleDelete)
}
