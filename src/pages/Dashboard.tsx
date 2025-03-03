
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatsCard from "@/components/ui/StatsCard";
import ReviewCard from "@/components/ui/ReviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Clock, ClipboardCheck, User, Users } from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for reviews
  const pendingReviews = [
    {
      id: "1",
      title: "Quarterly Performance Review",
      quarter: "Q2",
      year: 2023,
      dueDate: "July 15, 2023",
      status: "pending" as const,
      progress: 0,
    },
  ];

  const inProgressReviews = [
    {
      id: "2",
      title: "Quarterly Performance Review",
      quarter: "Q1",
      year: 2023,
      dueDate: "April 15, 2023",
      status: "in-progress" as const,
      progress: 60,
    },
  ];

  const completedReviews = [
    {
      id: "3",
      title: "Quarterly Performance Review",
      quarter: "Q4",
      year: 2022,
      dueDate: "January 15, 2023",
      status: "completed" as const,
      progress: 100,
    },
    {
      id: "4",
      title: "Quarterly Performance Review",
      quarter: "Q3",
      year: 2022,
      dueDate: "October 15, 2022",
      status: "completed" as const,
      progress: 100,
    },
  ];

  // Manager-specific reviews (employees to review)
  const managerReviews = [
    {
      id: "5",
      title: "Quarterly Performance Review",
      employeeName: "Jane Smith",
      quarter: "Q2",
      year: 2023,
      dueDate: "July 15, 2023",
      status: "pending" as const,
      progress: 0,
    },
    {
      id: "6",
      title: "Quarterly Performance Review",
      employeeName: "John Doe",
      quarter: "Q2",
      year: 2023,
      dueDate: "July 15, 2023",
      status: "in-progress" as const,
      progress: 30,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex Morgan</p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/employee/portal")}
          >
            <User size={16} className="mr-2" />
            Employee Portal
          </Button>
          <Button onClick={() => navigate("/manager/portal")}>
            <Users size={16} className="mr-2" />
            Manager Portal
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Pending Reviews"
          value="1"
          icon={<Clock className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-100 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Reviews In Progress"
          value="1"
          icon={<ClipboardCheck className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-200 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Completed Reviews"
          value="2"
          trend={{ value: 50, isPositive: true }}
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-300 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Team Reviews (Manager)"
          value="2"
          description="Reviews to complete as manager"
          icon={<Users className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-400 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
      </div>

      {/* Reviews Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="manager">Manager Reviews</TabsTrigger>
        </TabsList>

        <TabsContent 
          value="pending" 
          className={`transition-all duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {pendingReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingReviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p>No pending reviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent 
          value="in-progress"
          className={`transition-all duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {inProgressReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressReviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p>No in-progress reviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent 
          value="completed"
          className={`transition-all duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {completedReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedReviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p>No completed reviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent 
          value="manager"
          className={`transition-all duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Team Reviews</CardTitle>
              <CardDescription>
                Performance reviews to complete as a manager
              </CardDescription>
            </CardHeader>
          </Card>
          {managerReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managerReviews.map((review) => (
                <ReviewCard key={review.id} {...review} isManager={true} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p>No manager reviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
