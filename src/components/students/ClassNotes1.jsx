import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, FileText, Sparkles, Clock, Download, Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

const ClassNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      subject: "Physics",
      chapter: "Chapter 1: Mechanics",
      content:
        "Newton's laws of motion describe the relationship between a body and the forces acting upon it...",
      date: "2024-12-20",
      type: "stored",
    },
    {
      id: 2,
      subject: "Chemistry",
      chapter: "Chapter 2: Chemical Bonding",
      content:
        "Chemical bonding involves the sharing or transfer of electrons between atoms...",
      date: "2024-12-22",
      type: "stored",
    },
    {
      id: 3,
      subject: "Biology",
      chapter: "Chapter 1: Cell Structure",
      content:
        "The cell is the basic structural and functional unit of all living organisms...",
      date: "2024-12-23",
      type: "ai-generated",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const subjects = ["Physics", "Chemistry", "Biology", "Mathematics"];
  const chapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

  const generateNote = async () => {
    if (!selectedSubject || !selectedChapter) {
      alert("Please select both subject and chapter");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call with random content
      const samplePrompt = `Generate detailed notes for ${selectedSubject} ${selectedChapter}`;

      // In production, replace this with actual Gemini API call
      // const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${GEMINI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     contents: [{ text: samplePrompt }]
      //   })
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate response
      const newNote = {
        id: notes.length + 1,
        subject: selectedSubject,
        chapter: selectedChapter,
        content: `Sample generated notes for ${selectedSubject} ${selectedChapter}. This would be replaced with actual AI-generated content from Gemini API.`,
        date: new Date().toISOString().split("T")[0],
        type: "ai-generated",
      };

      setNotes((prev) => [newNote, ...prev]);
    } catch (error) {
      console.error("Error generating note:", error);
      alert("Failed to generate note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-6 w-6" />
            Class Notes Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stored" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stored">
                <FileText className="h-4 w-4 mr-2" />
                Stored Notes
              </TabsTrigger>
              <TabsTrigger value="generate">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stored">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {notes.map((note) => (
                    <Card
                      key={note.id}
                      className={`
                      transform transition-all duration-200 hover:shadow-lg
                      ${
                        note.type === "ai-generated" ? "bg-blue-50" : "bg-white"
                      }
                    `}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {note.subject} - {note.chapter}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(note.content)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {note.date}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="generate">
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Select onValueChange={setSelectedSubject}>
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
                      <Select onValueChange={setSelectedChapter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select chapter" />
                        </SelectTrigger>
                        <SelectContent>
                          {chapters.map((chapter) => (
                            <SelectItem key={chapter} value={chapter}>
                              {chapter}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

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

                  <Alert>
                    <AlertDescription>
                      Select a subject and chapter to generate detailed notes
                      using AI. The generated notes will be added to your stored
                      notes automatically.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassNotes;
