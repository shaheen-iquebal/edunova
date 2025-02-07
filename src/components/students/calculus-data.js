// Data constants for the Calculus Insights component
export const topicPerformance = [
    { topic: "Limits", score: 92, status: "Strong" },
    { topic: "Derivatives", score: 88, status: "Good" },
    { topic: "Integration", score: 75, status: "Needs Work" },
    { topic: "Applications", score: 82, status: "Good" },
    { topic: "Series", score: 70, status: "Needs Work" },
  ];
  
  export const weakPoints = [
    {
      topic: "Integration",
      subtopics: [
        { name: "Integration by Parts", score: 65 },
        { name: "Trig Substitution", score: 60 },
        { name: "Partial Fractions", score: 70 },
      ],
    },
    {
      topic: "Series",
      subtopics: [
        { name: "Convergence Tests", score: 68 },
        { name: "Power Series", score: 72 },
        { name: "Taylor Series", score: 70 },
      ],
    },
  ];
  
  export const recommendedPractice = [
    {
      type: "Video Lessons",
      items: [
        {
          title: "Integration Techniques Masterclass",
          duration: "45 mins",
          difficulty: "Intermediate",
        },
        {
          title: "Series Convergence Deep Dive",
          duration: "30 mins",
          difficulty: "Advanced",
        },
      ],
    },
    {
      type: "Practice Problems",
      items: [
        {
          title: "Integration by Parts Workshop",
          problems: 15,
          difficulty: "Mixed",
        },
        {
          title: "Series Convergence Tests",
          problems: 20,
          difficulty: "Progressive",
        },
      ],
    },
  ];
  
  export const quickSummaryData = {
    strengths: [
      "Mastery of limit concepts",
      "Basic derivative applications",
      "Problem-solving methodology",
      "Graphical analysis",
    ],
    improvements: [
      "Advanced integration techniques",
      "Series convergence tests",
      "Applied optimization problems",
      "Complex applications",
    ],
    focusAreas: [
      {
        title: "Integration Mastery",
        description: "Focus on advanced techniques and applications",
        priority: "High",
      },
      {
        title: "Series & Sequences",
        description: "Practice convergence tests and Taylor series",
        priority: "Medium",
      },
      {
        title: "Application Problems",
        description: "Work on real-world optimization scenarios",
        priority: "High",
      }
    ]
  };