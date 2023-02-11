import axios from 'axios'
import { useQuery } from 'react-query'
import { Card } from '../../components/Card'
import { Loading } from '../../components/Loading'
import style from './MetricSetup.module.scss'

type Metric = {
  id: string
  code: string
  amounts: number[] | null
  date: string
}

export const MetricsSetup = () => {
  const { isLoading, error, data } = useQuery<Metric[]>('repoData', () =>
    axios.get('http://localhost:8080/metrics').then((res) => res.data)
  )
  return (
    <>
      <h1>Marketing campaing metrics Setup page</h1>
      {isLoading && <Loading />}
      {data &&
        data.map(({ id, code, amounts, date }) => (
          <Card key={id} code={code} amounts={amounts} date={date} />
        ))}
    </>
  )
}
