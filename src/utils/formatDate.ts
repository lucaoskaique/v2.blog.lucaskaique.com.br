export function formatDate(dateString: string) {
  return new Date(`${dateString}`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  })
}
