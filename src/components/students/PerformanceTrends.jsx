import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Info } from "lucide-react";

const PerformanceTrends = () => {
  const trendData = [
    {
      month: "Jan",
      real: 75,
      predicted: 78,
      event: "Semester Start",
      insights: "Initial performance baseline established",
    },
    {
      month: "Feb",
      real: 82,
      predicted: 80,
      event: "Mid-Term Preparation",
      insights: "Performance exceeding initial predictions",
    },
    {
      month: "Mar",
      real: 78,
      predicted: 82,
      event: "Mid-Terms",
      insights: "Slight dip due to exam stress",
    },
    {
      month: "Apr",
      real: 85,
      predicted: 83,
      event: "Post Mid-Term Recovery",
      insights: "Strong performance bounce back",
    },
    {
      month: "May",
      real: 82,
      predicted: 85,
      event: "Project Phase",
      insights: "Consistent performance with minor fluctuations",
    },
    {
      month: "Jun",
      real: 88,
      predicted: 86,
      event: "Final Exam Preparation",
      insights: "Significant performance improvement",
    },
    {
      month: "Jul",
      real: 80,
      predicted: 81,
      event: "Summer Break Start",
      insights: "Maintaining steady performance",
    },
    {
      month: "Aug",
      real: 79,
      predicted: 76,
      event: "Academic Year Transition",
      insights: "Outperforming predictive model",
    },
  ];

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = trendData.find((item) => item.month === label);
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <h4 className="font-bold text-lg mb-2">{label}</h4>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
            <p>Real Performance: {payload[0].value}%</p>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full"></div>
            <p>Predicted Performance: {payload[1].value}%</p>
          </div>
          <div className="mt-2 text-sm">
            <p className="font-semibold">Key Event: {data.event}</p>
            <p className="text-gray-600">{data.insights}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Performance Trajectory Analysis</span>
          <div className="ml-2 group relative">
            <Info className="h-5 w-5 text-blue-500 cursor-help" />
            <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded p-2 -left-full w-64 top-full mt-2">
              This graph shows your actual performance (green) compared to
              predicted performance (blue), highlighting key academic events and
              insights.
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          Monthly performance tracking with contextual insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: "#888" }}
                tickLine={{ stroke: "#888" }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={{ stroke: "#888" }}
                tickLine={{ stroke: "#888" }}
                label={{
                  value: "Performance %",
                  angle: -90,
                  position: "insideLeft",
                  offset: -10,
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine
                y={80}
                label="Target"
                stroke="red"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="real"
                name="Real Performance"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 6, fill: "#22c55e", stroke: "white", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="Predicted Performance"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 6, fill: "#3b82f6", stroke: "white", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrends;
