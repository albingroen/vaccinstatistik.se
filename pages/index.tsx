import getRegionTotals from "../lib/get-municipality-totals";
import getTotal from "../lib/get-total";
import { Record } from "../types";
import data from "../vaccinations.json";
import Card from "../components/Card";
import Head from "next/head";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState } from "react";

const chartData = data.filter((record) => record.region.includes("Sverige"));

const image =
  "https://res.cloudinary.com/albin-groen/image/upload/v1623183211/vaccinstatistik-se-seo_qinhm7.png";
const description = "Statistik över covid-19 vaccinationen i Sverige";
const url = "https://vaccinstatistik.se";
const title = "vaccinstatistik.se";

export default function Home() {
  // State
  const [search, setSearch] = useState<string>();

  // Data
  const regionTotals = getRegionTotals(data as Record[]);
  const total = getTotal(data as Record[]);

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
          <p className="text-gray-500">Statistik från vecka {total.week}</p>

          <Card
            description={total.amount.toLocaleString()}
            heading="Antal givna vaccinationer i Sverige"
            className="mt-6"
          />

          <input
            className="block w-full mt-6 border-gray-200 bg-none shadow-sm focus:ring-green-300 focus:border-green-300 sm:text-sm rounded-md"
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Sök på en region..."
            value={search}
            type="text"
          />
        </div>

        <div className="w-full p-4 overflow-auto whitespace-nowrap snap snap-x scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin">
          {regionTotals
            .filter((record) =>
              search
                ? record.region.toLowerCase().includes(search.toLowerCase())
                : true
            )
            .map((record) => (
              <Card
                className="inline-block mr-4 w-72 snap-ml-4 sm:snap-ml-0.5 snap-center sm:snap-start"
                description={record.amount.toLocaleString()}
                heading={record.region}
                key={record.region}
              />
            ))}
        </div>

        <div className="px-4 mt-4 sm:px-0">
          <Card>
            <ResponsiveContainer height={200}>
              <AreaChart
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                data={chartData}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <Area
                  fill="url(#colorAmount)"
                  dataKey="amount"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  type="monotone"
                />

                <XAxis
                  style={{ opacity: 0.5 }}
                  tickMargin={5}
                  dataKey="week"
                  tickSize={5}
                />
                <YAxis
                  tickFormatter={(value) => `${value / 1000000} M`}
                  style={{ opacity: 0.5 }}
                  tickMargin={5}
                  tickSize={5}
                />
                <CartesianGrid strokeDasharray="3 3" style={{ opacity: 0.5 }} />
                <Tooltip
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    "Antal",
                  ]}
                  labelFormatter={(week) => `Vecka ${week}`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

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
