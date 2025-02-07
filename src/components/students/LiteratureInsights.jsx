import React, { useEffect } from "react";
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
  Book,
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
  Focus,
  Target as TargetIcon,
} from "lucide-react";

import {
  performanceMetrics,
  weakPoints,
  recommendedResources,
  quickSummaryData,
} from "./literature-data";

const LiteratureInsights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-6 space-y-6 bg-neutral-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">
            Literature Performance
          </h1>
          <p className="text-neutral-600 mt-2">
            Comprehensive Literary Analysis
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
          Current Grade: A- (90%)
        </Badge>
      </div>

      {/* Quick Summary Section */}
      <Card className="bg-indigo-50">
        <CardHeader>
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-indigo-600 mr-2" />
            <CardTitle>Quick Summary</CardTitle>
          </div>
          <CardDescription>Your literary journey at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strengths */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center text-green-700">
                <CheckCircle className="h-5 w-5 mr-2" />
                Strengths
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
                Improvement Areas
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
                Priority Focus
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
                    <p className="text-sm text-neutral-600 mt-1">
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
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Key Action Items</CardTitle>
          <CardDescription>
            Targeted strategies to elevate your literary skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* This Week's Focus */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold flex items-center text-purple-700 mb-3">
                <Calendar className="h-5 w-5 mr-2" />
                This Week's Objectives
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Play className="h-4 w-4 text-green-500 mr-2" />
                  <span>Complete critical writing workshop</span>
                </div>
                <div className="flex items-center">
                  <Play className="h-4 w-4 text-green-500 mr-2" />
                  <span>Analyze one modern literary text in-depth</span>
                </div>
                <Button className="w-full mt-2">
                  Begin Weekly Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle>Performance Metrics</CardTitle>
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
                  <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Resources */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
              <CardTitle>Recommended Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedResources.map((section, idx) => (
                <div key={idx} className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">{section.type}</h4>
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-white p-3 rounded mb-2 shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.title}</span>
                        <Badge variant="outline">
                          {item.complexity || item.focus}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">
                        {item.estimatedTime || item.intensity} Intensity
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

export default LiteratureInsights;
