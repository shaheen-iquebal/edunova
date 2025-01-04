import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Book,
  Sparkles,
  Clock,
  Download,
  Copy,
  Trash2,
  Share2,
  FileText,
  Users,
  BookOpen,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { marked } from "marked";
import { Toaster } from "@/components/ui/toaster";

const defaultNotes = [
  {
    id: 1,
    subject: "Physics",
    chapter: "Mechanics",
    class: "11A",
    content: `<h2>Introduction to Mechanics</h2>
    <p>Mechanics is the branch of physics dealing with the behavior of physical bodies when subjected to forces or displacements. Key areas include:</p>
    <ul>
      <li>Kinematics - study of motion</li>
      <li>Dynamics - study of forces and their effects</li>
      <li>Statics - study of forces on non-moving objects</li>
    </ul>
    <p>Important concepts include Newton's Laws of Motion, conservation of energy, and momentum.</p>`,
    date: "2024-12-26",
    type: "ai-generated",
    noteType: "lesson_plan",
    sharedWith: ["11A", "11B"],
    teacherNotes: "Focus on practical examples for Newton's laws",
  },
  // ... [previous default notes with added fields]
];

const TeacherNotesContent = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState(defaultNotes);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [noteType, setNoteType] = useState("lesson_plan");
  const [teacherNotes, setTeacherNotes] = useState("");

  const classes = ["11A", "11B", "12A", "12B"];
  const subjects = ["Physics", "Chemistry", "Biology", "Mathematics"];
  const chapters = {
    Physics: ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism"],
    Chemistry: ["Chemical Bonding", "Organic Chemistry", "Acids and Bases"],
    Biology: ["Cell Biology", "Genetics", "Evolution", "Human Physiology"],
    Mathematics: ["Algebra", "Calculus", "Trigonometry", "Statistics"],
  };

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    setSelectedChapter("");
  };

  const generateNote = async () => {
    if (!selectedClass || !selectedSubject || !selectedChapter) {
      toast({
        title: "Error",
        description: "Please select class, subject and chapter",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const prompts = {
        lesson_plan: `Create a detailed lesson plan for teaching ${selectedSubject} ${selectedChapter} to class ${selectedClass}. Include learning objectives, key concepts, teaching strategies, and assessment methods.`,
        study_material: `Create comprehensive study material for ${selectedSubject} ${selectedChapter} suitable for class ${selectedClass}. Include definitions, explanations, examples, and practice problems.`,
        exam_prep: `Create exam preparation notes for ${selectedSubject} ${selectedChapter} for class ${selectedClass}. Include important topics, common questions, solving strategies, and key points to remember.`,
        practical_guide: `Create a practical/lab guide for ${selectedSubject} ${selectedChapter} experiments and activities for class ${selectedClass}. Include setup instructions, safety measures, and expected outcomes.`,
      };

      const requestBody = {
        model: "gemini-1.5-flash-latest",
        contents: [
          {
            parts: [{ text: prompts[noteType] }],
          },
        ],
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZDK4iaYCc7f9QWycchOqKGf_BTEDWSyo`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const generatedContent =
        response.data.candidates[0].content.parts[0].text;
      const renderer = new marked.Renderer();

      const newNote = {
        id: Date.now(),
        subject: selectedSubject,
        chapter: selectedChapter,
        class: selectedClass,
        content: marked(generatedContent, { renderer }),
        date: new Date().toISOString().split("T")[0],
        type: "ai-generated",
        noteType,
        teacherNotes,
        sharedWith: [selectedClass],
      };

      setNotes((prev) => [newNote, ...prev]);
      setTeacherNotes("");
      toast({
        title: "Success!",
        description: "Note generated successfully",
      });
    } catch (error) {
      console.error("Gemini API Error:", error.response?.data || error);
      toast({
        title: "Error",
        description: "Failed to generate note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Generator Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-6 w-6" />
            Teacher's Note Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select onValueChange={setSelectedClass} value={selectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select
                onValueChange={handleSubjectChange}
                value={selectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Chapter</label>
              <Select
                onValueChange={setSelectedChapter}
                value={selectedChapter}
                disabled={!selectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSubject &&
                    chapters[selectedSubject].map((chapter) => (
                      <SelectItem key={chapter} value={chapter}>
                        {chapter}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <RadioGroup
            defaultValue="lesson_plan"
            onValueChange={setNoteType}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lesson_plan" id="lesson_plan" />
              <Label htmlFor="lesson_plan">Lesson Plan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="study_material" id="study_material" />
              <Label htmlFor="study_material">Study Material</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exam_prep" id="exam_prep" />
              <Label htmlFor="exam_prep">Exam Prep</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="practical_guide" id="practical_guide" />
              <Label htmlFor="practical_guide">Practical Guide</Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Teacher's Notes (Optional)
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows="2"
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="Add your personal notes, reminders, or modifications..."
            />
          </div>

          <Button
            className="w-full"
            onClick={generateNote}
            disabled={
              loading || !selectedClass || !selectedSubject || !selectedChapter
            }
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Generating...
              </div>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Teaching Material
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Notes Display Section */}
      <div className="space-y-4 mt-6">
        {notes.map((note) => (
          <Card
            key={note.id}
            className={`
              transform transition-all duration-200 hover:shadow-lg
              ${note.type === "ai-generated" ? "bg-blue-50" : "bg-white"}
            `}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">
                    {note.subject} - {note.chapter}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{note.class}</Badge>
                    <Badge variant="secondary" className="capitalize">
                      {note.noteType.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(note.content);
                      toast({ description: "Copied to clipboard!" });
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 text-rose-400" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {note.date}
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Shared with: {note.sharedWith.join(", ")}
                </span>
              </div>
              {note.teacherNotes && (
                <div className="mt-2 p-2 bg-yellow-50 rounded-md text-sm">
                  <div className="font-medium">Teacher's Notes:</div>
                  {note.teacherNotes}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div
                className="text-gray-600 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TeacherNotes = () => {
  return (
    <>
      <TeacherNotesContent />
      <Toaster />
    </>
  );
};

export default TeacherNotes;
