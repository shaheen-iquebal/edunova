import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LightbulbIcon,
  BookOpen,
  ClipboardList,
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const ActionableRecommendations = () => {
  const [completedActions, setCompletedActions] = useState(new Set());

  // Sample recommendations data
  const recommendations = [
    {
      id: 1,
      priority: "high",
      subject: "Mathematics",
      topic: "Calculus",
      action: "Schedule review session",
      reason: "Average score dropped by 15% in recent assessment",
      timeframe: "This week",
      impactedStudents: 12,
      specificAction: "Focus on derivatives and integration concepts",
    },
    {
      id: 2,
      priority: "medium",
      subject: "Physics",
      topic: "Mechanics",
      action: "Assign additional practice",
      reason: "60% of students scored below threshold in Chapter 5",
      timeframe: "Next 2 weeks",
      impactedStudents: 8,
      specificAction: "Provide problem sets focusing on force and motion",
    },
    {
      id: 3,
      priority: "low",
      subject: "Chemistry",
      topic: "Organic Chemistry",
      action: "Create study groups",
      reason: "Peer learning could help improve understanding",
      timeframe: "Next month",
      impactedStudents: 15,
      specificAction:
        "Form groups of 3-4 students with mixed performance levels",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleAction = (id) => {
    setCompletedActions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LightbulbIcon className="h-6 w-6 text-yellow-500" />
              <CardTitle>Actionable Recommendations</CardTitle>
            </div>
            <Badge variant="outline" className="ml-2">
              {recommendations.length} Actions
            </Badge>
          </div>
          <CardDescription>
            Data-driven suggestions to improve class performance
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card
            key={rec.id}
            className={`transition-all duration-200 ${
              completedActions.has(rec.id) ? "opacity-60" : ""
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-4 flex-1">
                  {/* Header Section */}
                  <div className="flex items-center gap-3">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <BookOpen className="h-3 w-3" />
                      {rec.subject}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ClipboardList className="h-3 w-3" />
                      {rec.topic}
                    </Badge>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{rec.action}</h3>
                    <p className="text-gray-600">{rec.reason}</p>
                  </div>

                  {/* Details Section */}
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {rec.timeframe}
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {rec.impactedStudents} students impacted
                    </div>
                  </div>

                  {/* Specific Action */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      {rec.specificAction}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant={completedActions.has(rec.id) ? "outline" : "default"}
                  className="ml-4"
                  onClick={() => toggleAction(rec.id)}
                >
                  {completedActions.has(rec.id) ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                    </span>
                  ) : (
                    "Mark Complete"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActionableRecommendations;
