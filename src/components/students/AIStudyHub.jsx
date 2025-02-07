import { useState, useRef, useEffect } from "react";
import {
  Mic,
  PenTool,
  Image as ImageIcon,
  Brain,
  FileText,
  MessageSquare,
  Wand2,
  StopCircle,
  Save,
  RotateCcw,
  Layout,
  Clock,
  Check,
  X,
  CreditCard,
  SpellCheck,
  MapPin,
  Headphones,
  Quote,
  Search,
  Globe,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AIStudyHub = () => {
  const [activeTab, setActiveTab] = useState("voice");
  const [isRecording, setIsRecording] = useState(false);
  const [showRecordingDialog, setShowRecordingDialog] = useState(false);
  const [showScribbleDialog, setShowScribbleDialog] = useState(false);
  const [showVisualizerDialog, setShowVisualizerDialog] = useState(false);
  const [showFlashcardsDialog, setShowFlashcardsDialog] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Sample flashcards data
  const flashcards = [
    {
      question: "What is photosynthesis?",
      answer:
        "The process by which plants convert light energy into chemical energy",
    },
    {
      question: "What is Newton's First Law?",
      answer:
        "An object will remain at rest or in uniform motion unless acted upon by an external force",
    },
    { question: "What is the capital of France?", answer: "Paris" },
  ];

  const features = [
    {
      id: "voice",
      title: "Voice Notes",
      icon: <Mic className="w-6 h-6" />,
      description: "Record & auto-transcribe lectures",
      demo: 'Last recorded: "The causes of World War I included nationalism, imperialism..."',
    },
    {
      id: "scribble",
      title: "Smart Scribble",
      icon: <PenTool className="w-6 h-6" />,
      description: "Convert handwriting to text",
      demo: 'Recently converted: "Chemical equation: 2H2 + O2 → 2H2O"',
    },
    {
      id: "visualize",
      title: "Note Visualizer",
      icon: <ImageIcon className="w-6 h-6" />,
      description: "Generate diagrams from text",
      demo: "Generated: Cell Structure Diagram",
    },
    {
      id: "summarize",
      title: "AI Summarizer",
      icon: <Brain className="w-6 h-6" />,
      description: "Get key points from your notes",
      demo: "3 key points extracted from Physics notes",
    },
    {
      id: "flashcards",
      title: "Auto Flashcards",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Generate study cards from notes",
      demo: "15 cards created for Biology Chapter 5",
    },
    {
      id: "companion",
      title: "Study Companion",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Ask questions about your notes",
      demo: 'Q: "Explain photosynthesis from my notes"',
    },
    {
      id: "grammar",
      title: "AI Grammar Checker",
      icon: <SpellCheck className="w-6 h-6" />,
      description:
        "Improve writing by checking grammar, punctuation, and style.",
      demo: "Suggested correction: 'The quick brown fox jumps over the lazy dog.' → 'The quick brown fox jumped over the lazy dog.'",
    },
    {
      id: "mindmap",
      title: "Mind Map Generator",
      icon: <MapPin className="w-6 h-6" />,
      description:
        "Create mind maps from your notes for better visualization and understanding.",
      demo: "Generated: Mind map for 'The Scientific Method'",
    },
    {
      id: "audio-to-text",
      title: "Audio-to-Text Translator",
      icon: <Headphones className="w-6 h-6" />,
      description: "Convert any audio into written text for easier study.",
      demo: 'Transcribed: "The Industrial Revolution led to urbanization..."',
    },
    {
      id: "citation",
      title: "Smart Citation Generator",
      icon: <Quote className="w-6 h-6" />,
      description:
        "Generate citations for your notes in multiple formats (APA, MLA, etc.).",
      demo: "Citation generated for 'The Great Gatsby': APA - Fitzgerald, F. (1925). The Great Gatsby.",
    },
    {
      id: "concept-finder",
      title: "Concept Finder",
      icon: <Search className="w-6 h-6" />,
      description: "Find and highlight key concepts within your notes.",
      demo: "Highlighted concepts: 'Atom, Molecule, Chemical Bond' in Chemistry notes.",
    },
    {
      id: "language-helper",
      title: "Language Helper",
      icon: <Globe className="w-6 h-6" />,
      description:
        "Translate notes or learn new vocabulary in different languages.",
      demo: 'Translated: "Hello" → "Hola" (Spanish)',
    },
  ];

  useEffect(() => {
    if (showScribbleDialog && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Get the display size of the canvas
      const rect = canvas.getBoundingClientRect();

      // Set the canvas internal dimensions to match display size
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Set up drawing style
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, [showScribbleDialog]);

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    const pos = getCanvasCoordinates(e);
    setIsDrawing(true);
    setLastPosition(pos);

    // Start the path immediately
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const currentPos = getCanvasCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    setLastPosition(currentPos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Animated waveform component for voice recording
  const Waveform = () => (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-blue-500 rounded-full transform transition-all duration-150 ${
            isRecording ? "animate-pulse" : ""
          }`}
          style={{
            height: `${Math.random() * 64 + 16}px`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );

  const handleFeatureClick = (featureId) => {
    setActiveTab(featureId);
    switch (featureId) {
      case "voice":
        setShowRecordingDialog(true);
        break;
      case "scribble":
        setShowScribbleDialog(true);
        break;
      case "visualize":
        setShowVisualizerDialog(true);
        break;
      case "flashcards":
        setShowFlashcardsDialog(true);
        break;
      default:
        break;
    }
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowRecordingDialog(false);
  };

  return (
    <div className="w-full madx-w-6xl p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Wand2 className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">AI Study Tools</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={() => handleFeatureClick(feature.id)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-blue-600">{feature.icon}</div>
              <h2 className="font-semibold text-gray-800">
                {feature.title}
                {["Voice Notes", "Smart Scribble", "Auto Flashcards"].includes(
                  feature.title
                ) ? null : (
                  <span className="text-orange-600">
                    &nbsp;(Under Development)
                  </span>
                )}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
            <p className="text-xs text-gray-500 italic">{feature.demo}</p>
          </div>
        ))}
      </div>

      {/* Voice Recording Dialog */}
      <Dialog open={showRecordingDialog} onOpenChange={setShowRecordingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Recording</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="p-4 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <Mic className="w-8 h-8 text-blue-600" />
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Mic className="w-8 h-8 text-red-600 animate-pulse" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-ping" />
                </div>
                <Waveform />
                <button
                  onClick={stopRecording}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                >
                  <StopCircle className="w-6 h-6 text-red-600" />
                </button>
              </div>
            )}
            <p className="mt-4 text-sm text-gray-600">
              {isRecording
                ? "Recording in progress..."
                : "Click the microphone to start recording"}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scribble Dialog */}
      <Dialog open={showScribbleDialog} onOpenChange={setShowScribbleDialog}>
        <DialogContent className="sm:max-w-4xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>Smart Scribble</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div
                className="w-full"
                style={{ maxWidth: "100%", overflowX: "hidden" }}
              >
                <canvas
                  ref={canvasRef}
                  className="border rounded bg-white cursor-crosshair w-full"
                  style={{
                    height: "60vh",
                    minHeight: "500px",
                    touchAction: "none",
                  }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={clearCanvas}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" /> Clear
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save className="w-5 h-5" /> Convert to Text
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Flashcards Dialog */}
      <Dialog
        open={showFlashcardsDialog}
        onOpenChange={setShowFlashcardsDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Study Flashcards</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="min-h-64 border rounded-lg p-6 mb-4 text-center">
              <p className="text-lg mb-4">
                {showAnswer
                  ? flashcards[currentCard].answer
                  : flashcards[currentCard].question}
              </p>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="text-blue-600 hover:underline"
              >
                {showAnswer ? "Show Question" : "Show Answer"}
              </button>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setCurrentCard((prev) => (prev + 1) % flashcards.length);
                  setShowAnswer(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <X className="w-4 h-4" /> Skip
              </button>
              <button
                onClick={() => {
                  setCurrentCard((prev) => (prev + 1) % flashcards.length);
                  setShowAnswer(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Check className="w-4 h-4" /> Got It
              </button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Card {currentCard + 1} of {flashcards.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIStudyHub;
