import data from "../vaccinations.json";

export default function getEstimate() {
  // The amount of doses given nationally
  const nationalDoses = data["Vaccinationer tidsserie"].filter((record) =>
    record.region.includes("Sverige")
  );

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
  const weeksLeft = (peopleToVaccinate * 2) / dosesLastWeek;

  return {
    weeksLeft,
    dosesLastWeek,
  };
}
