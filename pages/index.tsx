import getRegionTotals from "../lib/get-municipality-totals";
import getTotal from "../lib/get-total";
import { Record } from "../types";
import data from "../vaccinations.json";
import Card from "../components/Card";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const chartData = data.filter((record) => record.region.includes("Sverige"));

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
                formatter={(value: number) => [value.toLocaleString(), "Antal"]}
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
  );
}
