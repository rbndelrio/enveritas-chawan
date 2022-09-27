const hours = new Intl.RelativeTimeFormat('en-US', { numeric: 'always', });

// "Today", "Yesterday", etc
const relative = new Intl.RelativeTimeFormat('en-US', {numeric: 'auto'});

//  "Monday"
const short = new Intl.DateTimeFormat('en-US', {weekday: 'long'});

// "Mon, 1 January 1995"
const long = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'});

export const formatDate = (date: Date) => {
  const now = new Date().setHours(0, 0, 0, 0);
  const then = date.setHours(0, 0, 0, 0);
  const days = (then - now) / 86400000;
  if (days > -1) return hours.format(days / 24, 'minutes');
  if (days > -2) return relative.format(days, 'day');
  if (days > -6) return short.format(date);
  return long.format(date);
}