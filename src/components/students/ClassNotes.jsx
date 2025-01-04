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
import { Book, Sparkles, Clock, Download, Copy, Trash2 } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { marked } from "marked";
import { Toaster } from "@/components/ui/toaster";

const defaultNotes = [
  {
    id: 1,
    subject: "Physics",
    chapter: "Mechanics",
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
    noteType: "overview",
  },
  {
    id: 2,
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    content: `<h2>Chemical Bonding Fundamentals</h2>
    <p>Chemical bonding is the joining of atoms to form molecules and compounds. The main types are:</p>
    <ul>
      <li>Ionic bonding - transfer of electrons between metals and non-metals</li>
      <li>Covalent bonding - sharing of electrons between non-metals</li>
      <li>Metallic bonding - delocalized electrons in metals</li>
    </ul>
    <p>Understanding bonding helps predict molecular structure and chemical properties.</p>`,
    date: "2024-12-25",
    type: "ai-generated",
    noteType: "important",
  },
  {
    id: 3,
    subject: "Biology",
    chapter: "Cell Biology",
    content: `<h2>Cell Biology Basics</h2>
    <p>The cell is the fundamental unit of life. Key components include:</p>
    <ul>
      <li>Nucleus - contains genetic material</li>
      <li>Mitochondria - powerhouse of the cell</li>
      <li>Endoplasmic reticulum - protein synthesis and transport</li>
      <li>Cell membrane - selective barrier</li>
    </ul>
    <p>Cells can be prokaryotic (bacteria) or eukaryotic (plants, animals).</p>`,
    date: "2024-12-24",
    type: "ai-generated",
    noteType: "overview",
  },
];

const ClassNotesContent = () => {
  const { toast } = useToast();
  // ... [rest of the component code remains exactly the same]

  const [notes, setNotes] = useState(defaultNotes);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [noteType, setNoteType] = useState("overview");

  const subjects = ["Physics", "Chemistry", "Biology", "Mathematics"];
  const chapters = {
    Physics: ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism"],
    Chemistry: ["Chemical Bonding", "Organic Chemistry", "Acids and Bases"],
    Biology: ["Cell Biology", "Genetics", "Evolution", "Human Physiology"],
    Mathematics: ["Algebra", "Calculus", "Trigonometry", "Statistics"],
  };

  // Reset chapter selection when subject changes
  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    setSelectedChapter(""); // Reset chapter when subject changes
  };

  const generateNote = async () => {
    if (!selectedSubject || !selectedChapter) {
      toast({
        title: "Error",
        description: "Please select both subject and chapter",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const prompts = {
        overview: `Create a concise overview of ${selectedSubject} ${selectedChapter}`,
        detailed: `Create a detailed comprehensive note on ${selectedSubject} ${selectedChapter}`,
        important: `List and explain the important topics and key points of ${selectedSubject} ${selectedChapter}`,
        audio: `Create a conversational script explaining ${selectedSubject} ${selectedChapter}`,
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
        content: marked(generatedContent, { renderer }),
        date: new Date().toISOString().split("T")[0],
        type: "ai-generated",
        noteType,
      };

      setNotes((prev) => [newNote, ...prev]);
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
            Generate New Note
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            defaultValue="overview"
            onValueChange={setNoteType}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="overview" id="overview" />
              <Label htmlFor="overview">Overview</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="detailed" id="detailed" />
              <Label htmlFor="detailed">Detailed Note</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="important" id="important" />
              <Label htmlFor="important">Important Topics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="audio" id="audio" />
              <Label htmlFor="audio">Audio Note</Label>
            </div>
          </RadioGroup>

          <Button
            className="w-full"
            onClick={generateNote}
            disabled={loading || !selectedSubject || !selectedChapter}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Generating...
              </div>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Notes
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
                  <span className="text-sm text-gray-500 capitalize">
                    {note.noteType} Note
                  </span>
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
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 text-rose-400" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {note.date}
              </div>
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

const ClassNotes = () => {
  return (
    <>
      <ClassNotesContent />
      <Toaster />
    </>
  );
};

export default ClassNotes;
