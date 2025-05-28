import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SimpleLoading from './components/SimpleLoading'

// Show initial loading screen
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Add a brief initial loading
const AppWithInitialLoading = () => {
  const [showApp, setShowApp] = React.useState(false);

  React.useEffect(() => {
    // Balanced timing - not too fast, not too slow
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 1200); // Increased from 800ms to 1200ms

    return () => clearTimeout(timer);
  }, []);

  if (!showApp) {
    return <SimpleLoading text="Loading BrainyBox..." />;
  }

  return <App />;
};

root.render(
  <React.StrictMode>
    <AppWithInitialLoading />
  </React.StrictMode>,
)
