
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheck, BarChart3, Users, Star, Clock, Shield } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      title: "Streamlined Reviews",
      description:
        "Simplify your quarterly performance review process with intuitive forms and templates.",
      icon: <ClipboardCheck className="h-8 w-8 text-primary" />,
    },
    {
      title: "Insightful Analytics",
      description:
        "Track performance trends and gain valuable insights with powerful analytics dashboards.",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
    },
    {
      title: "360° Feedback",
      description:
        "Gather comprehensive feedback from managers, peers, and self-evaluations.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Goal Tracking",
      description:
        "Set, track, and evaluate progress on individual and team performance goals.",
      icon: <Star className="h-8 w-8 text-primary" />,
    },
    {
      title: "Time-Saving Automation",
      description:
        "Automate reminders, form distribution, and reporting to save valuable time.",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
    {
      title: "Secure & Confidential",
      description:
        "Ensure all review data is securely stored and accessible only to authorized personnel.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const featuresElements = document.querySelectorAll(".feature-card");
    featuresElements.forEach((el) => observer.observe(el));

    return () => {
      featuresElements.forEach((el) => observer.unobserve(el));
    };
  }, [visibleItems]);

  return (
    <section id="features" className="py-16 sm:py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful features to enhance your review process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to make performance reviews more effective,
            efficient, and meaningful.
          </p>
        </div>

        <div 
          ref={featuresRef}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`feature-card transition-all duration-500 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-index={index}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-start">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
