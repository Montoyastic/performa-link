import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewComparison from "@/components/ui/ReviewComparison";

interface ReviewCategory {
  id: string;
  title: string;
  description: string;
  type: 'textarea' | 'rating' | 'slider';
}

const ReviewComparisonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    employeeName: "",
    employeePosition: "",
    reviewPeriod: "",
    employeeReview: {} as Record<string, any>,
    managerReview: {} as Record<string, any>,
  });

  // Sample review categories - keep in sync with ReviewForm
  const reviewCategories: ReviewCategory[] = [
    {
      id: "performance",
      title: "Performance Goals",
      description: "Evaluate progress towards established performance goals and objectives.",
      type: "textarea",
    },
    {
      id: "achievements",
      title: "Key Achievements",
      description: "List significant accomplishments during the review period.",
      type: "textarea",
    },
    {
      id: "skills",
      title: "Technical Skills",
      description: "Assess technical competencies and skills relevant to the role.",
      type: "rating",
    },
    {
      id: "communication",
      title: "Communication",
      description: "Evaluate effectiveness in verbal and written communication.",
      type: "rating",
    },
    {
      id: "teamwork",
      title: "Teamwork & Collaboration",
      description: "Assess ability to work with others and contribute to team objectives.",
      type: "rating",
    },
    {
      id: "leadership",
      title: "Leadership",
      description: "Evaluate leadership qualities and people management skills.",
      type: "rating",
    },
    {
      id: "satisfaction",
      title: "Overall Job Satisfaction",
      description: "Rate your overall job satisfaction during this review period.",
      type: "slider",
    },
    {
      id: "summary",
      title: "Overall Summary",
      description: "Provide an overall assessment of performance.",
      type: "textarea",
    }
  ];

  useEffect(() => {
    // Mock fetching review data from localStorage (in a real app, this would be an API call)
    setTimeout(() => {
      const employeeReview = localStorage.getItem(`review_${id}_employee`);
      const managerReview = localStorage.getItem(`review_${id}_manager`);
      
      setReviewData({
        employeeName: "Jane Smith",
        employeePosition: "Senior Developer",
        reviewPeriod: "Q2 2023",
        employeeReview: employeeReview ? JSON.parse(employeeReview) : {},
        managerReview: managerReview ? JSON.parse(managerReview) : {},
      });
      
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ReviewComparison 
        reviewId={id || "1"}
        employeeName={reviewData.employeeName}
        employeePosition={reviewData.employeePosition}
        reviewPeriod={reviewData.reviewPeriod}
        employeeReview={reviewData.employeeReview}
        managerReview={reviewData.managerReview}
        reviewCategories={reviewCategories}
      />
    </div>
  );
};

export default ReviewComparisonPage;
