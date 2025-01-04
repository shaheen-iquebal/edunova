import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ChartAnalytics2 = () => {
  // Data for Pie Chart
  const botsData = [
    { name: "Math Bot", conversations: 800 },
    { name: "Physics Bot", conversations: 600 },
    { name: "Biology Bot", conversations: 400 },
    { name: "Literature Bot", conversations: 300 },
    { name: "History Bot", conversations: 200 },
  ];

  const pieLabels = botsData.map((bot) => bot.name.replace(" Bot", ""));
  const pieData = botsData.map((bot) => bot.conversations);

  const totalConversations = pieData.reduce((sum, value) => sum + value, 0);
  const percentageData = pieData.map((count) =>
    ((count / totalConversations) * 100).toFixed(2)
  );

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Subjects Usage Percentage",
        data: percentageData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow full width
    plugins: {
      legend: {
        position: "right", // Change position to 'right'
        align: "center",
        labels: {
          boxWidth: 15, // Adjust size of the legend's color boxes
          padding: 20, // Increase space between legend items
        },
        title: {
          display: true,
          text: "Top Subjects",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            return `${pieLabels[index]}: ${percentageData[index]}%`;
          },
        },
      },
    },
  };

  // Data for Bar Chart
  const barMetrics = {
    totalConversations: 2300,
    uniqueUsers: 500,
    activeUsersToday: 120,
    averageConversationsPerUser: 4.6,
  };

  const barLabels = [
    "Total Conversations",
    "Unique Users",
    "Active Users Today",
    "Average Conversations/User",
  ];

  const barValues = Object.values(barMetrics);

  const barChartData = {
    labels: barLabels,
    datasets: [
      {
        label: "Chat Metrics",
        data: barValues,
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow full height
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
      //   x: {
      //     title: {
      //       display: true,
      //       text: "Metrics",
      //     },
      //   },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mt-5 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pie Chart with legend on the right */}
        <div className="w-full h-72">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>

        {/* Bar Chart */}
        <div className="w-full h-72">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartAnalytics2;
