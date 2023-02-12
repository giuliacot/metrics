import { ErrorResponse } from '@remix-run/router'
import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { Card } from '../../components/Card/Card'
import { Loading } from '../../components/Loading'
import style from './MetricSetup.module.scss'

type Metric = {
  id: string
  code: string
  amounts: number[] | null
  date: string
}

export const MetricsSetup = () => {
  const { isLoading, error, data } = useQuery<Metric[], AxiosError>(
    'repoData',
    () => axios.get('http://localhost:8080/metrics').then((res) => res.data)
  )

  if (error) {
    console.log(error)
    throw Error(error.message)
    // TODO error component
    // TODO error page component
  }

  return (
    <>
      <h1 className={style.mainTitle}>
        Marketing campaing Sales metrics Setup page
      </h1>
      {isLoading && <Loading />}
      <main className={style.grid}>
        {data &&
          data.map(({ id, code, amounts, date }) => (
            <div className={style.cardWrapper}>
              <Card key={id} code={code} amounts={amounts} date={date} />
            </div>
          ))}
      </main>
    </>
  )
}
