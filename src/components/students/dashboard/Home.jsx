import AchievementsPanel from "../AchievementsPanel";
import PerformanceOverview from "../PerformanceOverview";
import ProductivityTracker from "../ProductivityTracker";
import RemindersDeadlines from "../RemindersDeadlines";

function Home() {
  return (
    <div>
      <AchievementsPanel />
      <div className="pt-10"></div>
      <PerformanceOverview />
      <div className="pt-10"></div>
      <ProductivityTracker />
      <div className="pt-10"></div>
      <RemindersDeadlines />
      <br></br>
    </div>
  );
}

export default Home;
