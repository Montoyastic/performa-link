
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewForm from "@/components/ui/ReviewForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const ReviewFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    isManager: false,
    employeeName: "",
    employeePosition: "",
    reviewPeriod: "",
  });

  useEffect(() => {
    // Determine if this is a manager review based on the URL
    const isManager = window.location.pathname.includes("/manager/");
    
    // Mock fetching review data
    setTimeout(() => {
      // This would normally come from an API call
      const mockData = {
        isManager,
        employeeName: isManager ? "Jane Smith" : "Your",
        employeePosition: "Senior Developer",
        reviewPeriod: "Q2 2023",
      };
      
      setReviewData(mockData);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading review...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={handleGoBack}
        className="mb-6 hover:bg-transparent hover:text-primary"
      >
        <ChevronLeft size={16} className="mr-1" />
        Back
      </Button>

      <ReviewForm
        isManager={reviewData.isManager}
        employeeName={reviewData.employeeName}
        employeePosition={reviewData.employeePosition}
        reviewPeriod={reviewData.reviewPeriod}
      />
    </div>
  );
};

export default ReviewFormPage;
