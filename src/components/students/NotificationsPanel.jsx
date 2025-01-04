/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Bell,
  Book,
  Award,
  Calendar,
  MessageSquare,
  Eye,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const NotificationsPanel = () => {
  // Sample notification data - in real app, this would come from an API
  const [notifications, setNotifications] = useState({
    new: [
      {
        id: 1,
        type: "assignment",
        title: "New Assignment: Data Structures",
        message: "Complete the Binary Tree implementation by Friday",
        time: "2 hours ago",
        course: "CS201",
      },
      {
        id: 2,
        type: "grade",
        title: "Grade Posted",
        message: "Your grade for Algorithm Analysis Quiz 2 has been posted",
        time: "3 hours ago",
        course: "CS301",
      },
      {
        id: 3,
        type: "announcement",
        title: "Class Cancelled",
        message: "Tomorrow's Database Management class is cancelled",
        time: "5 hours ago",
        course: "CS401",
      },
      {
        id: 4,
        type: "event",
        title: "Guest Lecture",
        message:
          "Join us for a guest lecture on Quantum Computing at 3 PM in Room 204",
        time: "1 day ago",
        course: "CS501",
      },
      {
        id: 5,
        type: "resource",
        title: "New Study Material Uploaded",
        message:
          "Lecture notes for Machine Learning are now available in the course portal",
        time: "2 days ago",
        course: "CS601",
      },
    ],
    seen: [
      {
        id: 4,
        type: "deadline",
        title: "Submission Deadline",
        message: "Project proposal deadline extended to next week",
        time: "2 days ago",
        course: "CS401",
      },
      {
        id: 5,
        type: "grade",
        title: "Grade Posted",
        message: "Mid-term examination results are now available",
        time: "3 days ago",
        course: "CS201",
      },
    ],
  });

  const getIcon = (type) => {
    switch (type) {
      case "assignment":
        return <Book className="h-4 w-4" />;
      case "grade":
        return <Award className="h-4 w-4" />;
      case "deadline":
        return <Calendar className="h-4 w-4" />;
      case "announcement":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => ({
      seen: [...prev.seen, ...prev.new],
      new: [],
    }));
  };

  const NotificationCard = ({ notification }) => (
    <div className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <div className="mt-1">{getIcon(notification.type)}</div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <Badge variant="outline">{notification.course}</Badge>
        </div>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{notification.time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Notifications</CardTitle>
        {notifications.new.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="new" className="flex items-center gap-2">
              New
              {notifications.new.length > 0 && (
                <Badge variant="destructive">{notifications.new.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="seen" className="flex items-center gap-2">
              Earlier
              {notifications.seen.length > 0 && (
                <Badge variant="outline">{notifications.seen.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new">
            <ScrollArea className="h-[450px] pr-4">
              {notifications.new.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                  <CheckCircle2 className="h-12 w-12 mb-2" />
                  <p>You&apos;re all caught up!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.new.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="seen">
            <ScrollArea className="h-[400px] pr-4">
              {notifications.seen.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                  <Bell className="h-12 w-12 mb-2" />
                  <p>No previous notifications</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.seen.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
