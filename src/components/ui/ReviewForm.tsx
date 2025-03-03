import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronLeft, ChevronRight, Save, FileText } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ReviewCategory {
  id: string;
  title: string;
  description: string;
  type: 'textarea' | 'rating' | 'slider';
}

interface ReviewFormProps {
  isManager?: boolean;
  employeeName?: string;
  employeePosition?: string;
  reviewPeriod?: string;
  reviewId?: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  isManager = false,
  employeeName = "Your",
  employeePosition = "Position",
  reviewPeriod = "Q2 2023",
  reviewId = "1",
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isReviewComplete, setIsReviewComplete] = useState(false);
  const [otherReviewExists, setOtherReviewExists] = useState(false);
  const navigate = useNavigate();

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
      description: isManager 
        ? "Provide an overall assessment of the employee's performance." 
        : "Provide an overall assessment of your performance.",
      type: "textarea",
    }
  ];

  useEffect(() => {
    const mockCheckOtherReview = () => {
      setTimeout(() => {
        const otherExists = Math.random() > 0.5;
        setOtherReviewExists(otherExists);
        
        const isComplete = localStorage.getItem(`review_${reviewId}_${isManager ? 'manager' : 'employee'}`);
        if (isComplete) {
          setIsReviewComplete(true);
          setFormValues(JSON.parse(isComplete));
        }
      }, 1000);
    };
    
    mockCheckOtherReview();
  }, [reviewId, isManager]);

  const handleChange = (id: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < reviewCategories.length - 1) {
      setCurrentStep(currentStep + 1);
      document.getElementById('review-form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      document.getElementById('review-form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSave = () => {
    localStorage.setItem(`review_${reviewId}_${isManager ? 'manager' : 'employee'}`, JSON.stringify(formValues));
    console.log('Form values:', formValues);
    toast.success("Review saved successfully!");
  };

  const handleSubmit = () => {
    localStorage.setItem(`review_${reviewId}_${isManager ? 'manager' : 'employee'}`, JSON.stringify(formValues));
    console.log('Form submitted:', formValues);
    setIsReviewComplete(true);
    toast.success("Review submitted successfully!");
  };

  const handleViewComparison = () => {
    navigate(`/review/comparison/${reviewId}`);
  };

  const currentCategory = reviewCategories[currentStep];
  const progress = ((currentStep + 1) / reviewCategories.length) * 100;

  if (isReviewComplete) {
    return (
      <div id="review-form-top" className="w-full max-w-3xl mx-auto">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <Check size={24} className="mr-2" />
              Review Completed
            </CardTitle>
            <CardDescription>
              {isManager 
                ? `You have completed your review for ${employeeName}.` 
                : `You have completed your self-assessment.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              {otherReviewExists 
                ? "Both reviews have been submitted. You can now view the comparison between the self-assessment and manager review."
                : `Your review has been submitted. ${isManager ? "Waiting for employee self-assessment." : "Waiting for manager review."}`
              }
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Button 
                variant="outline" 
                onClick={() => setIsReviewComplete(false)}
              >
                View My Responses
              </Button>
              
              {otherReviewExists && (
                <Button onClick={handleViewComparison} className="bg-green-600 hover:bg-green-700">
                  <FileText size={16} className="mr-2" />
                  View Comparison Report
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div id="review-form-top" className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">
            {isManager ? `Review for ${employeeName}` : `${employeeName} Performance Review`}
          </h1>
          <p className="text-muted-foreground">
            {employeePosition} • {reviewPeriod}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Save
          </Button>
          <Button size="sm" onClick={handleSubmit}>Submit Review</Button>
        </div>
      </div>

      <div className="w-full bg-secondary rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Card className="mb-6 transition-all duration-300 animate-fade-in">
        <CardHeader>
          <CardTitle>{currentCategory.title}</CardTitle>
          <CardDescription>{currentCategory.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentCategory.type === 'textarea' && (
            <Textarea
              placeholder="Enter your response here..."
              className="min-h-[150px]"
              value={formValues[currentCategory.id] || ''}
              onChange={(e) => handleChange(currentCategory.id, e.target.value)}
            />
          )}

          {currentCategory.type === 'rating' && (
            <RadioGroup
              value={formValues[currentCategory.id] || ''}
              onValueChange={(value) => handleChange(currentCategory.id, value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exceeds" id={`${currentCategory.id}-exceeds`} />
                <Label htmlFor={`${currentCategory.id}-exceeds`} className="flex-1">
                  <span className="font-medium">Exceeds Expectations</span>
                  <p className="text-sm text-muted-foreground">Consistently performs above expected standards</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="meets" id={`${currentCategory.id}-meets`} />
                <Label htmlFor={`${currentCategory.id}-meets`} className="flex-1">
                  <span className="font-medium">Meets Expectations</span>
                  <p className="text-sm text-muted-foreground">Fulfills all job requirements effectively</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="development" id={`${currentCategory.id}-development`} />
                <Label htmlFor={`${currentCategory.id}-development`} className="flex-1">
                  <span className="font-medium">Development Needed</span>
                  <p className="text-sm text-muted-foreground">Areas for improvement identified</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsatisfactory" id={`${currentCategory.id}-unsatisfactory`} />
                <Label htmlFor={`${currentCategory.id}-unsatisfactory`} className="flex-1">
                  <span className="font-medium">Unsatisfactory</span>
                  <p className="text-sm text-muted-foreground">Performance below expected standards</p>
                </Label>
              </div>
            </RadioGroup>
          )}

          {currentCategory.type === 'slider' && (
            <div className="space-y-5">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Not Satisfied</span>
                <span className="text-sm text-muted-foreground">Very Satisfied</span>
              </div>
              <Slider
                defaultValue={[formValues[currentCategory.id] || 5]}
                max={10}
                step={1}
                onValueChange={([value]) => handleChange(currentCategory.id, value)}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <span key={number}>{number}</span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentStep === 0}
        >
          <ChevronLeft size={16} className="mr-2" />
          Previous
        </Button>
        
        {currentStep < reviewCategories.length - 1 ? (
          <Button onClick={handleNext}>
            Next
            <ChevronRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            <Check size={16} className="mr-2" />
            Complete Review
          </Button>
        )}
      </div>

      <div className="sm:hidden flex items-center gap-2 mb-6">
        <Button variant="outline" className="flex-1" onClick={handleSave}>
          <Save size={16} className="mr-2" />
          Save
        </Button>
        <Button className="flex-1" onClick={handleSubmit}>Submit Review</Button>
      </div>
    </div>
  );
};

export default ReviewForm;
