export default interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
  dateNow(): Date;
  addDays(days: number): Date;
}