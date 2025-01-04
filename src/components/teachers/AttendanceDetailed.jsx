import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Brain,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Users,
  School,
} from "lucide-react";
import AttendanceHeatmap from "./AttendanceHeatmap";

const AttendanceDetailed = () => {
  const [selectedClass, setSelectedClass] = useState("10A");
  const [selectedMonth, setSelectedMonth] = useState("December");

  // Sample trend data
  const trendData = [
    { month: "Aug", attendance: 88, predicted: null },
    { month: "Sep", attendance: 85, predicted: null },
    { month: "Oct", attendance: 82, predicted: null },
    { month: "Nov", attendance: 80, predicted: null },
    { month: "Dec", attendance: 78, predicted: 78 },
    { month: "Jan", attendance: null, predicted: 76 },
    { month: "Feb", attendance: null, predicted: 75 },
  ];

  // Sample pattern data
  const patternData = [
    { day: "Monday", attendance: 85 },
    { day: "Tuesday", attendance: 88 },
    { day: "Wednesday", attendance: 82 },
    { day: "Thursday", attendance: 75 },
    { day: "Friday", attendance: 70 },
  ];

  // Sample reasons data
  const reasonsData = [
    { name: "Illness", value: 45 },
    { name: "Family Event", value: 25 },
    { name: "Transport", value: 15 },
    { name: "Weather", value: 10 },
    { name: "Other", value: 5 },
  ];

  // Sample holidays data
  const holidays = [
    { date: "Dec 25", name: "Christmas Day", type: "Public Holiday" },
    { date: "Dec 31", name: "New Year's Eve", type: "School Holiday" },
    { date: "Jan 1", name: "New Year's Day", type: "Public Holiday" },
    { date: "Jan 26", name: "Republic Day", type: "Public Holiday" },
    { date: "Feb 14", name: "Regional Holiday", type: "School Holiday" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <>
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10A">Class 10A</SelectItem>
                <SelectItem value="10B">Class 10B</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="December">December 2024</SelectItem>
                <SelectItem value="November">November 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Badge variant="outline" className="text-blue-600">
            <School className="w-4 h-4 mr-2" />
            Academic Year 2024-25
          </Badge>
        </div>

        {/* AI Analysis Section */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>
              Advanced analysis and predictions based on attendance patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trend Prediction */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Attendance Trend & Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[60, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#6366f1"
                          name="Actual"
                        />
                        <Line
                          type="monotone"
                          dataKey="predicted"
                          stroke="#94a3b8"
                          strokeDasharray="5 5"
                          name="Predicted"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Day-wise Pattern */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Day-wise Pattern Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={patternData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis domain={[60, 100]} />
                        <Tooltip />
                        <Bar dataKey="attendance" fill="#6366f1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Absence Reasons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Absence Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reasonsData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {reasonsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Holidays
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View All Holidays</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Academic Calendar 2024-25</DialogTitle>
                      <DialogDescription>
                        Complete list of holidays and important dates
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {holidays.map((holiday, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{holiday.date}</Badge>
                            <span className="font-medium">{holiday.name}</span>
                          </div>
                          <Badge variant="secondary">{holiday.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holidays.slice(0, 3).map((holiday, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{holiday.date}</Badge>
                      <span className="font-medium">{holiday.name}</span>
                    </div>
                    <Badge variant="secondary">{holiday.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AttendanceHeatmap />
    </>
  );
};

export default AttendanceDetailed;
