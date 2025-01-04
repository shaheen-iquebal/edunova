import { useState, useRef, useEffect } from "react";
import {
  Calculator,
  PenTool,
  Upload,
  History,
  Save,
  RotateCcw,
  BookOpen,
  Lightbulb,
  ChevronRight,
  Camera,
  SquareFunction,
  ChartArea,
  BrainCircuit,
  Table2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AICalculator = () => {
  const [activeTab, setActiveTab] = useState("write");
  const [showSolution, setShowSolution] = useState(false);
  const [activeTool, setActiveTool] = useState("solver");
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [solution, setSolution] = useState(null);
  const [statisticsInput, setStatisticsInput] = useState("");
  const [calculusInput, setCalculusInput] = useState("");
  const [customDataset, setCustomDataset] = useState([]);
  const [customFunction, setCustomFunction] = useState("");
  const [history, setHistory] = useState([
    { id: 1, problem: "3x + 5 = 14", solution: "x = 3" },
    { id: 2, problem: "∫2x dx", solution: "x² + C" },
  ]);
  // Sample data for various tools
  const sampleGraphData = [
    { x: -2, y: 4 },
    { x: -1, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 4 },
  ];

  const sampleStatistics = {
    dataset: [12, 15, 18, 22, 25, 28],
    mean: 20,
    median: 20.5,
    mode: "N/A",
    standardDev: 5.89,
  };

  const sampleDerivative = {
    original: "f(x) = x³ - 2x + 1",
    derivative: "f'(x) = 3x² - 2",
    steps: [
      "Apply power rule to x³: 3x²",
      "Apply power rule to -2x: -2",
      "The constant 1 becomes 0",
      "Combine terms: 3x² - 2",
    ],
  };
  const sampleSolution = {
    problem: "2x + 3 = 11",
    steps: [
      { explanation: "Subtract 3 from both sides", result: "2x = 8" },
      { explanation: "Divide both sides by 2", result: "x = 4" },
    ],
    finalAnswer: "x = 4",
    verification: "When x = 4: 2(4) + 3 = 11 ✓",
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, [activeTab]);

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

  const solveEquation = () => {
    setSolution(sampleSolution);
    setShowSolution(true);
  };

  // Function to handle statistics data input
  const handleStatisticsInput = (e) => {
    e.preventDefault();
    const numbers = statisticsInput
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));

    setCustomDataset(numbers);
    // In a real app, this would trigger the AI analysis
    setStatisticsInput("");
  };

  // Function to handle calculus function input
  const handleCalculusInput = (e) => {
    e.preventDefault();
    setCustomFunction(calculusInput);
    // In a real app, this would trigger the AI analysis
    setCalculusInput("");
  };

  const tools = [
    { id: "solver", icon: Calculator, name: "Equation Solver" },
    { id: "grapher", icon: ChartArea, name: "Function Grapher" },
    { id: "calculus", icon: SquareFunction, name: "Calculus Helper" },
    { id: "statistics", icon: Table2, name: "Statistics Analysis" },
  ];

  const renderToolContent = () => {
    switch (activeTool) {
      case "grapher":
        return (
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Function Grapher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter function (e.g., y = x²)"
                  className="w-full p-2 border rounded"
                />
              </div>
              <LineChart width={1100} height={350} data={sampleGraphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
              </LineChart>
            </CardContent>
          </Card>
        );

      case "calculus":
        return (
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Calculus Helper</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculusInput} className="mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Enter a function to analyze
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={calculusInput}
                        onChange={(e) => setCalculusInput(e.target.value)}
                        placeholder="e.g., x² + 2x + 1"
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Analyze
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h3 className="font-semibold mb-2">Original Function:</h3>
                    <p className="text-lg">
                      {customFunction || sampleDerivative.original}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded">
                    <h3 className="font-semibold mb-2">Derivative:</h3>
                    <p className="text-lg text-blue-600">
                      {sampleDerivative.derivative}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded">
                  <h3 className="font-semibold mb-2">Steps:</h3>
                  <ul className="list-disc pl-5">
                    {sampleDerivative.steps.map((step, index) => (
                      <li key={index} className="text-gray-600 mb-2">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "statistics":
        return (
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Statistics Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStatisticsInput} className="mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Enter your dataset (comma-separated numbers)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={statisticsInput}
                        onChange={(e) => setStatisticsInput(e.target.value)}
                        placeholder="e.g., 12, 15, 18, 22, 25, 28"
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Analyze
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded">
                  <h3 className="font-semibold mb-2">Current Dataset:</h3>
                  <p className="text-lg">
                    {customDataset.length > 0
                      ? customDataset.join(", ")
                      : sampleStatistics.dataset.join(", ")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="font-semibold">Mean</p>
                    <p className="text-lg text-blue-600">
                      {sampleStatistics.mean}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="font-semibold">Median</p>
                    <p className="text-lg text-blue-600">
                      {sampleStatistics.median}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="font-semibold">Mode</p>
                    <p className="text-lg text-blue-600">
                      {sampleStatistics.mode}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="font-semibold">Standard Deviation</p>
                    <p className="text-lg text-blue-600">
                      {sampleStatistics.standardDev}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Data Visualization</h3>
                  <LineChart
                    width={1100}
                    height={200}
                    data={customDataset.map((value, index) => ({
                      x: index + 1,
                      y: value,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" label="Data Point" />
                    <YAxis label="Value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                  </LineChart>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div
              className="w-full"
              style={{ maxWidth: "100%", overflowX: "hidden" }}
            >
              <canvas
                ref={canvasRef}
                className="border rounded bg-white cursor-crosshair w-full"
                style={{ height: "300px", touchAction: "none" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Clear
              </button>
              <button
                onClick={solveEquation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Lightbulb className="w-4 h-4" /> Solve
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-wo-4xl p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">AI Calculator</h1>
      </div>

      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="write" className="flex items-center gap-2">
            <PenTool className="w-4 h-4" /> Write
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-4 rounded-lg border transition-colors ${
                  activeTool === tool.id
                    ? "bg-blue-50 border-blue-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <tool.icon className="w-6 h-6 mb-2 mx-auto" />
                <p className="text-sm text-center">{tool.name}</p>
              </button>
            ))}
          </div>
          {renderToolContent()}
        </TabsContent>

        <TabsContent value="upload">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Math Problem</h3>
            <p className="text-gray-600 mb-4">
              Take a photo or upload an image of your math problem
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Choose File
            </button>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.problem}</p>
                    <p className="text-gray-600">{item.solution}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Solution Dialog */}
      <Dialog open={showSolution} onOpenChange={setShowSolution}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Step-by-Step Solution
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Problem:</h3>
              <p className="text-xl text-center p-4 bg-gray-50 rounded">
                {sampleSolution.problem}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Steps:</h3>
              {sampleSolution.steps.map((step, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-600 mb-1">{step.explanation}</p>
                  <p className="text-lg">{step.result}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Final Answer:</h3>
              <p className="text-xl text-center p-4 bg-blue-50 rounded text-blue-800">
                {sampleSolution.finalAnswer}
              </p>
              <p className="text-gray-600 mt-2 text-center">
                {sampleSolution.verification}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AICalculator;
