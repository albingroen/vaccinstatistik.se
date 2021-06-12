import getTotal from "../lib/get-total";
import data from "../vaccinations.json";
import Card from "../components/Card";
import Head from "next/head";
import {
  AreaChart,
  BarChart,
  Bar,
  Area,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState } from "react";
import getEstimate from "../lib/get-estimate";
import moment from "moment";
import { sortBy } from "lodash";
import Progress from "../components/Progress";

const nationalData = data["Vaccinerade tidsserie"].filter((record) =>
  record.region.includes("Sverige")
);

const nationalAgeData = data["Vaccinerade ålder"].filter(
  (record) => record.region.includes("Sverige") && record.age !== "Totalt"
);

const image =
  "https://res.cloudinary.com/albin-groen/image/upload/v1623183211/vaccinstatistik-se-seo_qinhm7.png";
const description = "Statistik över covid-19 vaccinationen i Sverige";
const url = "https://vaccinstatistik.se";
const title = "vaccinstatistik.se";

export default function Home() {
  // State
  const [search, setSearch] = useState<string>();

  // Data
  const total = getTotal(data["Vaccinerade tidsserie"]);

  const estimate = getEstimate();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image}></meta>
      </Head>

      <div className="py-12 mx-auto sm:px-8 max-w-screen-lg">
        <div className="px-4 sm:px-0">
          <p className="text-gray-500">
            Statistik från vecka {total.newestFullyVaccinated.week}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <p className="text-xl font-medium leading-snug text-gray-500">
                Antal färdigvaccinerade
              </p>

              <p className="my-4 text-4xl font-bold tracking-tight text-green-600 dark:text-green-500">
                {total.newestFullyVaccinated.amount.toLocaleString()}
              </p>

              <Progress
                value={total.newestFullyVaccinated.share * 100}
                className="bg-green-500"
              />
            </Card>

            <Card>
              <p className="text-xl font-medium leading-snug text-gray-500">
                Antal med minst 1 dos
              </p>

              <p className="my-4 text-4xl font-bold tracking-tight text-yellow-500 dark:text-yellow-600">
                {total.newestAtLeast1.amount.toLocaleString()}
              </p>

              <Progress
                className="bg-yellow-400 dark:bg-yellow-500"
                value={total.newestAtLeast1.share * 100}
              />
            </Card>
          </div>

          <hr className="my-8 dark:border-gray-800" />

          <label className="block text-lg font-medium tracking-wide text-gray-500">
            Antal färdigvaccinerade / kommun
          </label>

          <input
            className="block w-full mt-4 placeholder-gray-400 border-gray-200 dark:placeholder-gray-600 dark:border-gray-700 bg-none dark:bg-gray-900 shadow-sm focus:ring-green-300 focus:border-green-300 dark:focus:ring-gray-500 dark:focus:border-gray-500 sm:text-sm rounded-md"
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Sök på en kommun..."
            value={search}
            type="text"
          />
        </div>

        <div className="w-full p-4 overflow-auto whitespace-nowrap snap snap-x scrollbar scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 scrollbar-thin">
          {sortBy(data["Vaccinerade kommun"], "amountFull")
            .reverse()
            .filter((record) =>
              search
                ? record.name
                    .toLowerCase()
                    .includes(search.toLowerCase().trim())
                : true
            )
            .map((record) => (
              <Card
                className="inline-block mr-4 snap-ml-4 sm:snap-ml-0.5 snap-center w-64 sm:snap-start"
                description={record.amountFull.toLocaleString()}
                progress={Math.round(record.shareFull * 100)}
                heading={record.name}
                key={record.name}
              />
            ))}
        </div>

        <hr className="my-8 dark:border-gray-800" />

        <div className="px-4 mt-4 sm:px-0">
          <Card>
            <h2 className="text-sm font-medium text-gray-500 uppercase trackgin-wide">
              Vaccinerade över tid
            </h2>
            <ResponsiveContainer className="mt-4" height={200}>
              <AreaChart
                margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
                data={nationalData
                  .filter((record) => record.status === "Färdigvaccinerade")
                  .map((record) => {
                    const atLeast1 = nationalData.find(
                      (subRecord) =>
                        subRecord.status === "Minst 1 dos" &&
                        subRecord.week === record.week
                    )?.amount;

                    return {
                      ...record,
                      Färdigvaccinerad: record.amount,
                      "Minst 1 dos": atLeast1,
                    };
                  })}
              >
                <Area
                  dataKey="Minst 1 dos"
                  stroke="#F59E0B"
                  fillOpacity={0.25}
                  type="monotone"
                  fill="#F59E0B"
                />

                <Area
                  dataKey="Färdigvaccinerad"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  type="monotone"
                  fill="#82ca9d"
                />

                <XAxis
                  tickMargin={5}
                  opacity={0.5}
                  dataKey="week"
                  tickSize={5}
                />
                <YAxis
                  tickFormatter={(value) => `${value / 1000000} M`}
                  tickMargin={5}
                  opacity={0.5}
                  tickSize={5}
                />

                <Legend />

                <CartesianGrid
                  className="opacity-50 dark:opacity-25"
                  strokeDasharray="3 3"
                />
                <Tooltip
                  contentStyle={{ borderRadius: 5 }}
                  labelStyle={{ color: "#555" }}
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    "Antal",
                  ]}
                  labelFormatter={(week) => `Vecka ${week}`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="mt-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase trackgin-wide">
              Vaccinerade per ålderskategori
            </h2>

            <ResponsiveContainer className="mt-4" height={200}>
              <BarChart
                width={730}
                height={250}
                data={nationalAgeData
                  .filter((record) => record.status === "Färdigvaccinerade")
                  .map((record) => {
                    const atLeast1 = nationalAgeData.find(
                      (subRecord) =>
                        subRecord.status === "Minst 1 dos" &&
                        subRecord.age === record.age
                    );

                    return {
                      ...record,
                      Färdigvaccinerad: record.amount,
                      "Minst 1 dos": atLeast1.amount,
                      shareAtLeast1: atLeast1.share,
                    };
                  })}
              >
                <CartesianGrid
                  className="opacity-50 dark:opacity-25"
                  strokeDasharray="3 3"
                />

                <XAxis
                  opacity={0.5}
                  tickMargin={5}
                  dataKey="age"
                  tickSize={5}
                />
                <YAxis
                  tickFormatter={(value) => `${value / 1000000} M`}
                  opacity={0.5}
                  tickMargin={5}
                  tickSize={5}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 5 }}
                  labelStyle={{ color: "#555" }}
                  formatter={(
                    value: number,
                    type: string,
                    { payload: { shareAtLeast1, share } }
                  ) => {
                    return [
                      `${value.toLocaleString()} (~${Math.round(
                        (type === "Minst 1 dos" ? shareAtLeast1 : share) * 100
                      )}%)`,
                      "Antal",
                    ];
                  }}
                />
                <Bar maxBarSize={50} dataKey="Minst 1 dos" fill="#F59E0B" />
                <Bar
                  dataKey="Färdigvaccinerad"
                  maxBarSize={50}
                  fill="#82ca9d"
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* <Card className="mt-6"> */}
          {/*   <h2 className="text-sm font-medium text-gray-500 uppercase trackgin-wide"> */}
          {/*     NÄR ÄR ALLA FÄRDIGVACCINERADE (ESTIMAT) */}
          {/*   </h2> */}
          {/*  */}
          {/*   <h3 className="mt-4 text-4xl font-semibold text-gray-500"> */}
          {/*     {moment() */}
          {/*       .locale("sv") */}
          {/*       .add(estimate.weeksLeft, "weeks") */}
          {/*       .format("DD MMM YYYY")} */}
          {/*   </h3> */}
          {/*  */}
          {/*   <p className="mt-2 text-gray-500"> */}
          {/*     Med en beräkning på {estimate.dosesLastWeek.toLocaleString()}{" "} */}
          {/*     doser / vecka. */}
          {/*   </p> */}
          {/* </Card> */}

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
    </>
  );
}
