"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

export default function IncomeChart() {
  const getLastSixMonths = (): string[] => {
    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date();

      date.setMonth(date.getMonth() - (6 - i));

      return date.toLocaleString("hr-HR", {
        month: "long",
      });
    });
  };
  const data = {
    labels: getLastSixMonths(),

    datasets: [
      {
        label: "Prihod",

        data: [1200, 1800, 2400, 3000, 2000, 1000],

        borderWidth: 2,

        pointBackgroundColor: "#138d63",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  return <Line data={data} />;
}
