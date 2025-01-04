import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

function TopConversationsTable() {
  // Mock data for the student list
  const students = [
    {
      id: 1,
      name: "Alex Shatov",
      email: "alexshatov@gmail.com",
      grade: "10",
      conversations: 12,
      lastActive: "2 hours ago",
      avatar: "user.svg",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      grade: "12",
      conversations: 8,
      lastActive: "1 day ago",
      avatar: "user.svg",
    },
    {
      id: 3,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      grade: "8",
      conversations: 15,
      lastActive: "3 days ago",
      avatar: "user.svg",
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emilyjohnson@gmail.com",
      grade: "10",
      conversations: 5,
      lastActive: "1 hour ago",
      avatar: "user.svg",
    },
    {
      id: 5,
      name: "Emmma Thompson",
      email: "emma@gmail.com",
      grade: "11",
      conversations: 7,
      lastActive: "8 hours ago",
      avatar: "user.svg",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center h-full">
        {/* Table */}
        <div className="w-full mx-auto bg-white shadow-lg rounded-2xl border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Student List</h2>
              <a
                href="/admin/students"
                className="text-blue-500 text-sm font-bold"
              >
                View all <HiArrowNarrowRight className="inline" />
              </a>
            </div>
          </header>

          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Student Name
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Grade</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Conversations
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">
                        Last Active
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="text-sm divide-y divide-gray-100"
                  id="student-list"
                >
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 pt-1">
                            <img
                              className="rounded-full"
                              src={student.avatar}
                              width={30}
                              height={30}
                              alt={student.name}
                            />
                          </div>
                          <div className="font-medium text-gray-800">
                            {student.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{student.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{student.grade}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">
                          {student.conversations} Conversations
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{student.lastActive}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopConversationsTable;
