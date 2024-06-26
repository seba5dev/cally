import { CalendarMonth } from "./calendar-month/calendar-month";
import { CalendarDate } from "./calendar-date/calendar-date";
import { CalendarRange } from "./calendar-range/calendar-range";
export { CalendarMonth, CalendarDate, CalendarRange };

import type { AtomicoThis } from "atomico/types/dom.js";

type Simplify<T> = {
  [K in keyof T]: T[K];
} & {};

type ComponentProps<T extends abstract new (...args: any) => any> = Simplify<
  Partial<Omit<InstanceType<T>, keyof HTMLElement | keyof AtomicoThis>>
>;

// export props for use in react/vue/etc
export type CalendarMonthProps = ComponentProps<typeof CalendarMonth>;
export type CalendarDateProps = ComponentProps<typeof CalendarDate>;
export type CalendarRangeProps = ComponentProps<typeof CalendarRange>;
