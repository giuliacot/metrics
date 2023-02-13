import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { Card } from '../../components/Card/Card'
import { Loading } from '../../components/Loading'

import style from './MetricSetup.module.scss'

import { EditMetric } from './EditMetric'
import { AddMetric } from './AddMetric'
import { DeleteMetric } from './DeleteMetric'

// TODO: generates type from the api => see how
export type Metric = {
  id: string
  code: string
  amounts: number[] | null
  date: string
}

export const MetricsSetup = () => {
  const { isLoading, error, data } = useQuery<Metric[], AxiosError>({
    queryKey: ['metrics'],
    queryFn: () =>
      axios.get('http://localhost:8080/metrics').then((res) => res.data),
  })

  const deleteMetric = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idMetric: string
  ) => {
    console.log('delete', idMetric)
  }

  if (error) {
    /** Handled by react-router on Error component */
    throw Error(error.message)
  }

  return (
    <>
      <h1 className={style.mainTitle}>
        Marketing campaing Sales metrics Setup page
      </h1>
      {isLoading && <Loading />}

      {/* {data && <Table data={data} />} */}
      <AddMetric />
      <main className={style.grid}>
        {data &&
          data.map(({ id, code, amounts, date }, index) => (
            <div key={index} className={style.cardWrapper}>
              <Card>
                <h3>{code}</h3>
                <p>
                  Total sales order:
                  {amounts?.reduce((acc, a) => a + acc, 0) ?? 0}
                </p>
                <p>
                  Date:
                  {new Intl.DateTimeFormat('it-IT').format(new Date(date))}
                </p>

                <EditMetric metric={{ id, code, amounts, date }} />
                <DeleteMetric id={id} />
              </Card>
            </div>
          ))}
        {data?.length === 0 && <p>No metrics founded</p>}
      </main>
    </>
  )
}
