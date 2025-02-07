import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  Target,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Play,
  BookMarked,
  Award,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle,
  Focus,
  Target as TargetIcon,
} from "lucide-react";

import {
  topicPerformance,
  weakPoints,
  recommendedPractice,
  quickSummaryData,
} from "./calculus-data";

const CalculusInsights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Calculus Performance
          </h1>
          <p className="text-gray-600 mt-2">Detailed Analysis & Action Plan</p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2">
          Current Grade: B+ (88%)
        </Badge>
      </div>

      {/* Quick Summary Section */}
      <Card className="bg-blue-50">
        <CardHeader>
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-blue-600 mr-2" />
            <CardTitle>Quick Summary</CardTitle>
          </div>
          <CardDescription>Here's how you're doing in Calculus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* What You're Great At */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center text-green-700">
                <CheckCircle className="h-5 w-5 mr-2" />
                What You're Great At
              </h3>
              <ul className="space-y-2">
                {quickSummaryData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center text-orange-700">
                <TargetIcon className="h-5 w-5 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {quickSummaryData.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mr-2" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Focus Areas */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center text-blue-700">
                <Focus className="h-5 w-5 mr-2" />
                Priority Focus Areas
              </h3>
              <div className="space-y-3">
                {quickSummaryData.focusAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{area.title}</span>
                      <Badge
                        variant="outline"
                        className={`${
                          area.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {area.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Priority Action Items</CardTitle>
          <CardDescription>
            Complete these tasks to improve your grade to an A
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Today's Tasks */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold flex items-center text-blue-700 mb-3">
                <Calendar className="h-5 w-5 mr-2" />
                Today's Focus
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Play className="h-4 w-4 text-green-500 mr-2" />
                  <span>
                    Complete Integration by Parts worksheet (15 problems)
                  </span>
                </div>
                <div className="flex items-center">
                  <Play className="h-4 w-4 text-green-500 mr-2" />
                  <span>Watch video on Trig Substitution (20 mins)</span>
                </div>
                <Button className="w-full mt-2">
                  Start Today's Tasks <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* This Week */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold flex items-center text-purple-700 mb-3">
                <Target className="h-5 w-5 mr-2" />
                This Week's Goals
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 mr-2" />
                  <span>
                    Master Integration techniques through practice tests
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 mr-2" />
                  <span>Complete Series Convergence module</span>
                </div>
                <Button variant="outline" className="w-full mt-2">
                  View Weekly Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              <CardTitle>Topic Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={topicPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Resources */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <BookMarked className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle>Learning Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedPractice.map((section, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">{section.type}</h4>
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-white p-3 rounded mb-2 shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.title}</span>
                        <Badge variant="outline">
                          {item.duration || `${item.problems} problems`}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Difficulty: {item.difficulty}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Improvement Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Award className="h-6 w-6 text-yellow-600 mr-2" />
            <CardTitle>Personalized Study Plan</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weakPoints.map((area, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{area.topic}</h3>
                <div className="space-y-3">
                  {area.subtopics.map((subtopic, subIdx) => (
                    <div
                      key={subIdx}
                      className="bg-white p-3 rounded shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span>{subtopic.name}</span>
                        <Badge
                          variant="outline"
                          className={`${
                            subtopic.score >= 80
                              ? "bg-green-100 text-green-800"
                              : subtopic.score >= 70
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {subtopic.score}%
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                      >
                        Start Practice
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Generate Detailed Study Schedule
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CalculusInsights;
