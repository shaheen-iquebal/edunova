import React, { useState } from "react";
import axios from "axios";
import {
  BrainCircuit,
  Send,
  Loader2,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  ListTodo,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TodoList = () => {
  const initialTodos = [
    { id: 1, text: "Complete React project documentation", completed: true },
    { id: 2, text: "Study for upcoming SQL certification", completed: false },
    { id: 3, text: "Review pull requests from team members", completed: false },
    { id: 4, text: "Debug authentication module", completed: true },
    { id: 5, text: "Write test cases for new features", completed: false },
    { id: 6, text: "Update portfolio website", completed: false },
    { id: 7, text: "Read chapter 5 of Design Patterns book", completed: true },
    { id: 8, text: "Refactor legacy code module", completed: false },
  ];
  // States for normal todo
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  // States for AI todo
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiTodos, setAiTodos] = useState([]);
  const [error, setError] = useState("");

  const generatePrompt = (topic) => {
    return {
      contents: [
        {
          parts: [
            {
              text: `Create a detailed, actionable todo list for learning "${topic}". 
          Format each task as a clear, completable item. Structure it as:

          Prerequisites Tasks:
          - [Specific prerequisite task 1]
          - [Specific prerequisite task 2]

          Core Learning Tasks:
          - [Specific learning task 1]
          - [Specific learning task 2]

          Practice Tasks:
          - [Specific practice task 1]
          - [Specific practice task 2]

          Advanced Tasks:
          - [Specific advanced task 1]
          - [Specific advanced task 2]

          Keep tasks specific and actionable, each starting with a verb.
          Example: "Complete exercise on pointer arithmetic in C" instead of just "Pointer arithmetic"`,
            },
          ],
        },
      ],
    };
  };

  // Handle normal todo operations
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([{ text: newTodo, completed: false, id: Date.now() }, ...todos]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handle AI todo generation
  const handleAISubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZDK4iaYCc7f9QWycchOqKGf_BTEDWSyo",
        generatePrompt(topic),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data.candidates &&
        response.data.candidates[0].content.parts[0].text
      ) {
        // Convert the markdown response to todo items
        const text = response.data.candidates[0].content.parts[0].text;
        const todoItems = text
          .split("\n")
          .filter((line) => line.trim().startsWith("-"))
          .map((line) => ({
            text: line.replace("-", "").trim(),
            completed: false,
            id: Date.now() + Math.random(),
            category: getCategoryFromContext(line, text),
          }));

        setAiTodos(todoItems);
      } else {
        setError("No response generated. Please try again.");
      }
    } catch (err) {
      setError("Failed to generate todo list. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine task category
  const getCategoryFromContext = (line, fullText) => {
    const categories = [
      "Prerequisites",
      "Core Learning",
      "Practice",
      "Advanced",
    ];
    let currentCategory = "";

    for (const category of categories) {
      if (
        fullText.includes(category) &&
        fullText.indexOf(category) < fullText.indexOf(line)
      ) {
        currentCategory = category;
      }
    }
    return currentCategory;
  };

  // Toggle AI generated todo
  const toggleAiTodo = (id) => {
    setAiTodos(
      aiTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <ListTodo className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Smart Todo List</h1>
      </div>

      <Tabs defaultValue="normal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="normal">Regular Todo</TabsTrigger>
          <TabsTrigger value="ai">AI Learning Todo</TabsTrigger>
        </TabsList>

        <TabsContent value="normal">
          <Card>
            <CardHeader>
              <CardTitle>My Todo List</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addTodo} className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo..."
                  className="flex-1 p-3 border rounded-lg"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </form>

              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="flex-shrink-0"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </button>
                    <span
                      className={`flex-1 ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Learning Todo Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAISubmit} className="space-y-4 mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter what you want to learn (e.g., 'Pointers in C')"
                    className="flex-1 p-3 border rounded-lg"
                  />
                  <button
                    type="submit"
                    disabled={loading || !topic.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <BrainCircuit className="w-4 h-4" />
                        Generate Tasks
                      </>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}

              {aiTodos.length > 0 && (
                <div className="space-y-6">
                  {[
                    "Prerequisites",
                    "Core Learning",
                    "Practice",
                    "Advanced",
                  ].map((category) => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-semibold text-lg text-gray-700">
                        {category} Tasks
                      </h3>
                      {aiTodos
                        .filter((todo) => todo.category === category)
                        .map((todo) => (
                          <div
                            key={todo.id}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                          >
                            <button onClick={() => toggleAiTodo(todo.id)}>
                              {todo.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-300" />
                              )}
                            </button>
                            <span
                              className={
                                todo.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }
                            >
                              {todo.text}
                            </span>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoList;
