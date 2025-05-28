// filepath: src/components/Header.tsx
import { useState, useEffect, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './theme-provider';
import Background3D from './ui/Background3D';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string, label: string) => {
    if (label === 'Home') {
      // Always handle Home button click properly
      if (location.pathname !== '/') {
        // If not on home page, navigate to home
        navigate('/');
      } else {
        // If already on home page, scroll to top
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
        
        // Also ensure we're at the home section
        setTimeout(() => {
          const homeElement = document.querySelector('#home');
          if (homeElement) {
            homeElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (label === 'Projects') {
      navigate('/projects');
    } else {
      // For anchor links (About, Solutions, Contact)
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first, then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href); // FIXED: removed '#home'+
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300); // Increased timeout to ensure page loads
      } else {
        // If on home page, just scroll to the section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '/projects', label: 'Projects' }, // Changed to route for clarity
    { href: '#solutions', label: 'Solutions' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Enhanced Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-background/90 dark:bg-background/95 border-b border-border/30 dark:border-border/20'
        : 'bg-transparent border-b border-transparent'
        } backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo - Enhanced with Dark Theme - FIXED: Added proper Home navigation */}
            <button
              onClick={() => handleNavigation('#home', 'Home')}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-coral via-raspberry to-coral bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ lineHeight: '3.5rem' }}
            >
              BrainyBox
            </button>

            {/* Desktop Navigation - Enhanced with Better Hover */}
            <ul className="hidden lg:flex list-none gap-10 xl:gap-12 items-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavigation(item.href, item.label)}
                    className="relative text-foreground/85 hover:text-coral dark:text-foreground/90 dark:hover:text-coral text-lg font-semibold transition-all duration-300 py-2 px-1 group"
                  >
                    {item.label}
                    {/* Enhanced hover underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-coral to-raspberry transition-all duration-300 group-hover:w-full rounded-full"></span>
                    {/* Subtle glow effect on hover */}
                    <span className="absolute inset-0 bg-coral/10 dark:bg-coral/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Controls - Enhanced */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Theme Toggle - Enhanced */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative overflow-hidden hover:bg-coral/15 dark:hover:bg-coral/25 hover:scale-110 h-11 w-11 transition-all duration-300"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
              </Button>

              {/* Get Started Button - Enhanced */}
              <Button
                onClick={() => handleNavigation('#contact', 'Contact')}
                className="hidden sm:inline-flex bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-6 py-3 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_50px_rgba(226,109,90,0.4)] dark:hover:shadow-[0_15px_50px_rgba(226,109,90,0.6)] rounded-lg"
              >
                Get Started
              </Button>

              {/* Mobile Menu Toggle - Enhanced */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-coral/15 dark:hover:bg-coral/25 hover:scale-110 h-11 w-11 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 ${isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
            } bg-background/95 dark:bg-background/98 backdrop-blur-xl border-t border-border/30 dark:border-border/20`}>
            <div className="px-4 py-6 space-y-5">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    handleNavigation(item.href, item.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-foreground/85 hover:text-coral dark:text-foreground/90 dark:hover:text-coral text-lg font-semibold transition-all duration-300 py-3 px-2 hover:bg-coral/10 dark:hover:bg-coral/20 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  handleNavigation('#contact', 'Contact');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-lg mt-6"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Only show on home page */}
      {location.pathname === '/' && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
          {/* Enhanced Background Layer with vibrant dark theme */}
          <div className="absolute inset-0">
            <Background3D />
            {/* Enhanced animated gradient overlay for dark theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-coral/8 via-transparent to-raspberry/8 dark:from-coral/20 dark:via-transparent dark:to-raspberry/20" />
            {/* More vibrant floating orbs for dark theme */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-coral/10 dark:bg-coral/25 rounded-full blur-3xl animate-float opacity-60 dark:opacity-90" />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-raspberry/10 dark:bg-raspberry/25 rounded-full blur-3xl animate-float opacity-60 dark:opacity-90" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/6 w-40 h-40 bg-lavender/20 dark:bg-lavender/40 rounded-full blur-2xl animate-bounce-gentle opacity-40 dark:opacity-80" style={{ animationDelay: '1s' }} />
          </div>

          {/* Enhanced gradient overlay for better text contrast in dark theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/15 to-background/35 dark:from-black/60 dark:via-black/10 dark:to-black/30" />

          {/* Hero Content - No Bottom Padding */}
          <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8 text-center pt-28 sm:pt-32">
            {/* Enhanced Badge with Dark Theme Support */}
            <div className="inline-flex items-center gap-3 bg-coral/25 dark:bg-coral/35 border-2 border-coral/50 dark:border-coral/60 px-6 py-3 rounded-full mb-10 sm:mb-14 text-base font-bold text-coral dark:text-coral shadow-xl dark:shadow-2xl backdrop-blur-md animate-fade-in-up hover:scale-105 transition-transform duration-300">
              <span className="text-lg animate-bounce-gentle">🚀</span>
              <span className="text-coral dark:text-coral font-bold">Enterprise-Grade CSE Solutions</span>
            </div>

            {/* Enhanced Hero Title with Better Dark Theme */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-10 sm:mb-14 leading-[1.1] tracking-tight animate-fade-in-up animate-delay-100 text-foreground dark:text-foreground">
              Premium{' '}
              <span className="bg-gradient-to-r from-coral via-raspberry to-coral bg-clip-text text-transparent animate-pulse">
                Source Code
              </span>
              <br />
              <span className="text-foreground dark:text-foreground">Solutions for Developers</span>
            </h1>

            {/* Enhanced Subtitle with Dark Theme */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground/90 dark:text-muted-foreground mb-14 sm:mb-18 max-w-5xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200 font-medium">
              Transform your development workflow with{' '}
              <span className="text-coral dark:text-coral font-semibold hover:scale-105 inline-block transition-transform duration-300">battle-tested projects</span>,{' '}
              comprehensive documentation, and{' '}
              <span className="text-raspberry dark:text-raspberry font-semibold hover:scale-105 inline-block transition-transform duration-300">production-ready code</span>{' '}
              that scales with your vision.
            </p>

            {/* Enhanced CTA Buttons with Better Spacing */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center animate-fade-in-up animate-delay-300 mb-16 sm:mb-20">
              <Button 
                onClick={() => navigate('/projects')}
                className="w-full sm:w-auto bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-12 py-6 text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-[0_25px_80px_rgba(226,109,90,0.4)] dark:hover:shadow-[0_25px_80px_rgba(226,109,90,0.6)] rounded-xl shadow-lg group"
              >
                <span className="mr-3 text-xl group-hover:animate-bounce">🔥</span>
                Explore Projects
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-background/80 dark:bg-background/90 backdrop-blur-md border-2 border-border/50 dark:border-border/60 hover:bg-background/90 dark:hover:bg-background/95 hover:border-border/70 dark:hover:border-border/80 px-12 py-6 text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:scale-110 rounded-xl shadow-lg group"
              >
                <span className="mr-3 text-xl group-hover:animate-pulse">▶️</span>
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Features Grid with Creative Animations - Last Element */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto animate-fade-in-up animate-delay-400">
              <div className="group bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-8 border border-border/40 dark:border-border/50 hover:border-coral/50 dark:hover:border-coral/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:rotate-1 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent dark:from-coral/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">📚</div>
                  <h3 className="font-bold text-xl mb-3 text-foreground dark:text-foreground group-hover:text-coral dark:group-hover:text-coral transition-colors duration-300">Complete Documentation</h3>
                  <p className="text-muted-foreground dark:text-muted-foreground text-sm leading-relaxed">Step-by-step guides and comprehensive API references for seamless integration</p>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-coral rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-ping"></div>
              </div>

              <div className="group bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-8 border border-border/40 dark:border-border/50 hover:border-raspberry/50 dark:hover:border-raspberry/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:-rotate-1 cursor-pointer relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-raspberry/5 to-transparent dark:from-raspberry/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">🏗️</div>
                  <h3 className="font-bold text-xl mb-3 text-foreground dark:text-foreground group-hover:text-raspberry dark:group-hover:text-raspberry transition-colors duration-300">Scalable Architecture</h3>
                  <p className="text-muted-foreground dark:text-muted-foreground text-sm leading-relaxed">Enterprise-grade code structure designed for growth and maintainability</p>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-raspberry rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>

              <div className="group bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-8 border border-border/40 dark:border-border/50 hover:border-coral/50 dark:hover:border-coral/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:rotate-1 cursor-pointer relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent dark:from-coral/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">🚀</div>
                  <h3 className="font-bold text-xl mb-3 text-foreground dark:text-foreground group-hover:text-coral dark:group-hover:text-coral transition-colors duration-300">Production Ready</h3>
                  <p className="text-muted-foreground dark:text-muted-foreground text-sm leading-relaxed">Deploy immediately with confidence using battle-tested solutions</p>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-coral rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}