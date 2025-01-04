import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartAnalytics = () => {
  // Data for the bar chart (Daily)
  const dailyData = {
    date: [
      "2024-12-01",
      "2024-12-02",
      "2024-12-03",
      "2024-12-04",
      "2024-12-05",
    ],
    conversationCount: [150, 180, 200, 170, 220],
  };

  const dailyChartData = {
    labels: dailyData.date,
    datasets: [
      {
        label: "Daily Conversations",
        data: dailyData.conversationCount,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dailyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Conversation Frequency (Daily)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Conversations",
        },
        beginAtZero: true,
      },
    },
  };

  // Data for the line chart (Hourly)
  const hourlyData = {
    hours: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    conversationCount: [
      5, 2, 3, 4, 6, 8, 12, 15, 30, 50, 70, 90, 100, 80, 70, 60, 40, 50, 60, 70,
      80, 50, 20, 10,
    ],
  };

  const hourlyChartData = {
    labels: hourlyData.hours,
    datasets: [
      {
        label: "Hourly Conversations",
        data: hourlyData.conversationCount,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4, // Smooth line
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const hourlyChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        right: 20, // Adds space to the right to avoid cropping the last label
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Conversation Frequency (Hourly)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour",
        },
        ticks: {
          maxRotation: 0, // Prevents label overlap by disabling rotation
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Conversations",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mt-5 border-gray-200 border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bar Chart */}
        <div className="w-full border-gray-300 pr-5">
          <Bar data={dailyChartData} options={dailyChartOptions} />
        </div>

        {/* Line Chart */}
        <div className="w-full">
          <Line data={hourlyChartData} options={hourlyChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartAnalytics;
