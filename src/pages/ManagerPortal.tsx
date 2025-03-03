
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatsCard from "@/components/ui/StatsCard";
import ReviewCard from "@/components/ui/ReviewCard";
import { BarChart3, CheckCircle, Clock, Plus, Users } from "lucide-react";

const ManagerPortal = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for team members
  const teamMembers = [
    {
      id: "1",
      name: "Jane Smith",
      position: "Senior Developer",
      image: "",
      reviewStatus: "pending",
    },
    {
      id: "2",
      name: "John Doe",
      position: "UX Designer",
      image: "",
      reviewStatus: "in-progress",
    },
    {
      id: "3",
      name: "Emily Johnson",
      position: "Product Manager",
      image: "",
      reviewStatus: "completed",
    },
    {
      id: "4",
      name: "Michael Brown",
      position: "Junior Developer",
      image: "",
      reviewStatus: "pending",
    },
  ];

  // Mock data for reviews
  const pendingReviews = [
    {
      id: "1",
      title: "Quarterly Performance Review",
      employeeName: "Jane Smith",
      quarter: "Q2",
      year: 2023,
      dueDate: "July 15, 2023",
      status: "pending" as const,
      progress: 0,
    },
    {
      id: "2",
      title: "Quarterly Performance Review",
      employeeName: "Michael Brown",
      quarter: "Q2",
      year: 2023,
      dueDate: "July 15, 2023",
      status: "pending" as const,
      progress: 0,
    },
  ];

  const inProgressReviews = [
    {
      id: "3",
      title: "Quarterly Performance Review",
      employeeName: "John Doe",
      quarter: "Q2",
      year: 2023,
      dueDate: "July 15, 2023",
      status: "in-progress" as const,
      progress: 30,
    },
  ];

  const completedReviews = [
    {
      id: "4",
      title: "Quarterly Performance Review",
      employeeName: "Emily Johnson",
      quarter: "Q1",
      year: 2023,
      dueDate: "April 15, 2023",
      status: "completed" as const,
      progress: 100,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manager Portal</h1>
          <p className="text-muted-foreground">
            Manage your team's performance reviews
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus size={16} className="mr-2" />
          New Review
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Team Members"
          value={teamMembers.length}
          icon={<Users className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-100 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Pending Reviews"
          value={pendingReviews.length}
          icon={<Clock className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-200 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Completed Reviews"
          value={completedReviews.length}
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-300 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Team Performance"
          value="87%"
          description="Average score across team"
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-400 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
      </div>

      {/* Team members */}
      <Card className={`mb-8 transition-all duration-500 delay-500 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            View and manage your team's performance reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {member.position}
                    </p>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.reviewStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : member.reviewStatus === "in-progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {member.reviewStatus.replace("-", " ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Tabs */}
      <Card className={`transition-all duration-500 delay-600 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}>
        <CardHeader>
          <CardTitle>Team Performance Reviews</CardTitle>
          <CardDescription>
            View and complete your team's performance reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {pendingReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingReviews.map((review) => (
                    <ReviewCard key={review.id} {...review} isManager={true} />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p>No pending reviews found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="in-progress">
              {inProgressReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgressReviews.map((review) => (
                    <ReviewCard key={review.id} {...review} isManager={true} />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p>No in-progress reviews found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {completedReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedReviews.map((review) => (
                    <ReviewCard key={review.id} {...review} isManager={true} />
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p>No completed reviews found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerPortal;
