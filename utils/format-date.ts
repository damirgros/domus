export default function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
