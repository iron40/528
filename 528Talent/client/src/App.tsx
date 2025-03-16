import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Candidates from "@/pages/candidates";
import ManageCandidates from "@/pages/manage-candidates";
import Subscription from "@/pages/subscription";
import Contact from "@/pages/contact";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CompanyDashboard from "@/pages/company-dashboard";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/candidates" component={Candidates} />
          <Route path="/manage-candidates" component={ManageCandidates} />
          <Route path="/company-dashboard" component={CompanyDashboard} />
          <Route path="/subscription" component={Subscription} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;