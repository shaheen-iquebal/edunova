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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Atom,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Play,
  Award,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle,
  Lightbulb,
  Binary,
  Target as TargetIcon,
  Workflow,
} from "lucide-react";

import {
  performanceMetrics,
  conceptualAreas,
  practiceResources,
  quickSummaryData,
  studyPathData,
} from "./physics-data";

const PhysicsInsights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-6 space-y-6 bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Physics - Mechanics
          </h1>
          <p className="text-slate-600 mt-2">
            Fundamental Mechanics Analysis & Progress
          </p>
        </div>
        <Badge className="bg-cyan-100 text-cyan-800 text-lg px-4 py-2">
          Current Grade: B+ (88%)
        </Badge>
      </div>

      {/* Homepage Preview Card */}
      <Card className="bg-gradient-to-r from-slate-100 to-cyan-50">
        <CardHeader>
          <div className="flex items-center">
            <Atom className="h-6 w-6 text-cyan-600 mr-2" />
            <CardTitle>Current Focus</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Binary className="h-5 w-5 text-cyan-600 mt-1" />
              <div>
                <h3 className="font-semibold">
                  Focused Study on Fundamental Mechanics Principles
                </h3>
                <p className="text-slate-600">
                  Building strong foundation in core physics concepts
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Workflow className="h-5 w-5 text-cyan-600 mt-1" />
              <div>
                <h3 className="font-semibold">
                  Problem-Solving with Step-by-Step Approach
                </h3>
                <p className="text-slate-600">
                  Systematic method for tackling complex problems
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Summary Section */}
      <Card className="bg-cyan-50">
        <CardHeader>
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-cyan-600 mr-2" />
            <CardTitle>Performance Summary</CardTitle>
          </div>
          <CardDescription>
            Your progress in mechanics fundamentals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strengths */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center text-green-700">
                <CheckCircle className="h-5 w-5 mr-2" />
                Strong Areas
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
                Needs Improvement
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

            {/* Fundamental Mastery */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center text-cyan-700">
                <Lightbulb className="h-5 w-5 mr-2" />
                Core Competencies
              </h3>
              <div className="space-y-3">
                {quickSummaryData.fundamentals.map((area, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{area.title}</span>
                      <Badge
                        variant="outline"
                        className={`${
                          parseInt(area.mastery) >= 85
                            ? "bg-green-100 text-green-800"
                            : parseInt(area.mastery) >= 75
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {area.mastery}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress and Next Steps */}
      <Card className="bg-gradient-to-br from-slate-50 to-cyan-50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Current Progress</CardTitle>
          <CardDescription>
            Your journey through mechanics fundamentals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold flex items-center text-cyan-700 mb-3">
                <Target className="h-5 w-5 mr-2" />
                This Week's Focus
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Play className="h-4 w-4 text-green-500 mr-2" />
                  <span>Complete mechanics problem set focusing on forces</span>
                </div>
                <div className="flex items-center">
                  <Play className="h-4 w-4 text-green-500 mr-2" />
                  <span>Review vector analysis applications</span>
                </div>
                <Button className="w-full mt-2">
                  Start Practice Problems{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-cyan-600 mr-2" />
              <CardTitle>Topic Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#0891b2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Practice Resources */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-cyan-600 mr-2" />
              <CardTitle>Practice Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {practiceResources.map((section, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-lg">
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
                      <p className="text-sm text-slate-600 mt-1">
                        Focus: {item.focus}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhysicsInsights;
