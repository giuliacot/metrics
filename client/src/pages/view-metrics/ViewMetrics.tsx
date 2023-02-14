import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { Loading } from '../../components/Loading'
import { Table } from '../../components/Table/Table'
import { Metric } from '../handle-metrics/MetricsSetup'
import style from './ViewMetrics.module.scss'

export const MetricsView = () => {
  const { isLoading, error, data } = useQuery<Metric[], AxiosError>({
    queryKey: ['metrics'],
    queryFn: () =>
      axios.get('http://localhost:8080/metrics').then((res) => res.data),
  })

  if (error) {
    /** Handled by react-router on Error component */
    throw Error(error.message)
  }

  return (
    <>
      <h1 className={style.pageTitle}>Metrics pie</h1>
      {isLoading && <Loading />}
      <Table.Title>Metrics</Table.Title>
      {data && <Table data={data} />}
    </>
  )
}
