import moment from "moment";
import data from "../vaccinations.json";

export default function getEstimate() {
  // The amount of doses given nationally
  const nationalDoses = data["Vaccinationer tidsserie"].filter((record) =>
    record.region.includes("Sverige")
  );

  // Total amount of doses
  const totalDoses = nationalDoses[nationalDoses.length - 1].amount;

  // The amount of doses given nationally last week
  const dosesLastWeek =
    nationalDoses[nationalDoses.length - 1].amount -
    nationalDoses[nationalDoses.length - 2].amount;

  // The amount of people vaccinated nationally
  const nationalVaccinated = data["Vaccinerade tidsserie"].filter(
    (record) =>
      record.region.includes("Sverige") && record.status === "Minst 1 dos"
  );

  // Total amount of people to vaccinate
  const peopleToVaccinate =
    nationalVaccinated[0].amount / nationalVaccinated[0].share;

  // Calculate total weeks left (Each person gets 2 doses)
  const weeksLeft = (peopleToVaccinate * 2 - totalDoses) / dosesLastWeek;

  return {
    fromDate: moment(`${new Date().getFullYear()}-01-01`).add(
      nationalDoses[nationalDoses.length - 1].week,
      "weeks"
    ),
    dosesLastWeek,
    weeksLeft,
  };
}
