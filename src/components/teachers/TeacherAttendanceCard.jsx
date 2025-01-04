import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TeacherAttendanceCard = () => {
  const attendanceData = {
    summary: {
      totalWorkingDays: 220,
      daysPresent: 210,
      daysAbsent: 5,
      daysOnLeave: 5,
      attendancePercentage: 95.45,
      lastUpdated: "2024-03-15",
    },
    monthlyAttendance: [
      { month: "Jan", attendance: 95 },
      { month: "Feb", attendance: 98 },
      { month: "Mar", attendance: 92 },
      { month: "Apr", attendance: 96 },
      { month: "May", attendance: 94 },
      { month: "Jun", attendance: 97 },
    ],
    recentRecords: [
      {
        date: "2024-03-15",
        status: "present",
        checkIn: "08:45 AM",
        checkOut: "04:15 PM",
        totalHours: "7.5",
      },
      {
        date: "2024-03-14",
        status: "present",
        checkIn: "08:30 AM",
        checkOut: "04:00 PM",
        totalHours: "7.5",
      },
      {
        date: "2024-03-13",
        status: "leave",
        reason: "Medical Appointment",
        leaveType: "Sick Leave",
      },
      {
        date: "2024-03-12",
        status: "present",
        checkIn: "08:40 AM",
        checkOut: "04:10 PM",
        totalHours: "7.5",
      },
      {
        date: "2024-03-11",
        status: "present",
        checkIn: "08:35 AM",
        checkOut: "04:05 PM",
        totalHours: "7.5",
      },
    ],
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "leave":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-purple-600" />
          <h3 className="text-2xl font-semibold">Attendance Record</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Working Days</p>
            <p className="text-2xl font-semibold">
              {attendanceData.summary.totalWorkingDays}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Days Present</p>
            <p className="text-2xl font-semibold text-green-600">
              {attendanceData.summary.daysPresent}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Days Absent</p>
            <p className="text-2xl font-semibold text-red-600">
              {attendanceData.summary.daysAbsent}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Days on Leave</p>
            <p className="text-2xl font-semibold text-yellow-600">
              {attendanceData.summary.daysOnLeave}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Attendance %</p>
            <p className="text-2xl font-semibold text-blue-600">
              {attendanceData.summary.attendancePercentage}%
            </p>
          </div>
        </div>

        {/* Attendance Trend Chart */}
        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-4">
            Monthly Attendance Trend
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData.monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Records */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Recent Records</h4>
          <div className="border rounded-lg divide-y">
            {attendanceData.recentRecords.map((record, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <p className="font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                  {record.status === "present" ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{record.checkIn}</span>
                        <span>-</span>
                        <span>{record.checkOut}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Total: </span>
                        <span>{record.totalHours} hrs</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Type: </span>
                        {record.leaveType}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Reason: </span>
                        {record.reason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground text-right">
          Last updated:{" "}
          {new Date(attendanceData.summary.lastUpdated).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherAttendanceCard;
