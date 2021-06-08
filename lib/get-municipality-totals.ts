import { groupBy, maxBy, sortBy } from "lodash";
import { Record } from "../types";

export default function getMunicipalityTotals(data: Record[]) {
  const regionValues = data.filter(
    (record) =>
      !record.region.includes("Sverige") &&
      record.year === new Date().getFullYear()
  );

  const groupedRegionValues = groupBy(regionValues, "region");

  const values = Object.values(groupedRegionValues).map((records) => {
    return maxBy(records, "amount");
  });

  return sortBy(values, "amount").reverse();
}
