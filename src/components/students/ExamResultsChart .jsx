import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { BookOpenCheckIcon } from "lucide-react";

const ExamResultsChart = () => {
  const examResults = [
    {
      term: "Mid-Term",
      marks: {
        Mathematics: 85,
        Science: 90,
        English: 88,
        History: 80,
        "Physical Education": 95,
      },
    },
    {
      term: "Final-Term",
      marks: {
        Mathematics: 90,
        Science: 92,
        English: 91,
        History: 85,
        "Physical Education": 96,
      },
    },
  ];

  const subjects = Object.keys(examResults[0].marks);
  const chartData = subjects.map((subject) => ({
    subject,
    "Mid-Term": examResults[0].marks[subject],
    "Final-Term": examResults[1].marks[subject],
  }));

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-2">
        <BookOpenCheckIcon className="w-5 h-5 text-purple-500" />
        <CardTitle className="!mt-0">Exam Results Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="subject"
                tick={false} // This hides the labels
                axisLine={true} // You can set this to false if you want to hide the axis line too
              />
              <YAxis
                domain={[0, 100]}
                label={{ value: "Marks", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Mid-Term" fill="#60a5fa" />
              <Bar dataKey="Final-Term" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {examResults.map((term) => (
            <div key={term.term} className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">{term.term} Average</h4>
              <p className="text-2xl font-bold">
                {(
                  Object.values(term.marks).reduce((a, b) => a + b, 0) /
                  subjects.length
                ).toFixed(1)}
                %
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamResultsChart;
