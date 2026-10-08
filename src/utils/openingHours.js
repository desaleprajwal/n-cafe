export const openingHours = [
  { day: "Monday", open: "10:00 AM", close: "10:00 PM", start: 10 * 60, end: 22 * 60 },
  { day: "Tuesday", open: "09:00 AM", close: "5:00 PM", start: 9 * 60, end: 17 * 60 },
  { day: "Wednesday", open: "10:00 AM", close: "10:00 PM", start: 10 * 60, end: 22 * 60 },
  { day: "Thursday", open: "10:00 AM", close: "10:00 PM", start: 10 * 60, end: 22 * 60 },
  { day: "Friday", open: "10:00 AM", close: "10:00 PM", start: 10 * 60, end: 22 * 60 },
  { day: "Saturday", open: "10:00 AM", close: "10:00 PM", start: 10 * 60, end: 22 * 60 },
  { day: "Sunday", open: "10:00 AM", close: "10:00 PM", start: 10 * 60, end: 22 * 60 },
];

export const cafeTimeZone = "Asia/Kolkata";

const getCafeDateParts = (date) => Object.fromEntries(
  new Intl.DateTimeFormat("en-US", {
    timeZone: cafeTimeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).map(({ type, value }) => [type, value]),
);

export function getCafeStatus(now = new Date()) {
  const parts = getCafeDateParts(now);
  const dayIndex = openingHours.findIndex(({ day }) => day === parts.weekday);
  const today = openingHours[dayIndex];
  const minuteOfDay = Number(parts.hour) * 60 + Number(parts.minute);
  const isOpen = minuteOfDay >= today.start && minuteOfDay < today.end;

  if (isOpen) {
    return {
      isOpen: true,
      navbarLabel: "Currently open",
      heroLabel: "Open now",
      detail: `Closes at ${today.close}`,
      currentDay: today.day,
      currentTime: `${parts.hour}:${parts.minute}`,
      opensAt: today.open,
      closesAt: today.close,
      timeZone: cafeTimeZone,
    };
  }

  if (minuteOfDay < today.start) {
    return {
      isOpen: false,
      navbarLabel: "Currently closed",
      heroLabel: "Closed",
      detail: `Opens at ${today.open}`,
      currentDay: today.day,
      currentTime: `${parts.hour}:${parts.minute}`,
      opensAt: today.open,
      closesAt: today.close,
      timeZone: cafeTimeZone,
    };
  }

  for (let dayOffset = 1; dayOffset <= openingHours.length; dayOffset += 1) {
    const nextDay = openingHours[(dayIndex + dayOffset) % openingHours.length];
    if (nextDay.start === null || nextDay.end === null) continue;
    const nextDayLabel = dayOffset === 1 ? "tomorrow" : `on ${nextDay.day}`;
    return {
      isOpen: false,
      navbarLabel: "Currently closed",
      heroLabel: "Closed",
      detail: `Opens ${nextDayLabel} at ${nextDay.open}`,
      currentDay: today.day,
      currentTime: `${parts.hour}:${parts.minute}`,
      opensAt: today.open,
      closesAt: today.close,
      timeZone: cafeTimeZone,
    };
  }

  return {
    isOpen: false,
    navbarLabel: "Currently closed",
    heroLabel: "Closed",
    detail: "Opening hours unavailable",
    currentDay: today.day,
    currentTime: `${parts.hour}:${parts.minute}`,
    opensAt: today.open,
    closesAt: today.close,
    timeZone: cafeTimeZone,
  };
}
