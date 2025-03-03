
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 pb-16 pt-20 sm:pb-24 sm:pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div 
            className={`transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-8">
              <span>Quarterly performance reviews made simple</span>
            </p>
          </div>
          
          <h1 
            className={`mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 transition-transform duration-700 ${
              isVisible ? 'translate-y-0' : 'translate-y-4'
            }`}
          >
            Elevate Performance Through Meaningful Feedback
          </h1>
          
          <p 
            className={`mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Transform quarterly reviews from a dreaded chore into a powerful tool for growth with our 
            intuitive platform designed for both managers and employees.
          </p>
          
          <div 
            className={`mt-8 flex items-center justify-center gap-x-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="group"
              >
                Get Started
                <ChevronRight 
                  size={16} 
                  className="ml-1 transition-transform group-hover:translate-x-1" 
                />
              </Button>
            </Link>
            <Link 
              to="#features" 
              className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div 
        className={`mt-16 sm:mt-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-xl bg-gray-900/5 p-4 ring-1 ring-inset ring-gray-900/10 dark:bg-white/5 dark:ring-white/10 shadow-xl">
              <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-full max-w-2xl px-8">
                    <div className="space-y-4">
                      <div className="h-14 bg-white dark:bg-gray-700 rounded-md shadow-sm animate-pulse" />
                      <div className="h-14 bg-white dark:bg-gray-700 rounded-md shadow-sm animate-pulse" />
                      <div className="h-14 bg-white dark:bg-gray-700 rounded-md shadow-sm animate-pulse" />
                      <div className="h-14 bg-white dark:bg-gray-700 rounded-md shadow-sm animate-pulse" />
                      <div className="flex justify-end mt-6">
                        <div className="w-32 h-10 bg-primary rounded-md animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
