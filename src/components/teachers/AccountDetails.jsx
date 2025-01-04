import TeacherAcademicCard from "./TeacherAcademicCard";
import TeacherAchievementsMedicalSection from "./TeacherAchievementsMedicalSection";
import TeacherAttendanceCard from "./TeacherAttendanceCard";
import TeacherProfileCard from "./TeacherProfileCard";

function AccountDetails() {
  return (
    <div>
      <TeacherProfileCard />
      <div className="pt-8"></div>
      <TeacherAcademicCard />
      <div className="pt-8"></div>
      <TeacherAttendanceCard />
      <div className="pt-8"></div>
      <TeacherAchievementsMedicalSection />
    </div>
  );
}

export default AccountDetails;
