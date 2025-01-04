import StudentProfileCard from "./StudentProfileCard";
import AcademicInfoCard from "./AcademicInfoCard";
import ExamResultsChart from "./ExamResultsChart ";
import StudentActivities from "./StudentActivities ";
import StudentAdminInfo from "./StudentAdminInfo";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";

const ProfileDetails = () => {
  return (
    <>
      <StudentProfileCard />
      <AcademicInfoCard />
      <ExamResultsChart />
      <StudentActivities />
      <StudentAdminInfo />
      <br></br>
    </>
  );
};

export default ProfileDetails;
