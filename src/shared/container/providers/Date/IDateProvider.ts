export default interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  isBefore(start_date: Date, end_date: Date): boolean;
}
