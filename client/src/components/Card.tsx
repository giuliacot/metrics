/** Total order card*/
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
    <>
      <h3>{code}</h3>
      <p>Total amounts: {amounts?.reduce((acc, c) => c + acc, 0)}</p>
      <div>Date: {new Intl.DateTimeFormat('it-IT').format(new Date(date))}</div>
    </>
  )
}
