import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ClassPerformanceStats = () => {
  // Sample data - in real usage, this would be passed as props
  const stats = {
    averageScore: 75.8,
    highPerformers: 65,
    totalStudents: 30,
    weakestSubjects: [
      { subject: "Mathematics", score: 68 },
      { subject: "Physics", score: 72 },
      { subject: "Chemistry", score: 74 },
    ],
  };

  return (
    <div className="space-y-4">
      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Average Class Score</CardTitle>
            <CardDescription>Overall performance metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">{stats.averageScore}%</span>
              <Progress value={stats.averageScore} className="w-1/2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Performers</CardTitle>
            <CardDescription>Students scoring 80% or above</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">
                {stats.highPerformers}%
              </span>
              <span className="text-sm text-gray-500">
                (
                {Math.round((stats.totalStudents * stats.highPerformers) / 100)}{" "}
                students)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weakest Subjects Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weakest Performing Subjects</CardTitle>
          <CardDescription>Areas needing attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weakestSubjects}>
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassPerformanceStats;
