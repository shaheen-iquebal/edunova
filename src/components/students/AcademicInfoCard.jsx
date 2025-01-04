import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import { FaWalking } from "react-icons/fa";

const AcademicInfoSection = () => {
  const academicInfo = {
    currentClass: "10",
    subjectsEnrolled: [
      "Mathematics",
      "Science",
      "English",
      "History",
      "Physical Education",
    ],
    previousAcademicYear: {
      grade: "A",
      percentage: 89.5,
      classTeacher: "Mr. Smith",
    },
    attendanceRecord: {
      totalDaysPresent: 180,
      attendancePercentage: 95,
    },
  };

  return (
    <div className="grid grid-cols-[1fr,300px] gap-6 mt-6">
      {/* Academic Info Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-green-500" />
          <CardTitle className="!mt-0">Academic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Current Enrollment */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Current Enrollment
              </h4>
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Current Class</p>
                  <p className="font-medium">
                    Class {academicInfo.currentClass}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Subjects Enrolled
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {academicInfo.subjectsEnrolled.map((subject) => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Academic Year */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Previous Academic Year
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <p className="font-medium text-lg">
                    {academicInfo.previousAcademicYear.grade}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="font-medium text-lg">
                    {academicInfo.previousAcademicYear.percentage}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class Teacher</p>
                  <p className="font-medium">
                    {academicInfo.previousAcademicYear.classTeacher}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <FaWalking className="w-5 h-5 text-orange-500" />
          <CardTitle className="!mt-0">Attendance Record</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 h-[calc(100%-2rem)] items-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Days Present</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">
                  {academicInfo.attendanceRecord.totalDaysPresent}
                </span>
                <span className="text-muted-foreground">days</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Attendance Rate
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-green-600">
                  {academicInfo.attendanceRecord.attendancePercentage}
                </span>
                <span className="text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicInfoSection;
