import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Area,
  AreaChart,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const PredictiveAnalytics = () => {
  // Sample historical and predicted data
  const performanceData = [
    { month: "Sep", actual: 76, predicted: null },
    { month: "Oct", actual: 72, predicted: null },
    { month: "Nov", actual: 78, predicted: null },
    { month: "Dec", actual: 74, predicted: null },
    { month: "Jan", actual: 71, predicted: 71 },
    { month: "Feb", actual: null, predicted: 69 },
    { month: "Mar", actual: null, predicted: 68 },
    { month: "Apr", actual: null, predicted: 67 },
  ];

  const subjectTrends = [
    {
      subject: "Mathematics",
      trend: "declining",
      risk: "high",
      lastScore: 71,
      predictedNext: 68,
    },
    {
      subject: "Physics",
      trend: "stable",
      risk: "medium",
      lastScore: 75,
      predictedNext: 74,
    },
    {
      subject: "Chemistry",
      trend: "improving",
      risk: "low",
      lastScore: 78,
      predictedNext: 81,
    },
  ];

  const getTrendIcon = (trend) => {
    if (trend === "improving") return <TrendingUp className="text-green-500" />;
    if (trend === "declining") return <TrendingDown className="text-red-500" />;
    return null;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Performance Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends & Predictions</CardTitle>
          <CardDescription>
            Historical performance with 3-month forecast
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 80]} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                  name="Actual Score"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  fill="#94a3b8"
                  fillOpacity={0.1}
                  name="Predicted Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Alert for Significant Predictions */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention Needed</AlertTitle>
        <AlertDescription>
          Predicted 3% performance drop in the next quarter based on current
          trends.
        </AlertDescription>
      </Alert>

      {/* Subject-wise Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Predictions</CardTitle>
          <CardDescription>Detailed analysis by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectTrends.map((subject) => (
              <div
                key={subject.subject}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getTrendIcon(subject.trend)}
                  <div>
                    <h4 className="font-semibold">{subject.subject}</h4>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getRiskColor(
                        subject.risk
                      )}`}
                    >
                      {subject.risk} risk
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Current: {subject.lastScore}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Predicted: {subject.predictedNext}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
