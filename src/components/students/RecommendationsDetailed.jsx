/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Target,
  TrendingUp,
  ChevronRight,
  Clock,
  Zap,
  LineChart as ChartIcon,
  ListTodo,
  Star,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const recommendationsData = [
  {
    id: 1,
    category: "High Priority",
    title: "Master Quadratic Equations",
    description:
      "Your recent algebra test shows opportunity for improvement in quadratic equations",
    action: "Take Advanced Algebra Practice Quiz",
    subject: "Mathematics",
    confidence: 92,
    timeEstimate: "45 mins",
    impact: "high",
    status: "new",
  },
  {
    id: 2,
    category: "Growth Area",
    title: "Physics Lab Preparation",
    description:
      "Strengthen your practical knowledge before the upcoming lab sessions",
    action: "Complete Virtual Lab Simulation",
    subject: "Physics",
    confidence: 88,
    timeEstimate: "60 mins",
    impact: "medium",
    status: "new",
  },
  {
    id: 3,
    category: "Skill Building",
    title: "Chemistry Nomenclature Review",
    description: "Reinforce your understanding of chemical naming conventions",
    action: "Review Interactive Flashcards",
    subject: "Chemistry",
    confidence: 85,
    timeEstimate: "30 mins",
    impact: "medium",
    status: "new",
  },
];

const performanceData = [
  { month: "Jan", completion: 85, effectiveness: 78 },
  { month: "Feb", completion: 88, effectiveness: 82 },
  { month: "Mar", completion: 92, effectiveness: 85 },
  { month: "Apr", completion: 90, effectiveness: 88 },
  { month: "May", completion: 95, effectiveness: 92 },
];

const subjectProgress = [
  { subject: "Mathematics", completed: 28, total: 35 },
  { subject: "Physics", completed: 22, total: 30 },
  { subject: "Chemistry", completed: 18, total: 25 },
  { subject: "Biology", completed: 15, total: 20 },
];

export default function RecommendationsDetailed() {
  const RecommendationCard = ({ recommendation }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge
            className={`
              ${
                recommendation.impact === "high"
                  ? "bg-red-100 text-red-800"
                  : recommendation.impact === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }
            `}
          >
            {recommendation.category}
          </Badge>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {recommendation.timeEstimate}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{recommendation.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {recommendation.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">
              AI Confidence: {recommendation.confidence}%
            </span>
          </div>
          <Badge variant="outline">{recommendation.subject}</Badge>
        </div>

        <Button className="w-full">
          {recommendation.action}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 w-full">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                AI-Powered Learning Compass
              </h2>
              <p className="text-sm text-blue-600">
                Leveraging quantum-inspired neural networks for personalized
                learning acceleration
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Our advanced AI system analyzes over 1,000 data points across your
            learning journey, utilizing deep learning algorithms to craft
            recommendations with up to 94% prediction accuracy.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Priority Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendationsData.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartIcon className="h-5 w-5 text-blue-500" />
                Recommendation Impact Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completion"
                      stroke="#3b82f6"
                      name="Completion Rate"
                    />
                    <Line
                      type="monotone"
                      dataKey="effectiveness"
                      stroke="#8b5cf6"
                      name="Effectiveness"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Subject Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                    <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-purple-500" />
              <div>
                <div className="font-semibold">94% Accuracy</div>
                <div className="text-sm text-gray-600">
                  In learning predictions
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-500" />
              <div>
                <div className="font-semibold">Real-time Analysis</div>
                <div className="text-sm text-gray-600">
                  Continuous adaptation
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-purple-500" />
              <div>
                <div className="font-semibold">Personalized Path</div>
                <div className="text-sm text-gray-600">
                  Tailored to your goals
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
