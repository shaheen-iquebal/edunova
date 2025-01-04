import AcademicYearCountdown from "../AcademicYearCountdown";
import ActionableRecommendations from "../ActionableRecommendations";
import AttendanceHeatmap from "../AttendanceHeatmap";
import ChartAnalytics from "../ChartAnalytics";
import ChartAnalytics2 from "../ChartAnalytics2";
import ClassPerformanceStats from "../ClassPerformanceStats";
import PredictiveAnalytics from "../PredictiveAnalytics";
import StrengthsWeaknesses from "../StrengthsWeaknesses";
import TopConversationsTable from "../TopConversationsTable";

function Home() {
  return (
    <div>
      <AttendanceHeatmap />
      <div className="pt-10"></div>
      <AcademicYearCountdown />
      <div className="pt-8"></div>
      <ClassPerformanceStats />
      <div className="pt-10"></div>
      <PredictiveAnalytics />
      <div className="pt-10"></div>
      <StrengthsWeaknesses />
      <div className="pt-10"></div>
      <ActionableRecommendations />
      <div className="pt-10"></div>
      <TopConversationsTable />
      <div className="pt-10"></div>
      <ChartAnalytics />
      <div className="pt-10"></div>
      <ChartAnalytics2 />
      <br></br>
    </div>
  );
}

export default Home;
