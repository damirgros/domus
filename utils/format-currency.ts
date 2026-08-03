export default function formatCurrency(value: string | number) {
  const numericValue = Number(value ?? 0);

  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(numericValue);
}
