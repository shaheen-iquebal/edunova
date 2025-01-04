import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const subjectsData = [
  {
    subject: "Mathematics",
    realPerformance: 85,
    predictedPerformance: 88,
    trend: "improving",
    testScores: [78, 82, 85, 84, 85],
    predictedScores: [85, 86, 87, 88, 89],
    strengths: ["Algebra", "Calculus"],
    weaknesses: ["Geometry"],
    improvement: ["Trigonometry"],
  },
  {
    subject: "Physics",
    realPerformance: 72,
    predictedPerformance: 78,
    trend: "improving",
    testScores: [65, 68, 70, 72, 72],
    predictedScores: [73, 75, 76, 77, 78],
    strengths: ["Mechanics"],
    weaknesses: ["Thermodynamics"],
    improvement: ["Optics"],
  },
  {
    subject: "Chemistry",
    realPerformance: 90,
    predictedPerformance: 92,
    trend: "stable",
    testScores: [88, 89, 90, 90, 90],
    predictedScores: [90, 91, 91, 92, 92],
    strengths: ["Organic", "Periodic Table"],
    weaknesses: [],
    improvement: ["Physical Chemistry"],
  },
  {
    subject: "Biology",
    realPerformance: 65,
    predictedPerformance: 75,
    trend: "needsWork",
    testScores: [60, 62, 63, 65, 65],
    predictedScores: [68, 70, 72, 74, 75],
    strengths: [],
    weaknesses: ["Genetics", "Cell Biology"],
    improvement: ["Ecology"],
  },
];

const COLORS = {
  strength: "#22c55e",
  weakness: "#ef4444",
  improvement: "#eab308",
  real: "#3b82f6",
  predicted: "#8b5cf6",
};

export default function PerformanceProgressDetailed() {
  const [selectedSubject, setSelectedSubject] = useState(subjectsData[0]);

  const getStatusBadge = (type, items) => {
    if (!items.length) return null;
    return items.map((item) => (
      <Badge
        key={item}
        className={`
          ${
            type === "strengths"
              ? "bg-green-100 text-green-800"
              : type === "weaknesses"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }
        `}
      >
        {item}
      </Badge>
    ));
  };

  const timeLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  const chartData = timeLabels.map((label, idx) => ({
    name: label,
    Real: selectedSubject.testScores[idx],
    Predicted: selectedSubject.predictedScores[idx],
  }));

  const performanceData = [
    { name: "Real", value: selectedSubject.realPerformance },
    { name: "Predicted", value: selectedSubject.predictedPerformance },
  ];

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Performance Progress Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {subjectsData.map((subject) => (
              <Button
                key={subject.subject}
                variant={
                  selectedSubject.subject === subject.subject
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedSubject(subject)}
                className="whitespace-nowrap"
              >
                {subject.subject}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium">Strengths</div>
                <div className="flex gap-2 mt-1">
                  {getStatusBadge("strengths", selectedSubject.strengths)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Areas for Improvement</div>
                <div className="flex gap-2 mt-1">
                  {getStatusBadge("improvement", selectedSubject.improvement)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Needs Work</div>
                <div className="flex gap-2 mt-1">
                  {getStatusBadge("weaknesses", selectedSubject.weaknesses)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={performanceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={COLORS.real} />
                  <Cell fill={COLORS.predicted} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Real"
                stroke={COLORS.real}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Predicted"
                stroke={COLORS.predicted}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Real vs Predicted Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Real" fill={COLORS.real} />
              <Bar dataKey="Predicted" fill={COLORS.predicted} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
