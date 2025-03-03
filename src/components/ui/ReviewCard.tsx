
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

type ReviewStatus = 'pending' | 'in-progress' | 'completed';

interface ReviewCardProps {
  id: string;
  title: string;
  employeeName?: string;
  quarter: string;
  year: number;
  dueDate: string;
  status: ReviewStatus;
  progress: number;
  isManager?: boolean;
}

const ReviewCard = ({
  id,
  title,
  employeeName,
  quarter,
  year,
  dueDate,
  status,
  progress,
  isManager = false
}: ReviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: ReviewStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 33) return 'bg-red-500';
    if (progress < 67) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              {isManager && employeeName && (
                <>
                  <User size={14} className="mr-1" />
                  <span className="mr-3">{employeeName}</span>
                </>
              )}
              <Calendar size={14} className="mr-1" />
              <span>Due {dueDate}</span>
            </CardDescription>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status.replace('-', ' ')}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {quarter} {year}
            </span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className={getProgressColor(progress)} />
          
          <div className="pt-2">
            <Link to={isManager ? `/manager/review/${id}` : `/employee/review/${id}`}>
              <Button 
                variant="outline" 
                className={`w-full group transition-all ${isHovered ? 'bg-primary/5' : ''}`}
              >
                <span className="mr-2">
                  {status === 'completed' ? 'View Review' : status === 'in-progress' ? 'Continue Review' : 'Start Review'}
                </span>
                <ChevronRight 
                  size={16} 
                  className={`transition-transform ${isHovered ? 'transform translate-x-1' : ''}`} 
                />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
