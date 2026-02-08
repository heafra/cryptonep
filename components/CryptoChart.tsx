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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Crypto Portfolio Value",
      data: [1000, 1200, 1500, 1400, 1800, 2000],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.4,
    },
  ],
};

export default function CryptoChart() {
  return <Line data={data} />;
}


