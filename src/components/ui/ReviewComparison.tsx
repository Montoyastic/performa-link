
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";

interface ReviewComparisonProps {
  reviewId: string;
  employeeName: string;
  employeePosition: string;
  reviewPeriod: string;
  employeeReview: Record<string, any>;
  managerReview: Record<string, any>;
  reviewCategories: Array<{
    id: string;
    title: string;
    description: string;
    type: 'textarea' | 'rating' | 'slider';
  }>;
}

const ReviewComparison: React.FC<ReviewComparisonProps> = ({
  reviewId,
  employeeName,
  employeePosition,
  reviewPeriod,
  employeeReview,
  managerReview,
  reviewCategories
}) => {
  const navigate = useNavigate();
  const pdfRef = useRef<HTMLDivElement>(null);
  const { toPDF, targetRef } = usePDF({
    filename: `${employeeName.replace(/\s+/g, '_')}_Performance_Review_${reviewPeriod.replace(/\s+/g, '_')}.pdf`,
  });
  
  const getRatingLabel = (value: string) => {
    switch (value) {
      case "exceeds": return "Exceeds Expectations";
      case "meets": return "Meets Expectations";
      case "development": return "Development Needed";
      case "unsatisfactory": return "Unsatisfactory";
      default: return value;
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <Button onClick={() => toPDF()} className="bg-primary">
          <Download size={16} className="mr-2" />
          Download PDF
        </Button>
      </div>
      
      <div ref={targetRef} className="p-6 bg-white">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Performance Review Comparison</h1>
          <p className="text-lg text-muted-foreground">{employeeName} • {employeePosition}</p>
          <p className="text-md text-muted-foreground">Review Period: {reviewPeriod}</p>
        </div>
        
        {reviewCategories.map((category) => (
          <Card key={category.id} className="mb-6 border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-primary">Employee Assessment</h3>
                  {category.type === 'textarea' ? (
                    <p className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">
                      {employeeReview[category.id] || "No response provided"}
                    </p>
                  ) : category.type === 'rating' ? (
                    <p className="bg-gray-50 p-3 rounded text-sm">
                      {employeeReview[category.id] ? getRatingLabel(employeeReview[category.id]) : "No rating provided"}
                    </p>
                  ) : (
                    <p className="bg-gray-50 p-3 rounded text-sm">
                      Satisfaction Level: {employeeReview[category.id] || "Not rated"}/10
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-blue-600">Manager Assessment</h3>
                  {category.type === 'textarea' ? (
                    <p className="bg-blue-50 p-3 rounded text-sm whitespace-pre-wrap">
                      {managerReview[category.id] || "No response provided"}
                    </p>
                  ) : category.type === 'rating' ? (
                    <p className="bg-blue-50 p-3 rounded text-sm">
                      {managerReview[category.id] ? getRatingLabel(managerReview[category.id]) : "No rating provided"}
                    </p>
                  ) : (
                    <p className="bg-blue-50 p-3 rounded text-sm">
                      Satisfaction Level: {managerReview[category.id] || "Not rated"}/10
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewComparison;
