import { Line } from "react-chartjs-2";
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

// Example props
interface CryptoChartProps {
  labels: string[];
  data: number[];
}

const CryptoChart: React.FC<CryptoChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Portfolio Value ($)",
        data,
        fill: true,
        backgroundColor: "rgba(99, 132, 255, 0.2)",
        borderColor: "rgba(99, 132, 255, 1)",
        tension: 0.4
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
        text: "Crypto Portfolio Chart"
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default CryptoChart;



