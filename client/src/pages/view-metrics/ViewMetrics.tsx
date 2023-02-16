import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { Loading } from '../../components/Loading'
import { Table } from '../../components/Table/Table'
import { Metric } from '../handle-metrics/MetricsSetup'
import style from './ViewMetrics.module.scss'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Metric>()

const columns = [
  columnHelper.accessor('code', {
    cell: (c) => c.getValue(),
    header: () => <span>Marketing Campaing code</span>,
  }),
  columnHelper.accessor('amounts', {
    cell: (c) => String(c.getValue()?.reduce((acc, a) => a + acc, 0) ?? 0),
    header: () => <span>Total sales amounts</span>,
  }),
  columnHelper.accessor('date', {
    cell: (c) =>
      String(new Intl.DateTimeFormat('it-IT').format(new Date(c.getValue()))),
    header: () => <span>Date</span>,
  }),
]

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
      <h1 className={style.pageTitle}>Metrics details</h1>
      {isLoading && <Loading />}

      {data && (
        <>
          <Table.Root>
            <Table data={data} columns={columns} title="Metrics" />
          </Table.Root>
        </>
      )}
    </>
  )
}
