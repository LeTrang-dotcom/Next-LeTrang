export function formatCurrency(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}