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
      <h1 className={style.mainTitle}>Marketing campaign sales metrics</h1>
      {isLoading && <Loading />}

      {data && (
        <>
          <AddMetric>
            <button className={style.addMetricBtn}>Add new metric</button>
          </AddMetric>
          <main className={style.grid}>
            {data?.length === 0 && <p>No metrics founded</p>}
            {data.map(({ id, code, amounts, date }, index) => (
              <div key={index} className={style.cardWrapper}>
                <Card>
                  <h4>{code}</h4>
                  <div>
                    <Card.Label>Total sales order</Card.Label>
                    <Card.Value>
                      {amounts?.reduce((acc, a) => a + acc, 0) ?? 0}
                    </Card.Value>
                  </div>
                  <div>
                    <Card.Label>Orders date</Card.Label>
                    <Card.Value>
                      {new Intl.DateTimeFormat('it-IT').format(new Date(date))}
                    </Card.Value>
                  </div>
                  <Card.Bottom>
                    <EditMetric metric={{ id, code, amounts, date }}>
                      <Card.Action>Edit</Card.Action>
                    </EditMetric>

                    <DeleteMetric
                      id={id}
                      action={(onClickHandler) => (
                        <Card.Action onClick={onClickHandler}>
                          Delete
                        </Card.Action>
                      )}
                    />
                  </Card.Bottom>
                </Card>
              </div>
            ))}
          </main>
        </>
      )}
    </>
  )
}
