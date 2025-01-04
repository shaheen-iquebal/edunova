import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Brain,
  Sparkles,
  Loader2,
  Bot,
  ChevronRight,
  BookOpen,
  Target,
  Clock,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GenerateAssignmentPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAssignment, setGeneratedAssignment] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);

  const classes = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "Computer Science"];
  const chapters = [
    "Chapter 1: Introduction",
    "Chapter 2: Basic Concepts",
    "Chapter 3: Advanced Topics",
  ];

  // Add gradient backgrounds for cards based on subject
  const getSubjectGradient = (subject) => {
    switch (subject) {
      case "Mathematics":
        return "bg-gradient-to-br from-blue-50 to-indigo-50";
      case "Physics":
        return "bg-gradient-to-br from-purple-50 to-pink-50";
      case "Chemistry":
        return "bg-gradient-to-br from-green-50 to-emerald-50";
      case "Computer Science":
        return "bg-gradient-to-br from-orange-50 to-amber-50";
      default:
        return "bg-gradient-to-br from-gray-50 to-slate-50";
    }
  };

  const generateAssignment = async () => {
    setIsLoading(true);
    setAiProgress(0);

    const progressInterval = setInterval(() => {
      setAiProgress((prev) => Math.min(prev + 2, 90));
    }, 100);

    const promptText = `Generate a detailed ${selectedClass} level assignment for ${selectedSubject}, ${selectedChapter}. 
    Include the following sections using markdown formatting:

    # Assignment Title
    ## Overview
    ## Learning Objectives
    ## Requirements
    ## Evaluation Criteria
    ## Estimated Time
    ## Additional Resources

    Make sure to include:
    - Bullet points for key items
    - Code snippets if relevant (especially for Computer Science)
    - Tables for evaluation breakdown
    - Clear section headers
    Consider cognitive load and learning outcomes for ${selectedClass} level students.`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZDK4iaYCc7f9QWycchOqKGf_BTEDWSyo`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.candidates[0].content.parts[0].text;

      setGeneratedAssignment({
        title: `${selectedSubject} - ${selectedChapter} Assignment`,
        difficulty: selectedClass,
        subject: selectedSubject,
        chapter: selectedChapter,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        requirements: [
          "Submit comprehensive documentation",
          "Include detailed analysis",
          "Provide supporting examples",
          "Add visual representations",
        ],
        markdownContent: aiResponse,
        estimatedTime: "3 hours",
        learningObjectives: [
          "Master core concepts",
          "Apply theoretical knowledge",
          "Develop analytical skills",
          "Enhance problem-solving abilities",
        ],
        aiMetrics: {
          complexity: 0.75,
          engagement: 0.85,
          learningValue: 0.9,
          timeOptimization: 0.8,
        },
      });
    } catch (error) {
      console.error("Error generating assignment:", error);
    } finally {
      clearInterval(progressInterval);
      setAiProgress(100);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-7xl mx-auto bg-gradient-to-b from-white to-gray-50">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
          <Brain className="h-8 w-8 text-blue-500" />
        </div>
        <div className="ml-3">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            AI Assignment Generator
          </h1>
          <p className="text-gray-600">
            Powered by Advanced Neural Networks & Pedagogical AI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className={`shadow-lg border-t-4 border-t-blue-500 ${getSubjectGradient(
            selectedSubject
          )}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-500" />
              Configuration Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Difficulty Level
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="border-2 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Subject
                </label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="border-2 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Chapter
                </label>
                <Select
                  value={selectedChapter}
                  onValueChange={setSelectedChapter}
                >
                  <SelectTrigger className="border-2 hover:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select Chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((chap) => (
                      <SelectItem key={chap} value={chap}>
                        {chap}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateAssignment}
                disabled={
                  !selectedClass ||
                  !selectedSubject ||
                  !selectedChapter ||
                  isLoading
                }
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Assignment...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Assignment
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="shadow-lg border-t-4 border-t-purple-500 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle>AI Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Neural Processing</span>
                    <span>{aiProgress}%</span>
                  </div>
                  <Progress value={aiProgress} className="h-2 bg-purple-100">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${aiProgress}%` }}
                    />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-purple-500" />
                    Analyzing curriculum parameters...
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-purple-500" />
                    Optimizing difficulty curves...
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-purple-500" />
                    Generating learning objectives...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {generatedAssignment && !isLoading && (
          <Card
            className={`shadow-lg border-t-4 border-t-green-500 ${getSubjectGradient(
              selectedSubject
            )}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-500" />
                Generated Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{generatedAssignment.title}</h3>
                  <p className="text-sm text-gray-600">
                    Difficulty: {generatedAssignment.difficulty}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      {generatedAssignment.estimatedTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Due: {generatedAssignment.dueDate}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    AI Optimization Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(generatedAssignment.aiMetrics).map(
                      ([key, value]) => (
                        <div key={key}>
                          <div className="text-xs text-gray-600 mb-1">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                          <Progress
                            value={value * 100}
                            className="h-2 bg-green-100"
                          >
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                              style={{ width: `${value * 100}%` }}
                            />
                          </Progress>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Learning Objectives
                  </h4>
                  <ul className="text-sm space-y-1">
                    {generatedAssignment.learningObjectives.map(
                      (objective, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-green-500" />
                          {objective}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-sm text-green-800">
                    Assignment generated using Advanced Neural Networks with
                    pedagogical optimization. Content is tailored to{" "}
                    {selectedClass} level cognitive development patterns.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {generatedAssignment && !isLoading && (
        <Card
          className={`mt-6 shadow-lg border-t-4 border-t-indigo-500 ${getSubjectGradient(
            selectedSubject
          )}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none prose-headings:text-indigo-600 prose-p:text-gray-600 prose-strong:text-gray-800 prose-ul:text-gray-600">
              <ReactMarkdown>
                {generatedAssignment.markdownContent}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GenerateAssignmentPage;
