export function formatDateToSpanishLocale(date: number) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
  return formattedDate;
}
