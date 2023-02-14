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

  if (error) {
    /** Handled by react-router on Error component */
    throw Error(error.message)
  }

  return (
    <>
      <h1 className={style.mainTitle}>
        Marketing campaign Sales metrics Setup page
      </h1>
      {isLoading && <Loading />}

      {/* {data && <Table data={data} />} */}
      <AddMetric>
        <button className={style.addMetricBtn}>Add new metric</button>
      </AddMetric>
      <main className={style.grid}>
        {data &&
          data.map(({ id, code, amounts, date }, index) => (
            <div key={index} className={style.cardWrapper}>
              <Card>
                <h4>{code}</h4>
                <p>
                  Total sales order:
                  {amounts?.reduce((acc, a) => a + acc, 0) ?? 0}
                </p>
                <p>
                  Date:
                  {new Intl.DateTimeFormat('it-IT').format(new Date(date))}
                </p>
                <EditMetric metric={{ id, code, amounts, date }}>
                  <Card.Action>Edit</Card.Action>
                </EditMetric>{' '}
                <DeleteMetric
                  id={id}
                  renderItem={(onClickEvent) => (
                    <Card.Action onClick={onClickEvent}>
                      Delete {JSON.stringify(id)}
                    </Card.Action>
                  )}
                />
              </Card>
            </div>
          ))}
        {data?.length === 0 && <p>No metrics founded</p>}
      </main>
    </>
  )
}
