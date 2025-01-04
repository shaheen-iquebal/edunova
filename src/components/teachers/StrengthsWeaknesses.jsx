import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpCircle, ArrowDownCircle, BookOpen, Target } from "lucide-react";

const StrengthsWeaknesses = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Sample data
  const subjectsData = {
    mathematics: {
      overall: 78,
      strengths: [
        { topic: "Algebra", score: 85, improvement: 7 },
        { topic: "Geometry", score: 82, improvement: 5 },
      ],
      weaknesses: [
        { topic: "Calculus", score: 65, decline: 4 },
        { topic: "Statistics", score: 68, decline: 3 },
      ],
      topicBreakdown: [
        { topic: "Algebra", current: 85, previous: 78 },
        { topic: "Geometry", current: 82, previous: 77 },
        { topic: "Calculus", current: 65, previous: 69 },
        { topic: "Statistics", current: 68, previous: 71 },
        { topic: "Trigonometry", current: 75, previous: 73 },
      ],
    },
    science: {
      overall: 72,
      strengths: [
        { topic: "Biology", score: 80, improvement: 6 },
        { topic: "Chemistry", score: 79, improvement: 4 },
      ],
      weaknesses: [
        { topic: "Physics", score: 62, decline: 5 },
        { topic: "Earth Science", score: 67, decline: 3 },
      ],
      topicBreakdown: [
        { topic: "Biology", current: 80, previous: 74 },
        { topic: "Chemistry", current: 79, previous: 75 },
        { topic: "Physics", current: 62, previous: 67 },
        { topic: "Earth Science", current: 67, previous: 70 },
      ],
    },
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpCircle className="text-green-600" />
              Class Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(subjectsData).map(([subject, data]) =>
                data.strengths.map((strength, idx) => (
                  <div
                    key={`${subject}-${idx}`}
                    className="flex justify-between items-center p-2 bg-white rounded-lg"
                  >
                    <span className="font-medium">{strength.topic}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="success"
                        className="bg-green-100 text-green-800"
                      >
                        {strength.score}%
                      </Badge>
                      <span className="text-green-600 text-sm">
                        +{strength.improvement}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownCircle className="text-red-600" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(subjectsData).map(([subject, data]) =>
                data.weaknesses.map((weakness, idx) => (
                  <div
                    key={`${subject}-${idx}`}
                    className="flex justify-between items-center p-2 bg-white rounded-lg"
                  >
                    <span className="font-medium">{weakness.topic}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="destructive"
                        className="bg-red-100 text-red-800"
                      >
                        {weakness.score}%
                      </Badge>
                      <span className="text-red-600 text-sm">
                        -{weakness.decline}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            In-Depth Analysis
          </CardTitle>
          <CardDescription>
            Click on subjects for detailed performance breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {Object.entries(subjectsData).map(([subject, data]) => (
              <AccordionItem key={subject} value={subject}>
                <AccordionTrigger className="text-lg">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    <Badge variant="outline">{data.overall}%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.topicBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar
                          dataKey="current"
                          fill="#6366f1"
                          name="Current Score"
                        />
                        <Bar
                          dataKey="previous"
                          fill="#94a3b8"
                          name="Previous Score"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsWeaknesses;
