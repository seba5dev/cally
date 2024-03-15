import { useProp, useMemo } from "atomico";
import { PlainDate } from "./PlainDate";
import type { PlainYearMonth } from "./PlainYearMonth";
import { getDayNames, type DaysOfWeek, type WeekdayOption } from "./utils";

function safeFrom<T extends PlainDate | PlainYearMonth>(
  Ctr: { from(value: string): T },
  value: string | undefined
) {
  if (value)
    try {
      return Ctr.from(value);
    } catch {}
}

export function useDateProp(prop: string) {
  const [value, setValue] = useProp<string>(prop);

  const date = useMemo(() => safeFrom(PlainDate, value), [value]);
  const setDate = (date: PlainDate) => setValue(date.toString());

  return [date, setDate] as const;
}

function parseISORange(value?: string) {
  if (value) {
    const split = value.split("/");
    const start = safeFrom(PlainDate, split[0]);
    const end = safeFrom(PlainDate, split[1]);

    if (start && end) {
      return { start, end };
    }
  }

  return { start: undefined, end: undefined };
}

function printISORange(start?: PlainDate, end?: PlainDate): string {
  return `${start ? start : ""}/${end ? end : ""}`;
}

export function useDateRangeProp(prop: string) {
  const [value, setValue] = useProp<string>(prop);
  const range = useMemo(() => parseISORange(value), [value]);

  const setRange = (start: PlainDate, end: PlainDate) =>
    setValue(printISORange(start, end));

  return [range, setRange] as const;
}

type DateFormatOptions = Pick<
  Intl.DateTimeFormatOptions,
  "year" | "month" | "day"
>;

export function useDateFormatter(
  locale?: string,
  { day, month, year }: DateFormatOptions = {}
) {
  return useMemo(
    () => new Intl.DateTimeFormat(locale, { day, month, year }),
    [locale, day, month, year]
  );
}

export function useDayNames(
  weekday: WeekdayOption,
  firstDayOfWeek?: DaysOfWeek,
  locale?: string
) {
  return useMemo(
    () => getDayNames(weekday, firstDayOfWeek, locale),
    [weekday, firstDayOfWeek, locale]
  );
}

export function listen<TEvent extends Event>(
  element: EventTarget,
  event: string,
  handler: (e: TEvent) => void
) {
  element.addEventListener(event, handler as EventListener);
  return () => element.removeEventListener(event, handler as EventListener);
}