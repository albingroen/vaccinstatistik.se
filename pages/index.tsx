import getRegionTotals from "../lib/get-municipality-totals";
import getTotal from "../lib/get-total";
import { Record } from "../types";
import data from "../vaccinations.json";
import Card from "../components/Card";

export default function Home() {
  const total = getTotal(data as Record[]);
  const regionTotals = getRegionTotals(data as Record[]);

  return (
    <div className="py-12 mx-auto sm:px-8 max-w-screen-lg">
      <div className="px-4 sm:px-0">
        <p className="text-gray-500">Statistik från vecka {total.week}</p>

        <Card
          description={total.amount.toLocaleString()}
          heading="Antal vaccinerade i Sverige"
          className="mt-6"
        />
      </div>

      <div className="w-full p-4 overflow-auto whitespace-nowrap snap snap-x scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin">
        {regionTotals.map((record) => (
          <Card
            description={record.amount.toLocaleString()}
            className="inline-block mr-4 w-72 snap-ml-4 sm:snap-ml-0.5 snap-center sm:snap-start"
            heading={record.region}
            key={record.region}
          />
        ))}
      </div>

      <div className="px-4 sm:px-0">
        <p className="mt-6 text-sm leading-relaxed text-gray-500 sm:text-normal">
          Den här sidan hämtar data från{" "}
          <a
            className="text-blue-500 underline"
            href="https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/statistik-och-analyser/statistik-over-registrerade-vaccinationer-covid-19/"
          >
            Folkhälsomyndighetens vaccinationsregister
          </a>{" "}
          och uppdateras därefter.
        </p>
      </div>
    </div>
  );
}
