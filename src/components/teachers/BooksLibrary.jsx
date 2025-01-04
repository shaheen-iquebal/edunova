import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book, Download, ExternalLink, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const BooksLibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  // Sample data structure for classes, subjects, and chapters
  const classOptions = [
    { id: "10A", label: "Class 10-A" },
    { id: "10B", label: "Class 10-B" },
    { id: "11A", label: "Class 11-A" },
    { id: "11B", label: "Class 11-B" },
  ];

  const subjectOptions = {
    "10A": [
      { id: "math", label: "Mathematics" },
      { id: "physics", label: "Physics" },
      { id: "chemistry", label: "Chemistry" },
    ],
    "10B": [
      { id: "math", label: "Mathematics" },
      { id: "physics", label: "Physics" },
      { id: "biology", label: "Biology" },
    ],
    // Add more class-subject mappings
  };

  const chapterOptions = {
    math: [
      { id: "algebra", label: "Algebra" },
      { id: "geometry", label: "Geometry" },
      { id: "calculus", label: "Calculus" },
    ],
    physics: [
      { id: "mechanics", label: "Mechanics" },
      { id: "thermodynamics", label: "Thermodynamics" },
      { id: "optics", label: "Optics" },
    ],
    // Add more subject-chapter mappings
  };

  // Sample books data with additional metadata
  useEffect(() => {
    const sampleBooks = [
      {
        id: 1,
        title: "Advanced Mathematics - Class 10",
        author: "R.D. Sharma",
        cover_id: "2584865",
        description:
          "Comprehensive mathematics textbook covering algebra, geometry, trigonometry, and statistics for 10th grade students.",
        type: "textbook",
        subject: "mathematics",
        class: "10",
        chapters: ["algebra", "geometry", "trigonometry", "statistics"],
        teacherResources: [
          "Chapter Tests",
          "Practice Problems",
          "Answer Key",
          "Video Tutorials",
        ],
        difficulty: "advanced",
      },
      {
        id: 2,
        title: "Practical Physics - Grade 11",
        author: "H.C. Verma",
        cover_id: "823021",
        description:
          "Advanced physics concepts with practical experiments and problem-solving approaches for 11th grade.",
        type: "textbook",
        subject: "physics",
        class: "11",
        chapters: ["mechanics", "thermodynamics", "waves", "optics"],
        teacherResources: [
          "Lab Manuals",
          "Experiment Guides",
          "Assessment Tools",
          "Interactive Simulations",
        ],
        difficulty: "intermediate",
      },
      {
        id: 3,
        title: "Organic Chemistry Fundamentals",
        author: "Morrison & Boyd",
        cover_id: "553083",
        description:
          "Detailed coverage of organic chemistry concepts with molecular structures and reaction mechanisms.",
        type: "textbook",
        subject: "chemistry",
        class: "12",
        chapters: ["hydrocarbons", "alcohols", "aldehydes", "acids"],
        teacherResources: [
          "Molecular Models",
          "Reaction Charts",
          "Practice Sets",
          "Lab Safety Guidelines",
        ],
        difficulty: "advanced",
      },
      {
        id: 4,
        title: "Modern World History - Class 9",
        author: "Sarah Johnson",
        cover_id: "0010810775",
        description:
          "Comprehensive coverage of world history from the Industrial Revolution to modern times.",
        type: "textbook",
        subject: "history",
        class: "9",
        chapters: [
          "industrial_revolution",
          "world_wars",
          "cold_war",
          "modern_era",
        ],
        teacherResources: [
          "Timeline Charts",
          "Map Activities",
          "Primary Sources",
          "Discussion Guides",
        ],
        difficulty: "intermediate",
      },
      {
        id: 5,
        title: "Biology: Life Sciences",
        author: "Campbell & Reece",
        cover_id: "0014647688",
        description:
          "Detailed exploration of biological concepts with focus on cellular processes and human anatomy.",
        type: "textbook",
        subject: "biology",
        class: "11",
        chapters: ["cell_biology", "genetics", "human_anatomy", "ecology"],
        teacherResources: [
          "Microscope Activities",
          "Dissection Guides",
          "Field Study Plans",
          "Assessment Tools",
        ],
        difficulty: "advanced",
      },
      {
        id: 6,
        title: "English Literature Classics",
        author: "Elizabeth Wright",
        cover_id: "252569",
        description:
          "Collection of classic literature pieces with analysis and interpretation guides.",
        type: "textbook",
        subject: "english",
        class: "10",
        chapters: ["prose", "poetry", "drama", "literary_analysis"],
        teacherResources: [
          "Reading Guides",
          "Writing Prompts",
          "Discussion Questions",
          "Assessment Rubrics",
        ],
        difficulty: "intermediate",
      },
      {
        id: 7,
        title: "Fundamental Geography",
        author: "Michael Peters",
        cover_id: "6604008",
        description:
          "Comprehensive study of physical and human geography with modern mapping techniques.",
        type: "textbook",
        subject: "geography",
        class: "9",
        chapters: [
          "physical_geography",
          "human_geography",
          "cartography",
          "climate",
        ],
        teacherResources: [
          "Map Exercises",
          "Field Activities",
          "Data Analysis Tools",
          "Project Ideas",
        ],
        difficulty: "basic",
      },
      {
        id: 8,
        title: "Computer Science Principles",
        author: "David Anderson",
        cover_id: "0011608623",
        description:
          "Introduction to programming concepts, algorithms, and data structures.",
        type: "textbook",
        subject: "computer_science",
        class: "11",
        chapters: [
          "programming_basics",
          "algorithms",
          "data_structures",
          "web_development",
        ],
        teacherResources: [
          "Code Examples",
          "Project Templates",
          "Assessment Tests",
          "Lab Exercises",
        ],
        difficulty: "intermediate",
      },
      {
        id: 9,
        title: "Economics Fundamentals",
        author: "Robert Martinez",
        cover_id: "0013667698",
        description:
          "Basic principles of micro and macroeconomics with real-world applications.",
        type: "textbook",
        subject: "economics",
        class: "12",
        chapters: [
          "microeconomics",
          "macroeconomics",
          "international_trade",
          "financial_markets",
        ],
        teacherResources: [
          "Case Studies",
          "Data Analysis Tools",
          "Project Guidelines",
          "Practice Sets",
        ],
        difficulty: "advanced",
      },
      {
        id: 10,
        title: "Applied Mathematics - Class 9",
        author: "James Wilson",
        cover_id: "0014547614",
        description:
          "Practical approach to mathematics with real-world problem solving.",
        type: "textbook",
        subject: "mathematics",
        class: "9",
        chapters: ["basic_algebra", "geometry", "statistics", "mensuration"],
        teacherResources: [
          "Worksheet Generator",
          "Solution Manual",
          "Activity Cards",
          "Assessment Bank",
        ],
        difficulty: "basic",
      },
      {
        id: 11,
        title: "Environmental Science Today",
        author: "Lisa Chen",
        cover_id: "22345678",
        description:
          "Contemporary environmental issues and sustainability concepts for high school students.",
        type: "textbook",
        subject: "environmental_science",
        class: "10",
        chapters: ["ecosystems", "pollution", "conservation", "climate_change"],
        teacherResources: [
          "Field Study Guides",
          "Project Ideas",
          "Data Collection Tools",
          "Experiment Guides",
        ],
        difficulty: "intermediate",
      },
      {
        id: 12,
        title: "Advanced Chemistry - Class 12",
        author: "Thomas Brown",
        cover_id: "23456789",
        description:
          "Advanced chemistry concepts with focus on physical and inorganic chemistry.",
        type: "textbook",
        subject: "chemistry",
        class: "12",
        chapters: [
          "chemical_bonding",
          "electrochemistry",
          "coordination_compounds",
          "thermodynamics",
        ],
        teacherResources: [
          "Lab Manuals",
          "Safety Guidelines",
          "Assessment Tools",
          "Virtual Lab Access",
        ],
        difficulty: "advanced",
      },
      {
        id: 13,
        title: "Hindi Vyakaran",
        author: "Rajesh Kumar",
        cover_id: "24567890",
        description:
          "Comprehensive Hindi grammar and literature for high school students.",
        type: "textbook",
        subject: "hindi",
        class: "10",
        chapters: ["grammar", "literature", "composition", "poetry"],
        teacherResources: [
          "Writing Prompts",
          "Grammar Exercises",
          "Assessment Tools",
          "Audio Materials",
        ],
        difficulty: "intermediate",
      },
      {
        id: 14,
        title: "Physical Education and Health",
        author: "Mark Thompson",
        cover_id: "25678901",
        description:
          "Comprehensive guide to physical education, health, and sports science.",
        type: "textbook",
        subject: "physical_education",
        class: "9",
        chapters: ["fitness", "sports_science", "nutrition", "first_aid"],
        teacherResources: [
          "Activity Plans",
          "Assessment Rubrics",
          "Safety Guidelines",
          "Training Programs",
        ],
        difficulty: "basic",
      },
      {
        id: 15,
        title: "Art and Design Fundamentals",
        author: "Emma Collins",
        cover_id: "26789012",
        description:
          "Introduction to art history, techniques, and design principles.",
        type: "textbook",
        subject: "art",
        class: "11",
        chapters: [
          "art_history",
          "drawing",
          "color_theory",
          "design_principles",
        ],
        teacherResources: [
          "Project Ideas",
          "Assessment Rubrics",
          "Tutorial Videos",
          "Material Lists",
        ],
        difficulty: "intermediate",
      },
      {
        id: 16,
        title: "Business Studies",
        author: "Peter Morgan",
        cover_id: "27890123",
        description:
          "Comprehensive coverage of business concepts and management principles.",
        type: "textbook",
        subject: "business_studies",
        class: "12",
        chapters: ["management", "marketing", "finance", "entrepreneurship"],
        teacherResources: [
          "Case Studies",
          "Project Guidelines",
          "Assessment Tools",
          "Presentation Templates",
        ],
        difficulty: "advanced",
      },
      {
        id: 17,
        title: "Modern Political Science",
        author: "Amanda Garcia",
        cover_id: "28901234",
        description:
          "Introduction to political theory, governance, and civic responsibilities.",
        type: "textbook",
        subject: "political_science",
        class: "11",
        chapters: [
          "political_theory",
          "indian_constitution",
          "governance",
          "international_relations",
        ],
        teacherResources: [
          "Discussion Guides",
          "Case Studies",
          "Project Ideas",
          "Assessment Tools",
        ],
        difficulty: "intermediate",
      },
      {
        id: 18,
        title: "Sanskrit Bharati",
        author: "Anil Sharma",
        cover_id: "29012345",
        description:
          "Comprehensive Sanskrit language learning with grammar and literature.",
        type: "textbook",
        subject: "sanskrit",
        class: "10",
        chapters: ["grammar", "literature", "composition", "translation"],
        teacherResources: [
          "Practice Exercises",
          "Audio Materials",
          "Assessment Tools",
          "Learning Games",
        ],
        difficulty: "intermediate",
      },
      {
        id: 19,
        title: "Advanced Physics Problems",
        author: "Richard Feynman",
        cover_id: "30123456",
        description:
          "Collection of advanced physics problems and solutions for competitive preparation.",
        type: "textbook",
        subject: "physics",
        class: "12",
        chapters: [
          "mechanics_advanced",
          "electromagnetism",
          "modern_physics",
          "quantum_mechanics",
        ],
        teacherResources: [
          "Solution Manual",
          "Problem Sets",
          "Assessment Banks",
          "Video Solutions",
        ],
        difficulty: "advanced",
      },
      {
        id: 20,
        title: "Practical Life Skills",
        author: "Susan White",
        cover_id: "31234567",
        description:
          "Essential life skills including financial literacy, communication, and problem-solving.",
        type: "textbook",
        subject: "life_skills",
        class: "9",
        chapters: [
          "financial_literacy",
          "communication",
          "problem_solving",
          "digital_citizenship",
        ],
        teacherResources: [
          "Activity Plans",
          "Workshop Guides",
          "Assessment Tools",
          "Project Ideas",
        ],
        difficulty: "basic",
      },
    ];

    setBooks(sampleBooks);
    setLoading(false);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = !selectedClass || book.class === selectedClass;
    const matchesSubject = !selectedSubject || book.subject === selectedSubject;
    const matchesChapter =
      !selectedChapter || book.chapters.includes(selectedChapter);

    return matchesSearch && matchesClass && matchesSubject && matchesChapter;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Book className="h-8 w-8" />
          Teacher's Library
        </h1>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger>
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSubject}
          onValueChange={setSelectedSubject}
          disabled={!selectedClass}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {selectedClass &&
              subjectOptions[selectedClass]?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedChapter}
          onValueChange={setSelectedChapter}
          disabled={!selectedSubject}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Chapter" />
          </SelectTrigger>
          <SelectContent>
            {selectedSubject &&
              chapterOptions[selectedSubject]?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading books...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                  <Badge variant="secondary">{book.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="aspect-[2/3] relative mb-4">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>
                {book.teacherResources && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">
                      Teacher Resources:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {book.teacherResources.map((resource) => (
                        <Badge key={resource} variant="outline">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Resources
                </Button>
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksLibrary;
