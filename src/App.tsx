import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Index from "./pages/Index";
import CitiesList from "./pages/CitiesList";
import CityVenues from "./pages/CityVenues";
import VenuePage from "./pages/VenuePage";
import NotFound from "./pages/NotFound";
import LanguageRouter from "./components/LanguageRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/:lang" element={<Index />} />
              <Route path="/:lang/cities" element={<CitiesList />} />
              <Route path="/:lang/المدن" element={<CitiesList />} />
              <Route path="/:lang/villes" element={<CitiesList />} />
              <Route path="/:lang/ciudades" element={<CitiesList />} />
              <Route path="/:lang/cities/:citySlug" element={<CityVenues />} />
              <Route path="/:lang/المدن/:citySlug" element={<CityVenues />} />
              <Route path="/:lang/villes/:citySlug" element={<CityVenues />} />
              <Route path="/:lang/ciudades/:citySlug" element={<CityVenues />} />
              <Route path="/:lang/cities/:citySlug/:venueSlug" element={<VenuePage />} />
              <Route path="/:lang/المدن/:citySlug/:venueSlug" element={<VenuePage />} />
              <Route path="/:lang/villes/:citySlug/:venueSlug" element={<VenuePage />} />
              <Route path="/:lang/ciudades/:citySlug/:venueSlug" element={<VenuePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </LanguageRouter>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
