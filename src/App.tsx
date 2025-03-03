
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import EmployeePortal from "./pages/EmployeePortal";
import ManagerPortal from "./pages/ManagerPortal";
import ReviewForm from "./pages/ReviewForm";
import ReviewComparison from "./pages/ReviewComparison";
import NotFound from "./pages/NotFound";
import AppShell from "./components/layout/AppShell";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee/portal" element={<EmployeePortal />} />
            <Route path="/employee/review/:id" element={<ReviewForm />} />
            <Route path="/manager/portal" element={<ManagerPortal />} />
            <Route path="/manager/review/:id" element={<ReviewForm />} />
            <Route path="/review/comparison/:id" element={<ReviewComparison />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
