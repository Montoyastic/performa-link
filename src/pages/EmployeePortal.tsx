
import { useState, useEffect } from "react";
import ReviewCard from "@/components/ui/ReviewCard";
import StatsCard from "@/components/ui/StatsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CheckCircle, Clock, Star, Zap } from "lucide-react";

const EmployeePortal = () => {
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Employee Portal</h1>
        <p className="text-muted-foreground">Manage your performance reviews</p>
      </div>

      {/* Performance summary */}
      <Card className={`mb-8 overflow-hidden transition-all duration-500 ${
        isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}>
        <CardHeader className="bg-primary/5">
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>
            Overview of your performance metrics for the current quarter
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Overall Rating</span>
              <div className="flex items-center">
                <span className="text-2xl font-semibold mr-2">4.2</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                  <Star size={16} className="fill-primary/20 text-primary" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">Based on last review</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Goals Completed</span>
              <span className="text-2xl font-semibold">7/10</span>
              <span className="text-xs text-muted-foreground mt-1">70% completion rate</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Strengths</span>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Communication</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Teamwork</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Problem Solving</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Development Areas</span>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full">Time Management</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full">Technical Skills</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Pending Self-Reviews"
          value="1"
          icon={<Clock className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-100 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Completed Reviews"
          value="2"
          trend={{ value: 50, isPositive: true }}
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-200 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
        <StatsCard
          title="Performance Growth"
          value="+12%"
          description="Year-over-year improvement"
          icon={<Zap className="h-5 w-5 text-primary" />}
          className={`transition-all duration-500 delay-300 ${
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        />
      </div>

      {/* Reviews Tabs */}
      <Card className={`transition-all duration-500 delay-400 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}>
        <CardHeader>
          <CardTitle>My Performance Reviews</CardTitle>
          <CardDescription>
            View and complete your performance reviews
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
                    <ReviewCard key={review.id} {...review} />
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
                    <ReviewCard key={review.id} {...review} />
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
                    <ReviewCard key={review.id} {...review} />
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

export default EmployeePortal;
