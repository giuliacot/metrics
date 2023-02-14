/** Hack to format date YYYY-MM-DD to set correctly the datepicker */
export const formatDatePicker = (date: string | number) =>
  new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
