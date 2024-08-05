export default function CalculateDutation({ start_time, end_time }) {
  let date1 = new Date(start_time);
  let date2 = new Date(end_time);

  let diffMs = Math.abs(date2 - date1);
  let diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  let diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffMinutes === 0) {
    return `${diffHours} Hours`;
  } else if (diffHours === 0) {
    return `${diffMinutes} Mins`;
  }

  return `${diffHours}:${diffMinutes} Hours`;
}
