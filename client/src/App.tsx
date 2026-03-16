import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { Suspense } from "react";
import Home from "@/pages/home";

const Contact = React.lazy(() => import("@/pages/contact"));
const Locations = React.lazy(() => import("@/pages/locations"));
const LocationPage = React.lazy(() => import("@/pages/location"));
const UseCasePage = React.lazy(() => import("@/pages/use-case"));
const TraditionalVending = React.lazy(() => import("@/pages/traditional-vending"));
const PrivacyPolicy = React.lazy(() => import("@/pages/privacy-policy"));
const CookiePolicy = React.lazy(() => import("@/pages/cookie-policy"));
const NotFound = React.lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner" /></div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/locations" component={Locations} />
        <Route path="/location/:slug" component={LocationPage} />
        <Route path="/use-cases/:slug" component={UseCasePage} />
        <Route path="/products/traditional-vending" component={TraditionalVending} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
