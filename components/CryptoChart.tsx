// components/CryptoChart.tsx

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CryptoChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"], // Example months
    datasets: [
      {
        label: "Portfolio Balance",
        data: [1000, 1200, 1500, 1300, 1700], // Example values
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Invested Balance",
        data: [500, 600, 700, 650, 800], // Example invested amounts
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Crypto Portfolio Overview" },
    },
  };

  return <Line data={data} options={options} />;
}