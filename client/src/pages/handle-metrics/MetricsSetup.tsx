import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../components/Card/Card'
import { Loading } from '../../components/Loading'
import { Modal } from '../../components/Modal/Modal'
import { Table } from '../../components/Table/Table'

import style from './MetricSetup.module.scss'

// TODO: generates type from the api => see how
export type Metric = {
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
  }

  return (
    <>
      <h1 className={style.mainTitle}>
        Marketing campaing Sales metrics Setup page
      </h1>
      {isLoading && <Loading />}
      <Modal></Modal>
      {data && <Table data={data} />}
      <main className={style.grid}>
        {data &&
          data.map(({ id, code, amounts, date }) => (
            <div key={id} className={style.cardWrapper}>
              <Card>
                <h3>{code}</h3>
                <p>
                  Total sales order:{' '}
                  {amounts?.reduce((acc, a) => a + acc, 0) ?? 0}
                </p>
                <p>
                  Date:{' '}
                  {new Intl.DateTimeFormat('it-IT').format(new Date(date))}
                </p>
              </Card>
            </div>
          ))}
      </main>
    </>
  )
}
