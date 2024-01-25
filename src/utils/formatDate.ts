import { Dayjs } from "dayjs";

export function formatDate(date: Dayjs, format: string) {
  const isBuddhistEra = true;

  if (isBuddhistEra) {
    format = format.replace("YYYY", "BBBB").replace("YY", "BB");
  }

  const formatDate = date.format(format);
  return formatDate;
}
