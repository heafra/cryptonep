// components/CryptoChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: [1000, 1200, 900, 1400, 1300],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Crypto Portfolio Value"
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default CryptoChart;