import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import IDateProvider from "./IDateProvider";

dayjs.extend(utc);

export default class DateProvider implements IDateProvider {
  
  compare(startDate: Date, endDate: Date): number {
    const endDateReturn = this.convertToUtc(endDate);
    const startDateReturn = this.convertToUtc(startDate);

    return dayjs(endDateReturn).diff(startDateReturn, "hours");
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}
