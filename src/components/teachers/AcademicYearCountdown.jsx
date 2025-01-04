// import { AiFillAlert } from "react-icons/ai";

// function AcademicYearCountdown() {
//   return (
//     <div className="pt-4 pb-7">
//       <p className="text-rose-600 font-semibold">
//         <AiFillAlert className="inline mb-1.5" />
//         <span className="pl-2">Academic Year ends in 15 days</span>
//       </p>
//       <div className="relative pt-1 shadow-lg">
//         <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200 flex-row-reverse">
//           <div
//             style={{ width: "5%" }}
//             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white border"
//           />
//           <div
//             style={{ width: "5%" }}
//             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
//           />
//           <div
//             style={{ width: "15%" }}
//             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
//           />
//           <div
//             style={{ width: "25%" }}
//             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
//           ></div>
//           <span className="italic">6 months completed&nbsp;&nbsp;</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AcademicYearCountdown;

// import React from 'react';
// import React from "react";
// import React from 'react';
// import {
//   AiFillAlert,
//   AiOutlineCalendar,
//   AiOutlineClockCircle,
//   AiOutlineBook,
// } from "react-icons/ai";

// const AcademicYearCountdown = () => {
//   // Calculate percentages and dates
//   const startDate = new Date("2024-05-01");
//   const endDate = new Date("2025-04-30");
//   const currentDate = new Date();

//   const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
//   const daysElapsed = Math.floor(
//     (currentDate - startDate) / (1000 * 60 * 60 * 24)
//   );
//   const daysRemaining = Math.floor(
//     (endDate - currentDate) / (1000 * 60 * 60 * 24)
//   );
//   const progressPercentage = Math.min(
//     100,
//     Math.max(0, (daysElapsed / totalDays) * 100)
//   );

//   const getStatusColor = () => {
//     if (daysRemaining <= 15) return "text-red-500";
//     if (daysRemaining <= 30) return "text-orange-500";
//     return "text-emerald-500";
//   };

//   const getProgressColor = () => {
//     if (daysRemaining <= 15) return "bg-red-500";
//     if (daysRemaining <= 30) return "bg-orange-500";
//     return "bg-emerald-500";
//   };

//   const getPhase = () => {
//     const percentage = progressPercentage;
//     if (percentage < 25) return "First Quarter";
//     if (percentage < 50) return "Mid-Term";
//     if (percentage < 75) return "Third Quarter";
//     return "Final Term";
//   };

//   return (
//     <div className="w-full p-6 bg-white rounded-xl shadow-lg mb-8 border">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <AiOutlineBook className="w-6 h-6" />
//         <h2 className="text-xl font-bold">Academic Year Progress</h2>
//       </div>

//       {/* Main countdown alert */}
//       <div
//         className={`flex items-center gap-2 ${getStatusColor()} font-semibold mb-4`}
//       >
//         <AiFillAlert className="w-5 h-5" />
//         <span>
//           {daysRemaining > 0
//             ? `${daysRemaining} days remaining in academic year`
//             : "Academic year completed!"}
//         </span>
//       </div>

//       {/* Progress section */}
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <AiOutlineCalendar className="w-4 h-4" />
//             <span className="font-semibold">{getPhase()}</span>
//           </div>
//           <span className="font-semibold">
//             {Math.round(progressPercentage)}% Complete
//           </span>
//         </div>

//         {/* Progress bar */}
//         <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             style={{ width: `${progressPercentage}%` }}
//             className={`h-full ${getProgressColor()} transition-all duration-500`}
//           />
//         </div>

//         {/* Stats grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
//           <div className="bg-gray-100 p-4 rounded-lg text-center">
//             <div className="text-gray-600 text-sm">Days Elapsed</div>
//             <div className="text-2xl font-bold">{daysElapsed}</div>
//           </div>

//           <div className="bg-gray-100 p-4 rounded-lg text-center">
//             <div className="text-gray-600 text-sm">Days Remaining</div>
//             <div className="text-2xl font-bold">{daysRemaining}</div>
//           </div>

//           <div className="bg-gray-100 p-4 rounded-lg text-center">
//             <div className="text-gray-600 text-sm">Total Days</div>
//             <div className="text-2xl font-bold">{totalDays}</div>
//           </div>
//         </div>

//         {/* Key dates */}
//         <div className="space-y-2">
//           <div className="flex items-center gap-2 font-semibold">
//             <AiOutlineClockCircle className="w-4 h-4" />
//             <span>Key Dates</span>
//           </div>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Start Date:</span>
//               <span className="font-medium">
//                 {startDate.toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Current Date:</span>
//               <span className="font-medium">
//                 {currentDate.toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>End Date:</span>
//               <span className="font-medium">
//                 {endDate.toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcademicYearCountdown;

// import React from 'react';
// import React from "react";
import {
  AiFillAlert,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineBook,
  AiOutlineTrophy,
  AiOutlineSchedule,
  AiOutlineFileText,
} from "react-icons/ai";

const AcademicYearCountdown = () => {
  // Updated date calculations
  const startDate = new Date("2024-05-01");
  const endDate = new Date("2025-06-30");
  const currentDate = new Date();

  const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  );
  const daysRemaining = Math.floor(
    (endDate - currentDate) / (1000 * 60 * 60 * 24)
  );
  const progressPercentage = Math.min(
    100,
    Math.max(0, (daysElapsed / totalDays) * 100)
  );

  const termInfo = {
    currentTerm: "Spring Term",
    termProgress: 65,
    nextHoliday: "Summer Break",
    daysToHoliday: 12,
  };

  const academicProgress = {
    totalClasses: 180,
    classesCompleted: 120,
    attendanceRate: 96.5,
    remainingAssignments: 8,
  };

  const upcomingEvents = [
    { date: "May 15, 2024", event: "Mid-Term Exams Begin" },
    { date: "May 25, 2024", event: "Project Deadline" },
    { date: "June 10, 2024", event: "Final Presentations" },
  ];

  const getStatusColor = () => {
    if (daysRemaining <= 15) return "text-red-500";
    if (daysRemaining <= 30) return "text-orange-500";
    return "text-emerald-500";
  };

  const getProgressColor = () => {
    if (daysRemaining <= 15) return "bg-red-500";
    if (daysRemaining <= 30) return "bg-orange-500";
    return "bg-emerald-500";
  };

  const getPhase = () => {
    const percentage = progressPercentage;
    if (percentage < 25) return "First Quarter";
    if (percentage < 50) return "Mid-Term";
    if (percentage < 75) return "Third Quarter";
    return "Final Term";
  };

  return (
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-lg border">
      <div className="flex items-center gap-2 mb-4">
        <AiOutlineBook className="w-6 h-6" />
        <h2 className="text-xl font-bold">Academic Year Progress</h2>
      </div>

      <div
        className={`flex items-center gap-2 ${getStatusColor()} font-semibold mb-4`}
      >
        <AiFillAlert className="w-5 h-5" />
        <span>
          {daysRemaining > 0
            ? `${daysRemaining} days remaining in academic year`
            : "Academic year completed!"}
        </span>
      </div>

      <div className="space-y-6">
        {/* Progress bar */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AiOutlineCalendar className="w-4 h-4" />
              <span className="font-semibold">{getPhase()}</span>
            </div>
            <span className="font-semibold">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>

          <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-lg">
            <div
              style={{ width: `${progressPercentage}%` }}
              className={`h-full ${getProgressColor()} transition-all duration-500`}
            />
          </div>
        </div>

        {/* Academic Progress Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <AiOutlineTrophy className="w-4 h-4" />
            <h3 className="font-semibold">Academic Progress</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Total Classes</div>
              <div className="font-bold">{academicProgress.totalClasses}</div>
            </div>
            <div>
              <div className="text-gray-600">Classes Completed</div>
              <div className="font-bold">
                {academicProgress.classesCompleted}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Attendance Rate</div>
              <div className="font-bold">
                {academicProgress.attendanceRate}%
              </div>
            </div>
            <div>
              <div className="text-gray-600">Pending Assignments</div>
              <div className="font-bold">
                {academicProgress.remainingAssignments}
              </div>
            </div>
          </div>
        </div>

        {/* Term Info and Holiday */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AiOutlineFileText className="w-4 h-4" />
              <h3 className="font-semibold">Current Term</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Term:</span>
                <span className="font-medium">{termInfo.currentTerm}</span>
              </div>
              <div className="flex justify-between">
                <span>Term Progress:</span>
                <span className="font-medium">{termInfo.termProgress}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AiOutlineCalendar className="w-4 h-4" />
              <h3 className="font-semibold">Next Holiday</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Holiday:</span>
                <span className="font-medium">{termInfo.nextHoliday}</span>
              </div>
              <div className="flex justify-between">
                <span>Days Until:</span>
                <span className="font-medium">
                  {termInfo.daysToHoliday} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events and Key Dates in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upcoming Events */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AiOutlineSchedule className="w-4 h-4" />
              <h3 className="font-semibold">Upcoming Events</h3>
            </div>
            <div className="space-y-2 text-sm">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{event.event}</span>
                  <span className="font-medium">{event.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Dates */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AiOutlineClockCircle className="w-4 h-4" />
              <h3 className="font-semibold">Key Dates</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Start Date:</span>
                <span className="font-medium">
                  {startDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Current Date:</span>
                <span className="font-medium">
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>End Date:</span>
                <span className="font-medium">
                  {endDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicYearCountdown;
