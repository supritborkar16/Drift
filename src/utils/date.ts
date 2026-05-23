export function formatThoughtTime(value: string) {
  const date = new Date(value);
  const now = new Date();

  if (isSameDay(date, now)) {
    return `Today, ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, yesterday)) {
    return `Yesterday, ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }

  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function isWithinLastDays(value: string, days: number) {
  const date = new Date(value).getTime();
  const boundary = Date.now() - days * 24 * 60 * 60 * 1000;
  return date >= boundary;
}
