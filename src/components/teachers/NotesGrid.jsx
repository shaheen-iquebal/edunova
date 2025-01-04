import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaTrash } from "react-icons/fa"; // Import the trash can icon
import { BsFillJournalBookmarkFill } from "react-icons/bs";

// Sample notes data
const notesData = [
  {
    id: 1,
    title: "Algebra Question",
    content:
      "To solve a quadratic equation, use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. Let me know if you'd like an example!",
    timestamp: "2024-12-26T10:00:00",
  },
  {
    id: 2,
    title: "Biology: Photosynthesis",
    content:
      "Photosynthesis occurs in the chloroplasts of plant cells, converting light energy into chemical energy. The formula is: 6CO2 + 6H2O -> C6H12O6 + 6O2.",
    timestamp: "2024-12-26T10:30:00",
  },
  {
    id: 3,
    title: "History: World War II",
    content:
      "World War II lasted from 1939 to 1945, involving major powers. A turning point was the Allied victory at the Battle of Stalingrad.",
    timestamp: "2024-12-26T11:00:00",
  },
  {
    id: 4,
    title: "Physics: Newton's Laws",
    content:
      "Newton's first law states that an object will remain at rest or in uniform motion unless acted upon by an external force.",
    timestamp: "2024-12-26T11:30:00",
  },
  {
    id: 5,
    title: "English: Literary Devices",
    content:
      "A metaphor is a figure of speech that directly compares two unrelated things. Example: 'Time is a thief.'",
    timestamp: "2024-12-26T12:00:00",
  },
  {
    id: 6,
    title: "Programming: Python Loops",
    content:
      "Python supports for and while loops. Example: `for i in range(5): print(i)` prints numbers 0 to 4.",
    timestamp: "2024-12-26T12:30:00",
  },
  {
    id: 7,
    title: "Chemistry: Periodic Table",
    content:
      "The periodic table organizes elements by increasing atomic number. Groups indicate similar chemical properties.",
    timestamp: "2024-12-26T13:00:00",
  },
  {
    id: 8,
    title: "Geography: Climate Zones",
    content:
      "The Earth has three main climate zones: tropical, temperate, and polar. These are determined by latitude and weather patterns.",
    timestamp: "2024-12-26T13:30:00",
  },
  {
    id: 9,
    title: "Math: Calculus Derivatives",
    content:
      "The derivative represents the rate of change of a function. Example: The derivative of f(x) = x² is f'(x) = 2x.",
    timestamp: "2024-12-26T14:00:00",
  },
  {
    id: 10,
    title: "Economics: Supply and Demand",
    content:
      "Supply and demand are fundamental economic concepts. Prices rise when demand exceeds supply and fall when supply exceeds demand.",
    timestamp: "2024-12-26T14:30:00",
  },
  {
    id: 11,
    title: "Art: Color Theory",
    content:
      "Complementary colors are opposite each other on the color wheel and create contrast. Example: red and green.",
    timestamp: "2024-12-26T15:00:00",
  },
  {
    id: 12,
    title: "Philosophy: Socratic Method",
    content:
      "The Socratic method involves asking and answering questions to stimulate critical thinking and illuminate ideas.",
    timestamp: "2024-12-26T15:30:00",
  },
  {
    id: 13,
    title: "Computer Science: Data Structures",
    content:
      "Common data structures include arrays, linked lists, stacks, queues, and hash maps. They organize data for efficient access and modification.",
    timestamp: "2024-12-26T16:00:00",
  },
  {
    id: 14,
    title: "Programming Tip",
    content:
      "In JavaScript, use 'map()' to iterate over an array and transform its elements. It's a clean alternative to traditional loops.",
    timestamp: "2024-12-26T19:00:00",
  },
  {
    id: 15,
    title: "Art History Insight",
    content:
      "The Impressionist movement, led by artists like Claude Monet, focused on capturing light and movement in paintings. Would you like examples of famous works?",
    timestamp: "2024-12-26T20:00:00",
  },
  {
    id: 16,
    title: "Psychology Concept",
    content:
      "Maslow's hierarchy of needs outlines five levels of human motivation, starting with basic physiological needs. Would you like an explanation of each level?",
    timestamp: "2024-12-26T21:00:00",
  },
  {
    id: 17,
    title: "Math Problem",
    content:
      "To calculate the area of a circle, use the formula A = πr², where 'r' is the radius. Want me to walk through an example calculation?",
    timestamp: "2024-12-26T22:00:00",
  },
];

const NotesGrid = () => {
  // Predefined list of Tailwind background colors that will be preserved
  const bgColors = [
    "bg-red-50",
    "bg-pink-50",
    "bg-purple-50",
    "bg-indigo-50",
    "bg-blue-50",
    "bg-cyan-50",
    "bg-teal-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-orange-50",
  ];

  // Generate consistent random color based on note id
  const getRandomColor = (id) => {
    return bgColors[id % bgColors.length];
  };

  // Sort notes by timestamp, most recent first
  const sortedNotes = useMemo(
    () =>
      [...notesData].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      ),
    []
  );

  // Function to format the date
  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Generate random offset for masonry-like layout
  const getRandomOffset = (id) => {
    const random = Math.abs(Math.sin(id * 1000));
    return `${Math.floor(random * 16)}px`;
  };

  const handleDelete = (id) => {
    console.log(`Delete note with ID: ${id}`);
    // Implement actual delete logic here
  };

  return (
    <div className="p-6 bg-gdray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          <BsFillJournalBookmarkFill className="inline mr-2 mb-2" />
          Bookmarked Responses
        </h1>
        {/* This div ensures Tailwind preserves all our color classes */}
        <div className="hidden">
          <div className="bg-red-50 bg-pink-50 bg-purple-50 bg-indigo-50 bg-blue-50 bg-cyan-50 bg-teal-50 bg-green-50 bg-yellow-50 bg-orange-50"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className="break-inside-avoid"
              style={{ marginTop: getRandomOffset(note.id) }}
            >
              <Card
                className={`${getRandomColor(
                  note.id
                )} hover:shadow-lg transition-shadow-lg duration-200`}
              >
                {note.title && (
                  <CardHeader className="pb-2">
                    <h3 className="font-semibold">{note.title}</h3>
                  </CardHeader>
                )}
                <CardContent>
                  <div className="whitespace-pre-line text-sm">
                    {note.content}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(note.timestamp)}</span>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-200 hover:text-red-700 transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesGrid;
