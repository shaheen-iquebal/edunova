// Data constants for the Physics Insights component
export const performanceMetrics = [
    { topic: "Kinematics", score: 88, status: "Strong" },
    { topic: "Forces", score: 85, status: "Good" },
    { topic: "Energy & Work", score: 92, status: "Excellent" },
    { topic: "Momentum", score: 78, status: "Developing" },
    { topic: "Rotational Motion", score: 75, status: "Needs Work" },
  ];
  
  export const conceptualAreas = [
    {
      topic: "Problem-Solving Process",
      subtopics: [
        { name: "Drawing Free Body Diagrams", score: 90 },
        { name: "Equation Selection", score: 82 },
        { name: "Unit Analysis", score: 85 },
      ],
    },
    {
      topic: "Mathematical Application",
      subtopics: [
        { name: "Vector Analysis", score: 75 },
        { name: "Differential Equations", score: 70 },
        { name: "Graph Interpretation", score: 88 },
      ],
    },
  ];
  
  export const practiceResources = [
    {
      type: "Core Practice",
      items: [
        {
          title: "Mechanics Problem Set",
          problems: 20,
          difficulty: "Mixed",
          focus: "Fundamental Principles",
        },
        {
          title: "Advanced Dynamics Workshop",
          problems: 15,
          difficulty: "Advanced",
          focus: "Problem-Solving Steps",
        },
      ],
    },
    {
      type: "Lab Simulations",
      items: [
        {
          title: "Virtual Physics Lab",
          duration: "45 mins",
          type: "Interactive",
          focus: "Practical Application",
        },
        {
          title: "Force Analysis Simulator",
          duration: "30 mins",
          type: "Simulation",
          focus: "Visual Learning",
        },
      ],
    },
  ];
  
  export const quickSummaryData = {
    strengths: [
      "Energy conservation principles",
      "Mathematical problem setup",
      "Free body diagrams",
      "Basic kinematics",
    ],
    improvements: [
      "Vector mathematics application",
      "Complex force scenarios",
      "Rotational dynamics",
      "Multi-step problems",
    ],
    fundamentals: [
      {
        title: "Mechanics Principles",
        description: "Master Newton's laws and their applications",
        mastery: "85%",
      },
      {
        title: "Problem-Solving Method",
        description: "Systematic approach to physics problems",
        mastery: "80%",
      },
      {
        title: "Mathematical Tools",
        description: "Applied calculus and vector analysis",
        mastery: "75%",
      }
    ]
  };
  
  export const studyPathData = {
    current: "Mechanics Fundamentals",
    progress: 75,
    nextTopics: [
      "Advanced Dynamics",
      "Rotational Motion",
      "Mechanical Waves"
    ],
    prerequisites: [
      "Basic Calculus",
      "Vector Mathematics",
      "Trigonometry"
    ]
  };