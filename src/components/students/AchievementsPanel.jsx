import React, { useState, useEffect } from "react";
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
  Award,
  Star,
  Trophy,
  BookOpen,
  Lightbulb,
  Quote,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";

const AchievementsPanel = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  // Sample data - in real app, this would come from an API
  const achievements = [
    {
      id: 1,
      title: "Top Performer in Math",
      description: "Achieved 95% in Advanced Calculus",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      date: "March 2024",
    },
    {
      id: 2,
      title: "Consistent Learner",
      description: "Completed 30 days streak of study",
      icon: <Star className="h-6 w-6 text-purple-500" />,
      date: "March 2024",
    },
    {
      id: 3,
      title: "Physics Master",
      description: "Solved 100 practice problems",
      icon: <Award className="h-6 w-6 text-blue-500" />,
      date: "February 2024",
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Practice Algebra Quiz",
      description: "Strengthen your quadratic equations skills",
      type: "quiz",
      subject: "Mathematics",
      duration: "20 mins",
    },
    {
      id: 2,
      title: "Watch Video Tutorial",
      description: "Understanding Newton's Laws of Motion",
      type: "video",
      subject: "Physics",
      duration: "15 mins",
    },
    {
      id: 3,
      title: "Interactive Lab Session",
      description: "Chemical Reactions Simulation",
      type: "interactive",
      subject: "Chemistry",
      duration: "30 mins",
    },
  ];

  const quotes = [
    {
      text: "The only way to learn mathematics is to do mathematics.",
      author: "Paul Halmos",
    },
    {
      text: "Education is not preparation for life; education is life itself.",
      author: "John Dewey",
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const getRecommendationIcon = (type) => {
    switch (type) {
      case "quiz":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <BrainCircuit className="h-5 w-5" />;
      case "interactive":
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Achievements Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>
            Your latest academic accomplishments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex flex-col items-center p-4 border rounded-lg bg-gradient-to-b from-white to-slate-50"
              >
                <div className="mb-2">{achievement.icon}</div>
                <h3 className="text-center font-semibold mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-center text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                <Badge variant="outline" className="mt-auto">
                  {achievement.date}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Activities tailored to improve your performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getRecommendationIcon(recommendation.type)}
                    <Badge variant="secondary">{recommendation.subject}</Badge>
                  </div>
                  <Badge variant="outline">{recommendation.duration}</Badge>
                </div>
                <h3 className="font-semibold mb-2">{recommendation.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {recommendation.description}
                </p>
                <Button variant="outline" className="w-full">
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Quote Section */}
      <Card className="shadow-lg">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <Quote className="h-8 w-8 text-muted-foreground shrink-0" />
            <div className="space-y-2">
              <p className="text-lg font-medium italic">
                "{quotes[currentQuote].text}"
              </p>
              <p className="text-sm text-muted-foreground">
                — {quotes[currentQuote].author}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsPanel;
