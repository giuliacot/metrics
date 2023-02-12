/** Total order card*/
import style from './Card.module.scss'
export const Card = ({
  code,
  amounts,
  date,
}: {
  code: string
  amounts: number[] | null
  date: string
}) => {
  return (
    <div className={style.box}>
      <h3>{code}</h3>
      <p>Total amounts: {amounts?.reduce((acc, c) => c + acc, 0)}</p>
      <div>Date: {new Intl.DateTimeFormat('it-IT').format(new Date(date))}</div>
    </div>
  )
}
