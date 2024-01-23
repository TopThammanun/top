import { Dayjs } from "dayjs";

export function dateFormat(date: Dayjs, format: string) {
  const isBuddhistEra = true;

  if (isBuddhistEra) {
    format = format.replace("YYYY", "BBBB").replace("YY", "BB");
  }

  const modifiedDate = date.format(format);
  return modifiedDate;
}
