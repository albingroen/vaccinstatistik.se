import { Record } from "../types";
import { maxBy } from "lodash";

export default function getTotal(data: Record[]) {
  const nationalValues = data.filter(
    (record) =>
      record.region.includes("Sverige") &&
      record.year === new Date().getFullYear()
  );

  const atLeas1NationalValues = nationalValues.filter(
    (record) => record.status === "Minst 1 dos"
  );

  const fullyVaccinatedNationalValues = nationalValues.filter(
    (record) => record.status === "Färdigvaccinerade"
  );

  const newestAtLeast1 = maxBy(atLeas1NationalValues, "week");
  const newestFullyVaccinated = maxBy(fullyVaccinatedNationalValues, "week");

  return {
    newestFullyVaccinated,
    newestAtLeast1,
  };
}
