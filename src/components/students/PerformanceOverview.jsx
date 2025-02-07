import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Target,
  TrendingUp,
  Focus,
  ArrowRight,
  Star,
} from "lucide-react";

const PerformanceInsights = () => {
  const navigate = useNavigate(); // Initialize the navigation function
  const [selectedInsight, setSelectedInsight] = useState(null);

  const strengths = [
    {
      id: "cs_advanced",
      subject: "Computer Science",
      topic: "Advanced Programming",
      score: 98,
      icon: <BookOpen className="text-blue-600 h-6 w-6" />,
      actionItems: [
        "Explore advanced coding challenges",
        "Consider competitive programming",
        "Develop a complex software project",
      ],
    },
    {
      id: "math_calculus",
      subject: "Mathematics",
      topic: "Calculus",
      score: 88,
      icon: <Target className="text-green-600 h-6 w-6" />,
      actionItems: [
        "Dive into advanced calculus topics",
        "Participate in math olympiads",
        "Learn application of calculus in real-world scenarios",
      ],
    },
    {
      id: "english_literature",
      subject: "English",
      topic: "Literature Analysis",
      score: 92,
      icon: <Star className="text-purple-600 h-6 w-6" />,
      actionItems: [
        "Explore advanced literary criticism",
        "Start a literature blog",
        "Participate in writing workshops",
      ],
    },
  ];

  const weaknesses = [
    {
      id: "physics_mechanics",
      subject: "Physics",
      topic: "Mechanics",
      score: 65,
      icon: <Focus className="text-red-600 h-6 w-6" />,
      actionItems: [
        "Focused study on fundamental mechanics principles",
        "Practice problem-solving with step-by-step approach",
        "Seek additional tutoring or online resources",
      ],
    },
    {
      id: "chemistry_organic",
      subject: "Chemistry",
      topic: "Organic Chemistry",
      score: 72,
      icon: <TrendingUp className="text-orange-600 h-6 w-6" />,
      actionItems: [
        "Break down complex organic chemistry concepts",
        "Use visualization techniques for molecular structures",
        "Create mind maps and summary notes",
      ],
    },
  ];

  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
    // In a real app, you'd navigate to a detailed page
    // console.log("Navigating to insight:", insight);

    setSelectedInsight(insight);

    if (insight.id === "cs_advanced") {
      navigate("/student/cs-detailed-insights");
      // window.scrollTo(0, 0);
    } else if (insight.id === "math_calculus") {
      navigate("/student/maths-detailed-insights");
    } else if (insight.id === "english_literature") {
      navigate("/student/literature-detailed-insights");
    } else if (insight.id === "physics_mechanics") {
      navigate("/student/physics-detailed-insights");
    } else if (insight.id === "chemistry_organic") {
      navigate("/student/chemistry-detailed-insights");
    } else {
      console.log("No matching route for insight:", insight);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 bg-gray-50">
      {/* Strengths and Weaknesses Column */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Performance Landscape
          </CardTitle>
          <CardDescription>
            Comprehensive overview of academic strengths and areas for growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <Star className="mr-2 text-green-600" /> Strengths
              </h3>
              {strengths.map((strength) => (
                <div
                  key={strength.id}
                  className="flex items-center mb-4 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  {strength.icon}
                  <div className="ml-4 flex-grow">
                    <h4 className="font-semibold text-gray-800">
                      {strength.subject} - {strength.topic}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Score: {strength.score}%
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-200 text-green-800"
                  >
                    Top Performer
                  </Badge>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                <Focus className="mr-2 text-red-600" /> Areas for Improvement
              </h3>
              {weaknesses.map((weakness) => (
                <div
                  key={weakness.id}
                  className="flex items-center mb-4 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  {weakness.icon}
                  <div className="ml-4 flex-grow">
                    <h4 className="font-semibold text-gray-800">
                      {weakness.subject} - {weakness.topic}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Score: {weakness.score}%
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-red-200 text-red-800">
                    Need Focus
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Insights Column */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Personalized Learning Roadmap
          </CardTitle>
          <CardDescription>
            Tailored recommendations to accelerate your academic growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Recommended Actions
              </h3>
              {[...strengths, ...weaknesses].map((insight) => (
                <div
                  key={insight.id}
                  className="mb-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                  onClick={() => handleInsightClick(insight)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {insight.subject} - {insight.topic}
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                        {insight.actionItems.slice(0, 2).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-4 bg-emerald-600 text-white"
                      onClick={() => handleInsightClick(insight)}
                    >
                      Detailed Insights <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceInsights;
