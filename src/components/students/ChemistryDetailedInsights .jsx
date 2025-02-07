import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FlaskConical,
  Atom,
  Beaker,
  BookOpen,
  Target,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Microscope,
} from "lucide-react";

const ChemistryDetailedInsights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const progressData = [
    { month: "Sep", score: 78, topic: "Atomic Structure" },
    { month: "Oct", score: 82, topic: "Chemical Bonding" },
    { month: "Nov", score: 85, topic: "Reactions & Equations" },
    { month: "Dec", score: 88, topic: "Organic Chemistry" },
    { month: "Jan", score: 92, topic: "Thermodynamics" },
    { month: "Feb", score: 94, topic: "Advanced Topics" },
  ];

  const topicMastery = [
    { topic: "Lab Skills", score: 95, status: "Excellent" },
    { topic: "Chemical Equations", score: 92, status: "Excellent" },
    { topic: "Atomic Structure", score: 88, status: "Very Good" },
    { topic: "Organic Chemistry", score: 85, status: "Very Good" },
    { topic: "Thermodynamics", score: 82, status: "Good" },
    { topic: "Quantum Chemistry", score: 78, status: "Good" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Chemistry Progress Report
          </h1>
          <p className="text-gray-600 mt-2">Advanced Chemistry Analysis</p>
        </div>
        <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
          Overall Grade: A (94%)
        </Badge>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <FlaskConical className="h-6 w-6 text-emerald-600 mr-2" />
            <CardTitle>Quick Summary</CardTitle>
          </div>
          <CardDescription>
            Here's how you're performing in Advanced Chemistry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Your Strong Points
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>Excellent laboratory techniques</li>
                  <li>Strong understanding of chemical equations</li>
                  <li>Great at molecular visualization</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Target className="h-5 w-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Areas for Improvement
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>Quantum mechanics concepts</li>
                  <li>Advanced thermodynamics</li>
                  <li>Complex reaction mechanisms</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Over Time */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
            <CardTitle>Your Progress Over Time</CardTitle>
          </div>
          <CardDescription>
            Monthly improvement in chemistry understanding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 shadow-lg rounded-lg border">
                          <p className="font-bold">{label}</p>
                          <p>Score: {payload[0].value}%</p>
                          <p>Focus: {payload[0].payload.topic}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Topic Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Atom className="h-6 w-6 text-emerald-600 mr-2" />
            <CardTitle>Topic Performance</CardTitle>
          </div>
          <CardDescription>
            Your understanding across different chemistry topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={topicMastery}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 shadow-lg rounded-lg border">
                          <p className="font-bold">{label}</p>
                          <p>Score: {payload[0].value}%</p>
                          <p>Status: {payload[0].payload.status}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recommendations with Actionable Items */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardHeader>
          <div className="flex items-center">
            <Microscope className="h-6 w-6 text-emerald-600 mr-2" />
            <CardTitle>AI-Powered Learning Plan</CardTitle>
          </div>
          <CardDescription>
            Personalized recommendations based on your performance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-emerald-700 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" /> Immediate Action Items
              </h4>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p>Complete the Quantum Mechanics practice set by Friday</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p>
                    Review your last three lab reports for common error patterns
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p>
                    Schedule a consultation with Prof. Smith about
                    thermodynamics
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-teal-700 flex items-center">
                <Beaker className="h-4 w-4 mr-2" /> Laboratory Focus Areas
              </h4>
              <div className="mt-2 space-y-3">
                <div className="border-l-4 border-teal-500 pl-3">
                  <h5 className="font-medium">Next Lab Preparation</h5>
                  <p className="text-sm text-gray-600">
                    Review titration techniques and pH calculations for the
                    upcoming acid-base experiment
                  </p>
                </div>
                <div className="border-l-4 border-teal-500 pl-3">
                  <h5 className="font-medium">Safety Review</h5>
                  <p className="text-sm text-gray-600">
                    Complete the advanced safety protocols quiz before next
                    week's organic synthesis lab
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-cyan-700 flex items-center">
                <Target className="h-4 w-4 mr-2" /> Weekly Study Plan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Priority Topics</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Electron configuration patterns</li>
                    <li>• Gibbs free energy calculations</li>
                    <li>• Reaction mechanism prediction</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Recommended Resources</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Virtual Lab Simulation: "Advanced Titration"</li>
                    <li>• Chapter 7: "Quantum Mechanics Foundations"</li>
                    <li>• Practice Set: "Thermodynamics Challenge"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-emerald-700 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" /> Upcoming Milestones
              </h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Advanced Organic Chemistry Quiz</span>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    Next Week
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Laboratory Safety Certification</span>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    2 Weeks
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Research Project Presentation</span>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    3 Weeks
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChemistryDetailedInsights;
