import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trophy,
  BookOpen,
  Award,
  Users,
  Book,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StudentActivities = () => {
  const data = {
    extracurricularActivities: {
      sports: ["Basketball"],
      clubs: ["Drama Club", "Science Club"],
      achievements: ["Won Inter-School Basketball Championship 2023"],
    },
    behavioralRecords: {
      teacherFeedback: "John is a hardworking and disciplined student.",
      disciplineReports: null,
      awardsAndRecognition: ["Best Student Award 2023"],
    },
    miscellaneous: {
      libraryRecord: {
        booksBorrowed: ["The Great Gatsby", "To Kill a Mockingbird"],
        overdueBooks: [],
      },
    },
  };

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {/* Extracurricular Activities Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <Trophy className="w-5 h-5 text-orange-500" />
          <CardTitle className="!mt-0">Extracurricular</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">
                Sports
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.extracurricularActivities.sports.map((sport) => (
                <Badge key={sport} variant="secondary">
                  {sport}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">
                Clubs
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.extracurricularActivities.clubs.map((club) => (
                <Badge key={club} variant="secondary">
                  {club}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">
                Achievements
              </p>
            </div>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.extracurricularActivities.achievements.map(
                (achievement) => (
                  <li key={achievement}>{achievement}</li>
                )
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Records Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <Award className="w-5 h-5 text-blue-500" />
          <CardTitle className="!mt-0">Behavioral Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              Teacher Feedback
            </p>
            <p className="text-sm italic">
              &quot;{data.behavioralRecords.teacherFeedback}&quot;
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">
                Awards & Recognition
              </p>
            </div>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.behavioralRecords.awardsAndRecognition.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>

          {data.behavioralRecords.disciplineReports === null && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>No discipline reports</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Library Record Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <BookOpen className="w-5 h-5 text-purple-500" />
          <CardTitle className="!mt-0">Library Record</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Book className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">
                Currently Borrowed
              </p>
            </div>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.miscellaneous.libraryRecord.booksBorrowed.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>
          </div>

          {data.miscellaneous.libraryRecord.overdueBooks.length === 0 && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>No overdue books</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentActivities;
