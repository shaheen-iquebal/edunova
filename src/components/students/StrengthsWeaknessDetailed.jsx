import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Brain,
  ChevronRight,
  Lightbulb,
  Zap,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const strengthsData = [
  {
    category: "Critical Analysis",
    score: 92,
    topics: ["Data Interpretation", "Logical Reasoning", "Pattern Recognition"],
    recommendations: [
      "Consider participating in advanced analysis workshops",
      "Take on leadership roles in group projects",
    ],
    trend: "up",
  },
  {
    category: "Problem Solving",
    score: 88,
    topics: ["Mathematical Modeling", "Algorithm Design", "Strategic Planning"],
    recommendations: [
      "Explore complex real-world problem scenarios",
      "Join competitive programming challenges",
    ],
    trend: "up",
  },
  {
    category: "Creative Thinking",
    score: 85,
    topics: ["Innovation", "Abstract Thinking", "Unique Solutions"],
    recommendations: [
      "Engage in interdisciplinary projects",
      "Practice brainstorming techniques",
    ],
    trend: "stable",
  },
];

const weaknessesData = [
  {
    category: "Time Management",
    score: 65,
    topics: ["Task Prioritization", "Study Planning", "Deadline Management"],
    recommendations: [
      "Use time-blocking techniques",
      "Set up a structured study schedule",
    ],
    trend: "down",
  },
  {
    category: "Group Collaboration",
    score: 70,
    topics: ["Team Communication", "Project Coordination", "Peer Feedback"],
    recommendations: ["Join study groups", "Take initiative in team projects"],
    trend: "up",
  },
];

const chartData = [...strengthsData, ...weaknessesData].map((item) => ({
  ...item,
  type: item.score >= 80 ? "Strength" : "Growth Area",
}));

export default function StrengthsWeaknessDetailed() {
  const [expandedStrength, setExpandedStrength] = useState(0);
  const [expandedWeakness, setExpandedWeakness] = useState(0);

  const renderTopicBadges = (topics) => {
    return topics.map((topic) => (
      <Badge key={topic} variant="secondary" className="mr-2 mb-2">
        {topic}
      </Badge>
    ));
  };

  const renderTrend = (trend) => {
    if (trend === "up") return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <TrendingUp className="h-4 w-4 text-blue-500" />;
  };

  const renderRecommendations = (recommendations) => {
    return recommendations.map((rec, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <ChevronRight className="h-4 w-4 text-blue-500" />
        <span>{rec}</span>
      </div>
    ));
  };

  const getBarColor = (score) => {
    if (score >= 90) return "#22c55e";
    if (score >= 80) return "#3b82f6";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Brain className="h-8 w-8 text-blue-500" />
            <div>
              <CardTitle className="text-2xl font-bold">
                Overall Skills Assessment
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive analysis of your strengths and areas for
                improvement
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-700">Top Strength</h3>
                <p className="text-lg font-bold">Critical Analysis (92%)</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-orange-700">
                  Priority Focus
                </h3>
                <p className="text-lg font-bold">Time Management (65%)</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-700">Most Improved</h3>
                <p className="text-lg font-bold">Group Collaboration</p>
              </CardContent>
            </Card>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="category" type="category" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-lg border">
                          <p className="font-bold">{data.category}</p>
                          <p>Score: {data.score}%</p>
                          <p>Type: {data.type}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span>Trend:</span>
                            {renderTrend(data.trend)}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={getBarColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Excellent (90%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm">Strong (80-89%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm">Developing (70-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Needs Focus (&lt;70%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative">
          <div className="absolute top-4 right-4">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Core Strengths Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Detailed breakdown of your strongest capabilities with
              personalized enhancement strategies
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {strengthsData.map((strength, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
                onClick={() =>
                  setExpandedStrength(expandedStrength === index ? null : index)
                }
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{strength.category}</h3>
                    {renderTrend(strength.trend)}
                  </div>
                  <Badge
                    variant="success"
                    className="bg-green-100 text-green-800"
                  >
                    {strength.score}%
                  </Badge>
                </div>
                {expandedStrength === index && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Mastered Topics</h4>
                      <div className="flex flex-wrap">
                        {renderTopicBadges(strength.topics)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Growth Opportunities</h4>
                      {renderRecommendations(strength.recommendations)}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg mt-3">
                      <h4 className="font-medium text-blue-700 mb-2">
                        AI-Generated Next Steps
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Short-term:</span>
                          <span>
                            Complete advanced practice exercises in{" "}
                            {strength.topics[0]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Long-term:</span>
                          <span>
                            Work towards certification in {strength.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="relative">
          <div className="absolute top-4 right-4">
            <AlertCircle className="h-6 w-6 text-orange-500" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Growth Areas & Action Plan
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Targeted improvement strategies with weekly progress tracking
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {weaknessesData.map((weakness, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
                onClick={() =>
                  setExpandedWeakness(expandedWeakness === index ? null : index)
                }
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{weakness.category}</h3>
                    {renderTrend(weakness.trend)}
                  </div>
                  <Badge variant="danger" className="bg-red-100 text-red-800">
                    {weakness.score}%
                  </Badge>
                </div>
                {expandedWeakness === index && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Priority Focus Areas</h4>
                      <div className="flex flex-wrap">
                        {renderTopicBadges(weakness.topics)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Improvement Strategy</h4>
                      {renderRecommendations(weakness.recommendations)}
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <h4 className="font-medium text-orange-700 mb-2">
                        Weekly Action Items
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="bg-orange-100 p-1 rounded">
                            Mon-Wed
                          </div>
                          <span>Focus on {weakness.topics[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="bg-orange-100 p-1 rounded">
                            Thu-Fri
                          </div>
                          <span>Practice {weakness.topics[1]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="bg-orange-100 p-1 rounded">
                            Weekend
                          </div>
                          <span>
                            Review and reflect on {weakness.topics[2]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg mt-2">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Progress Tracking
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Next Assessment:</span>
                          <Badge className="bg-blue-100 text-blue-800">
                            2 weeks
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Target Score:</span>
                          <Badge className="bg-green-100 text-green-800">
                            {weakness.score + 10}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold">Your Learning Assistant</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our AI system analyzes your performance across multiple dimensions
              to provide personalized guidance and actionable recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Weekly Focus</h4>
                <p className="text-sm">
                  Prioritize {weaknessesData[0].category.toLowerCase()} skills
                  through structured practice
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">
                  Key Achievement
                </h4>
                <p className="text-sm">
                  Significant improvement in{" "}
                  {strengthsData[0].category.toLowerCase()}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">
                  Next Milestone
                </h4>
                <p className="text-sm">
                  Advanced certification in {strengthsData[0].topics[0]}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
