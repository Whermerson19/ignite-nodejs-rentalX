export default interface IDateProvider {
  compare(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
  dateNow(): Date;
}