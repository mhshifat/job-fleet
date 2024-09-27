import { format, addMinutes, startOfDay, isBefore, endOfDay, startOfWeek, addDays, startOfMonth, parse } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

export function getTimeSlots(args?: {
  interval?: number
}) {
    let intervals = [];
    let current = startOfDay(new Date());
    let end = endOfDay(new Date());

    while (isBefore(current, end)) {
        intervals.push(format(current, 'hh:mm a'));
        current = addMinutes(current, args?.interval || 30);
    }

    return intervals;
}

export function getWeekDaysShort() {
  let weekDays = [];
  let current = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start the week on Monday

  for (let i = 0; i < 7; i++) {
      weekDays.push(format(current, 'EEE')); // 'EEE' gives the short form of the weekday
      current = addDays(current, 1);
  }

  return weekDays;
}

export function getDaysForEachWeekday(year: number, month: number) {
  const weekDaysShort = getWeekDaysShort();
  const weekdays = weekDaysShort.reduce<Record<string, { year: number, month: number, day: number }[]>>((acc, day) => {
      acc[day] = [];
      return acc;
  }, {});

  const firstDayOfMonth = startOfMonth(new Date(year, month - 1));

  // Get the first day of the week for the start of the calendar
  let current = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

  // Fill the calendar with 42 days
  for (let i = 0; i < 42; i++) {
    const dayOfWeek = format(current, 'EEE');
    const day = current.getDate();
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1; // Months are zero-indexed in JavaScript Date
    weekdays[dayOfWeek].push({ year: currentYear, month: currentMonth, day: day });
    current = addDays(current, 1);
  }

  return weekdays;
}

export function isDateInMonth(year: number, month: number, date: number, compareYear: number, compareMonth: number) {
  const inputDate = new Date(year, month - 1, date);
  const startOfMonth = new Date(compareYear, compareMonth - 1, 1);
  const endOfMonth = new Date(compareYear, compareMonth, 0); // Last day of the given month

  return inputDate >= startOfMonth && inputDate <= endOfMonth;
}

export function isDateToday(year: number, month: number, day: number) {
  const today = new Date();
  const inputDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date

  // Compare year, month, and day of today's date and input date
  return (
      today.getFullYear() === inputDate.getFullYear() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getDate() === inputDate.getDate()
  );
}

export function isDateSame(date: Date, compareDate: Date) {
  const today = date;
  const inputDate = compareDate; // month is 0-indexed in JavaScript Date

  // Compare year, month, and day of today's date and input date
  return (
      today.getFullYear() === inputDate.getFullYear() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getDate() === inputDate.getDate()
  );
}

const formats = {
  "MMMM yyyy": format,
}

export function formatDate(year: number, month: number, day: number, format: keyof typeof formats = "MMMM yyyy") {
  const date = new Date(year, month - 1, day);
  return formats[format](date, format);
}

export function formatToDate(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day);

  return date;
}

export function formatISODate(isoDate: Date, format: keyof typeof formats = "MMMM yyyy") {
  if (!isoDate) return null;
  const date = new Date(isoDate);

  return formats[format](date, format);
}

export function getDateWithTimestamp(date: Date, time: string, timezone: string): string {
  const now = date;
  const currentDate = format(now, 'yyyy-MM-dd');

  const dateTimeString = `${currentDate} ${time}`;
  const parsedDate = parse(dateTimeString, 'yyyy-MM-dd hh:mm a', new Date());
  const utcDate = fromZonedTime(parsedDate, timezone);
  return utcDate.toISOString();
}