import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Brain, ChevronRight, Lightbulb, Zap } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
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
  },
  {
    category: "Problem Solving",
    score: 88,
    topics: ["Mathematical Modeling", "Algorithm Design", "Strategic Planning"],
    recommendations: [
      "Explore complex real-world problem scenarios",
      "Join competitive programming challenges",
    ],
  },
  {
    category: "Creative Thinking",
    score: 85,
    topics: ["Innovation", "Abstract Thinking", "Unique Solutions"],
    recommendations: [
      "Engage in interdisciplinary projects",
      "Practice brainstorming techniques",
    ],
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
  },
  {
    category: "Group Collaboration",
    score: 70,
    topics: ["Team Communication", "Project Coordination", "Peer Feedback"],
    recommendations: ["Join study groups", "Take initiative in team projects"],
  },
];

const radarData = [...strengthsData, ...weaknessesData].map((item) => ({
  category: item.category,
  score: item.score,
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

  const renderRecommendations = (recommendations) => {
    return recommendations.map((rec, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <ChevronRight className="h-4 w-4 text-blue-500" />
        <span>{rec}</span>
      </div>
    ));
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 justify-bsetween">
            <Brain className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-2xl font-bold">
              AI-Powered Skills Analysis
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Powered by advanced machine learning algorithms and deep neural
            networks, this analysis provides real-time insights into your
            academic progress and cognitive development patterns.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
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
              Core Strengths
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Areas where our AI has identified exceptional performance patterns
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
                  <h3 className="font-semibold">{strength.category}</h3>
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
                      <h4 className="font-medium mb-2">Key Topics</h4>
                      <div className="flex flex-wrap">
                        {renderTopicBadges(strength.topics)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">AI Recommendations</h4>
                      {renderRecommendations(strength.recommendations)}
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
              Growth Areas
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Opportunities for improvement identified through predictive
              analytics
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
                  <h3 className="font-semibold">{weakness.category}</h3>
                  <Badge variant="danger" className="bg-red-100 text-red-800">
                    {weakness.score}%
                  </Badge>
                </div>
                {expandedWeakness === index && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Focus Areas</h4>
                      <div className="flex flex-wrap">
                        {renderTopicBadges(weakness.topics)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        AI-Generated Action Plan
                      </h4>
                      {renderRecommendations(weakness.recommendations)}
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
            <h3 className="text-lg font-semibold">AI-Powered Insight Engine</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Our advanced neural networks continuously analyze your performance
            patterns, learning behaviors, and cognitive development to provide
            real-time, personalized insights. Using state-of-the-art machine
            learning algorithms, we process thousands of data points to generate
            actionable recommendations tailored specifically to your learning
            journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
