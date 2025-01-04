import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ArrowRight, AlertTriangle } from "lucide-react";

const AttendanceHeatmap = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("10A");
  const [selectedMonth, setSelectedMonth] = useState("December");

  // Sample attendance data per class and month
  const attendanceDatabase = {
    "10A": {
      December: [
        ["98", "95", "92", "88", "90"],
        ["85", "82", "80", "78", "75"],
        ["92", "90", "88", "85", "89"],
        ["78", "75", "72", "70", "68"],
      ],
      November: [
        ["88", "85", "82", "80", "78"],
        ["95", "92", "90", "88", "85"],
        ["82", "80", "78", "75", "72"],
        ["90", "88", "85", "82", "80"],
      ],
    },
    "10B": {
      December: [
        ["92", "90", "88", "85", "82"],
        ["88", "85", "82", "80", "78"],
        ["95", "92", "90", "88", "85"],
        ["85", "82", "80", "78", "75"],
      ],
      November: [
        ["90", "88", "85", "82", "80"],
        ["92", "90", "88", "85", "82"],
        ["88", "85", "82", "80", "78"],
        ["95", "92", "90", "88", "85"],
      ],
    },
  };

  const getColorForAttendance = (value) => {
    const attendance = parseInt(value);
    if (attendance >= 90) return "bg-green-500";
    if (attendance >= 80) return "bg-green-400";
    if (attendance >= 70) return "bg-yellow-400";
    return "bg-red-400";
  };

  const getTextColorForAttendance = (value) => {
    const attendance = parseInt(value);
    return attendance >= 80 ? "text-white" : "text-gray-800";
  };

  // Get current attendance data based on selections
  const getCurrentAttendanceData = () => {
    return attendanceDatabase[selectedClass]?.[selectedMonth] || [];
  };

  // Calculate low attendance alerts based on current selection
  const getLowAttendanceAlerts = () => {
    const currentData = getCurrentAttendanceData();
    const alerts = [];
    currentData.forEach((week, weekIndex) => {
      week.forEach((value, dayIndex) => {
        if (parseInt(value) < 75) {
          alerts.push({
            class: selectedClass,
            date: `${selectedMonth} ${weekIndex * 7 + dayIndex + 1}`,
            attendance: `${value}%`,
          });
        }
      });
    });
    return alerts;
  };

  return (
    <div className="space-y-6">
      {/* Main Heatmap Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Attendance Heatmap
              </CardTitle>
              <CardDescription>
                Weekly attendance patterns for {selectedClass}
              </CardDescription>
            </div>

            {/* Controls moved inside card header */}
            <div className="flex items-center gap-4">
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

              <Button
                className="flex items-center gap-2"
                onClick={() => navigate("/admin/attendance")}
              >
                Full Records
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Week Labels */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="font-medium text-sm">Week</div>
              <div className="font-medium text-sm">Monday</div>
              <div className="font-medium text-sm">Tuesday</div>
              <div className="font-medium text-sm">Wednesday</div>
              <div className="font-medium text-sm">Thursday</div>
              <div className="font-medium text-sm">Friday</div>
            </div>

            {/* Heatmap Grid */}
            {getCurrentAttendanceData().map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-6 gap-2">
                <div className="flex items-center font-medium text-sm">
                  Week {weekIndex + 1}
                </div>
                {week.map((value, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`p-4 rounded-lg ${getColorForAttendance(
                      value
                    )} ${getTextColorForAttendance(value)} 
                      cursor-pointer transition-transform hover:scale-105`}
                    onClick={() =>
                      console.log(
                        `Clicked on Week ${weekIndex + 1}, Day ${dayIndex + 1}`
                      )
                    }
                  >
                    <div className="text-center font-medium">{value}%</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Low Attendance Alerts */}
      <Card className="bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            Low Attendance Alerts for {selectedClass} - {selectedMonth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getLowAttendanceAlerts().map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-amber-800">
                    {alert.class}
                  </Badge>
                  <span className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {alert.date}
                  </span>
                </div>
                <Badge
                  variant="destructive"
                  className="bg-red-100 text-red-800"
                >
                  {alert.attendance} Attendance
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceHeatmap;
