/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Star,
  Target,
  Zap,
  TrendingUp,
  Brain,
  Medal,
  Crown,
  Award,
  Clock,
} from "lucide-react";

const currentBadges = [
  {
    id: 1,
    title: "Math Champion 2024",
    description: "Top 1% in Advanced Mathematics",
    icon: Trophy,
    date: "March 2024",
    rarity: "Legendary",
    color: "bg-amber-500",
    stats: {
      achieved: "March 15, 2024",
      totalEarners: "43 students",
      percentile: "99th",
    },
  },
  {
    id: 2,
    title: "Science Explorer",
    description: "Completed 50 Lab Experiments",
    icon: Star,
    date: "February 2024",
    rarity: "Epic",
    color: "bg-purple-500",
    stats: {
      achieved: "February 28, 2024",
      totalEarners: "156 students",
      percentile: "85th",
    },
  },
  {
    id: 3,
    title: "Consistent Performer",
    description: "Maintained Above 90% for 6 Months",
    icon: Target,
    date: "January 2024",
    rarity: "Rare",
    color: "bg-blue-500",
    stats: {
      achieved: "January 10, 2024",
      totalEarners: "284 students",
      percentile: "78th",
    },
  },
];

const historicalBadges = [
  {
    id: 4,
    title: "Physics Pioneer",
    description: "Perfect Score in Physics Finals",
    icon: Zap,
    date: "November 2023",
    rarity: "Epic",
    color: "bg-purple-500",
    stats: {
      achieved: "November 20, 2023",
      totalEarners: "89 students",
      percentile: "92nd",
    },
  },
  {
    id: 5,
    title: "Chemistry Master",
    description: "Completed Advanced Chemistry Course",
    icon: Award,
    date: "September 2023",
    rarity: "Rare",
    color: "bg-blue-500",
    stats: {
      achieved: "September 5, 2023",
      totalEarners: "312 students",
      percentile: "75th",
    },
  },
];

const aiInsights = [
  {
    title: "Achievement Pattern",
    description:
      "Your badge collection shows strong focus in STEM subjects, particularly excelling in Mathematics and Physics.",
    icon: Brain,
    recommendation:
      "Consider exploring Computer Science badges to complement your strong analytical skills.",
  },
  {
    title: "Progress Trajectory",
    description:
      "Consistent improvement in badge rarity over the past 6 months, moving from Rare to Legendary tier achievements.",
    icon: TrendingUp,
    recommendation:
      "You're on track to unlock the 'Academic Excellence' legendary badge within the next 2 months.",
  },
];

export default function GamificationDetailed() {
  const BadgeCard = ({ badge, isExpanded = false }) => (
    <div className="group relative">
      <div
        className={`
        p-4 rounded-lg mb-4 border transition-all
        ${isExpanded ? "bg-white shadow-lg" : "hover:shadow-md"}
      `}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full ${badge.color}`}>
            <badge.icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{badge.title}</h3>
              <Badge variant="outline" className="text-xs">
                {badge.rarity}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{badge.description}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <Clock className="h-4 w-4 inline mr-1" />
            {badge.date}
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Achieved</div>
              <div className="font-medium">{badge.stats.achieved}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Total Earners</div>
              <div className="font-medium">{badge.stats.totalEarners}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Percentile</div>
              <div className="font-medium">{badge.stats.percentile}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Achievement Showcase
            </CardTitle>
            <Crown className="h-8 w-8 text-amber-500" />
          </div>
          <p className="text-sm text-muted-foreground">
            Your journey of excellence, powered by AI-driven achievement
            tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Medal className="h-5 w-5 text-blue-500" />
                Current Achievements
              </h2>
              <div className="space-y-4">
                {currentBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} isExpanded={true} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Previous Achievements
              </h2>
              <div className="space-y-4">
                {historicalBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            AI-Powered Achievement Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <insight.icon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">{insight.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {insight.description}
                </p>
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Zap className="h-4 w-4" />
                    <span>AI Recommendation:</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    {insight.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
