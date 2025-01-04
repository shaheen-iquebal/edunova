import { useState } from "react";
import {
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Users,
  FileText,
  Mail,
  X,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TeacherNotifications = () => {
  // Sample notifications data
  const initialNotifications = [
    {
      id: 1,
      type: "urgent",
      category: "grading",
      title: "Physics 101 Projects Due for Grading",
      message: "15 student projects await your review. Deadline: Tomorrow 5 PM",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "meeting",
      category: "meeting",
      title: "Department Meeting Reminder",
      message:
        "Monthly department meeting scheduled for tomorrow at 10 AM in Room 301",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "info",
      category: "student",
      title: "Student Support Request",
      message:
        "John Smith from Grade 11A requested additional help with quantum mechanics",
      time: "5 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "deadline",
      category: "admin",
      title: "Term Reports Due Soon",
      message: "Please submit all term reports by Friday. 5 reports pending.",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 5,
      type: "info",
      category: "parent",
      title: "Parent Meeting Request",
      message: "Mrs. Johnson requests a meeting regarding Sarah's progress",
      time: "1 day ago",
      unread: false,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [filters, setFilters] = useState({
    grading: true,
    meeting: true,
    student: true,
    admin: true,
    parent: true,
  });

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "meeting":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "info":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "deadline":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get background color based on notification status
  const getBackground = (notification) => {
    return notification.unread
      ? "bg-blue-50 hover:bg-blue-100"
      : "hover:bg-gray-50";
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(
    (notif) => filters[notif.category]
  );

  // Get unread count
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setNotifications((notifs) =>
                notifs.map((n) => ({ ...n, unread: false }))
              )
            }
          >
            Mark all read
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={filters.grading}
                onCheckedChange={(checked) =>
                  setFilters((f) => ({ ...f, grading: checked }))
                }
              >
                Grading
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.meeting}
                onCheckedChange={(checked) =>
                  setFilters((f) => ({ ...f, meeting: checked }))
                }
              >
                Meetings
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.student}
                onCheckedChange={(checked) =>
                  setFilters((f) => ({ ...f, student: checked }))
                }
              >
                Student Updates
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.admin}
                onCheckedChange={(checked) =>
                  setFilters((f) => ({ ...f, admin: checked }))
                }
              >
                Administrative
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.parent}
                onCheckedChange={(checked) =>
                  setFilters((f) => ({ ...f, parent: checked }))
                }
              >
                Parent Communications
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications to display
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  relative p-4 rounded-lg border transition-colors
                  ${getBackground(notification)}
                `}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <Badge className="bg-blue-500">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherNotifications;
