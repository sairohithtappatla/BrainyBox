import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-cream font-inter relative overflow-hidden flex items-center justify-center" id="projects">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-lavender/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-coral/25 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-raspberry/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>

        {/* Parallax Elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cream/5 to-cream/20"></div>
      </div>

      {/* Hero Card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-3xl p-12 max-w-2xl mx-6 text-center shadow-2xl border border-white/50 mt-20">
        <h1 className="font-poppins text-6xl font-bold text-charcoal mb-6 leading-tight">
          <span className="bg-gradient-to-r from-coral to-raspberry bg-clip-text text-transparent">
            BrainyBox
          </span>
        </h1>

        <p className="text-xl text-charcoal/80 mb-8 leading-relaxed font-medium">
          The ultimate student project marketplace where brilliant minds showcase their innovations and connect with fellow creators.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-coral to-raspberry text-white px-8 py-4 rounded-2xl font-poppins font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-coral/90 hover:to-raspberry/90">
            Explore Projects
          </button>
          <button className="bg-white/90 text-charcoal px-8 py-4 rounded-2xl font-poppins font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-coral/30 hover:bg-coral/10">
            Submit Your Project
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-coral rounded-full opacity-60 animate-bounce-gentle"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-raspberry rounded-full opacity-40 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-charcoal/30 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
