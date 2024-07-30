import dayjs from "dayjs";

export function getRandomRecord(year: number) {
  const FirstDay = dayjs(`${year}/1/1`);
  const LastDay = dayjs(`${year}/12/31`);
}

export function formatDayjs(date: string | dayjs.Dayjs) {
  return dayjs(date).format("YYYY/MM/DD");
}
