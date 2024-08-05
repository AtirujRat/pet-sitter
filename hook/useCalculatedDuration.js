export function useCalculateDutation(time1, time2) {
  let date1 = new Date(time1);
  let date2 = new Date(time2);

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
