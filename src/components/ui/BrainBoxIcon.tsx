import React from 'react';

const BrainBoxIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} relative inline-block`}>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Box Base (Always visible) */}
        <rect
          x="30"
          y="60"
          width="60"
          height="42"
          fill="url(#boxGradient)"
          stroke="#8B4513"
          strokeWidth="2.5"
          rx="4"
        />
        
        {/* Box Front Panel Lines */}
        <line x1="36" y1="66" x2="84" y2="66" stroke="#A0522D" strokeWidth="1.5" opacity="0.7" />
        <line x1="36" y1="90" x2="84" y2="90" stroke="#A0522D" strokeWidth="1.5" opacity="0.7" />
        
        {/* Box Tape (Disappears when opening) */}
        <rect
          x="48"
          y="57"
          width="24"
          height="5"
          fill="#FFD700"
          rx="2.5"
          className="animate-tape-fade"
        />
        
        {/* Left Box Flap - Opens Left */}
        <rect
          x="30"
          y="54"
          width="30"
          height="12"
          fill="url(#flapLightGradient)"
          stroke="#8B4513"
          strokeWidth="1.5"
          rx="2"
          style={{ transformOrigin: '45px 60px' }}
          className="animate-flap-left"
        />
        
        {/* Right Box Flap - Opens Right */}
        <rect
          x="60"
          y="54"
          width="30"
          height="12"
          fill="url(#flapDarkGradient)"
          stroke="#8B4513"
          strokeWidth="1.5"
          rx="2"
          style={{ transformOrigin: '75px 60px' }}
          className="animate-flap-right"
        />
        
        {/* Brain Emoji Emerging from Box */}
        <foreignObject 
          x="45" 
          y="25" 
          width="30" 
          height="30" 
          className="animate-brain-emerge"
          style={{ transformOrigin: '60px 40px' }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-2xl">🧠</span>
          </div>
        </foreignObject>
        
        {/* Code Elements Floating Around */}
        <g className="animate-code-float">
          <text x="18" y="35" fontSize="9" fill="url(#codeGradient)" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
          <text x="96" y="40" fontSize="8" fill="url(#codeGradient)" fontFamily="monospace" fontWeight="bold">{}</text>
          <text x="14" y="85" fontSize="7" fill="url(#codeGradient)" fontFamily="monospace" fontWeight="bold">[]</text>
          <text x="100" y="80" fontSize="8" fill="url(#codeGradient)" fontFamily="monospace" fontWeight="bold">()</text>
        </g>
        
        {/* Sparkle Effects */}
        <circle cx="24" cy="24" r="1.5" fill="#FFD700" className="animate-twinkle" />
        <circle cx="96" cy="30" r="2" fill="#FFD700" className="animate-twinkle" style={{ animationDelay: '1s' }} />
        <circle cx="102" cy="96" r="1.5" fill="#FFD700" className="animate-twinkle" style={{ animationDelay: '2s' }} />
        <circle cx="18" cy="96" r="2" fill="#FFD700" className="animate-twinkle" style={{ animationDelay: '1.5s' }} />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DEB887" />
            <stop offset="50%" stopColor="#D2B48C" />
            <stop offset="100%" stopColor="#CD853F" />
          </linearGradient>
          
          <linearGradient id="flapLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5DEB3" />
            <stop offset="100%" stopColor="#DEB887" />
          </linearGradient>
          
          <linearGradient id="flapDarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CD853F" />
            <stop offset="100%" stopColor="#A0522D" />
          </linearGradient>
          
          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E26D5A" />
            <stop offset="50%" stopColor="#C4405B" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BrainBoxIcon;