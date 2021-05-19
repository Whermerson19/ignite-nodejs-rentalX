import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import IDateProvider from "./IDateProvider";

dayjs.extend(utc);

export default class DateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const endDateReturn = this.convertToUtc(endDate);
    const startDateReturn = this.convertToUtc(startDate);

    return dayjs(endDateReturn).diff(startDateReturn, "hours");
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const endDateReturn = this.convertToUtc(endDate);
    const startDateReturn = this.convertToUtc(startDate);

    return dayjs(endDateReturn).diff(startDateReturn, "days");
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  isBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}
