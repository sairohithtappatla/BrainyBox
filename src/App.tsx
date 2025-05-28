import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleLoading from "./components/SimpleLoading";
import { createLazyComponent } from "./components/LazyWrapper";
import { ScrollProvider } from "./context/ScrollContext";
// Lazy load pages with balanced loading times
const Index = createLazyComponent(
  () => import("./pages/Index"),
  {
    text: "Loading Home...",
    minLoadingTime: 1000 // Increased from 600ms to 1000ms
  }
);

const Projects = createLazyComponent(
  () => import("./pages/Projects"),
  {
    text: "Loading Projects...",
    minLoadingTime: 1000 // Increased from 600ms to 1000ms
  }
);

function App() {
  return (
    <Router>
      <ScrollProvider>
        {/* Wrap the entire app in ScrollProvider for consistent scroll context */}
      <Suspense fallback={<SimpleLoading text="Initializing..." />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Suspense>
      </ScrollProvider>
    </Router>
  );
}

export default App;
