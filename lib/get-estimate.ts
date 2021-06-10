import moment from "moment";
import { Record } from "../types";
import getTotal from "./get-total";

export default function getEstimate(records: Record[]) {
  const nationalRecords = records.filter((record) =>
    record.region.includes("Sverige")
  );

  const lastAddition =
    nationalRecords[nationalRecords.length - 1].amount -
    nationalRecords[nationalRecords.length - 2].amount;

  // Get the current national amount of vaccinated people
  const { share, amount, week } = getTotal(records);

  const totalToTake = amount / share;
  const leftToTake = totalToTake - amount;

  const weeksLeft = leftToTake / lastAddition;

  // Get the estimated date
  const date = moment(`${new Date().getFullYear()}-01-01`).add(
    Math.round(weeksLeft + week),
    "weeks"
  );

  return {
    lastAddition,
    date,
  };
}
