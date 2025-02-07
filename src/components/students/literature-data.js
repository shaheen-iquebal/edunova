// Data constants for the Literature Insights component
export const performanceMetrics = [
    { topic: "Close Reading", score: 92, status: "Excellent" },
    { topic: "Literary Analysis", score: 85, status: "Strong" },
    { topic: "Critical Writing", score: 78, status: "Good" },
    { topic: "Textual Interpretation", score: 82, status: "Very Good" },
    { topic: "Genre Studies", score: 75, status: "Developing" },
  ];
  
  export const weakPoints = [
    {
      topic: "Critical Writing",
      subtopics: [
        { name: "Thesis Development", score: 70 },
        { name: "Textual Evidence", score: 75 },
        { name: "Argumentative Structure", score: 68 },
      ],
    },
    {
      topic: "Genre Studies",
      subtopics: [
        { name: "Modern Literature", score: 72 },
        { name: "Classical Techniques", score: 68 },
        { name: "Comparative Analysis", score: 65 },
      ],
    },
  ];
  
  export const recommendedResources = [
    {
      type: "Reading List",
      items: [
        {
          title: "Modern American Literature Deep Dive",
          complexity: "Advanced",
          estimatedTime: "2 weeks",
        },
        {
          title: "Critical Writing Masterclass",
          complexity: "Intermediate",
          estimatedTime: "1 week",
        },
      ],
    },
    {
      type: "Writing Workshops",
      items: [
        {
          title: "Crafting Compelling Arguments",
          focus: "Thesis Development",
          intensity: "High",
        },
        {
          title: "Analyzing Literary Techniques",
          focus: "Genre Interpretation",
          intensity: "Medium",
        },
      ],
    },
  ];
  
  export const quickSummaryData = {
    strengths: [
      "Close reading skills",
      "Textual interpretation",
      "Analytical thinking",
      "Literary comprehension",
    ],
    improvements: [
      "Argumentative writing structure",
      "Thesis development",
      "Genre-specific analysis",
      "Advanced literary techniques",
    ],
    focusAreas: [
      {
        title: "Writing Prowess",
        description: "Strengthen critical writing and argument construction",
        priority: "High",
      },
      {
        title: "Genre Mastery",
        description: "Develop deeper understanding of literary genres",
        priority: "Medium",
      },
      {
        title: "Analytical Skills",
        description: "Enhance critical analysis and interpretation",
        priority: "High",
      }
    ]
  };