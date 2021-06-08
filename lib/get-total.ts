import { Record } from "../types";
import { maxBy } from "lodash";

export default function getTotal(data: Record[]) {
  const nationalValues = data.filter(
    (record) =>
      record.region.includes("Sverige") &&
      record.year === new Date().getFullYear()
  );

  const newest = maxBy(nationalValues, "week");

  return newest;
}
