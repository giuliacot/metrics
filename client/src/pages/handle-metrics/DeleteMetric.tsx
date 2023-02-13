import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import style from './MetricSetup.module.scss'
import { Metric } from './MetricsSetup'

export const DeleteMetric = ({ id }: { id: string }) => {
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
        console.error('errororoororo', e)
      },
    })
  }

  const { mutate: deleteMetricMutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`http://localhost:8080/metric/${id}`)
      return res.data
    },
  })

  return (
    <>
      <button className={style.cardButton} onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}
