import { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '@/components/theme-provider';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  size: number;
  color: string;
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number>();

  // Memoize colors based on theme
  const colors = useMemo(() => ({
    primary: theme === 'dark' ? '226, 109, 90' : '195, 7, 63',
    secondary: theme === 'dark' ? '195, 7, 63' : '226, 109, 90',
    accent: theme === 'dark' ? '255, 255, 255' : '244, 241, 187' // Brighter accent for dark theme
  }), [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 75 : 150; // Fewer particles on mobile

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      vz: Math.random() * 3 + 1,
      life: 1,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? colors.primary : colors.secondary
    });

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        // Reset particle if it goes off screen
        if (particle.z <= 0 ||
          particle.x < -50 || particle.x > canvas.width + 50 ||
          particle.y < -50 || particle.y > canvas.height + 50) {
          particles[index] = createParticle();
          return;
        }

        // Calculate size and opacity based on z-depth
        const scale = 1000 / (1000 + particle.z);
        const size = scale * particle.size * 2;
        const opacity = Math.min(scale * 0.8, 1);

        // Draw particle with improved gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 3
        );

        gradient.addColorStop(0, `rgba(${particle.color}, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(${colors.accent}, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections (optimized)
        particles.forEach((otherParticle, otherIndex) => {
          if (index < otherIndex && index % 3 === 0) { // Reduce connection calculations
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const lineOpacity = (120 - distance) / 120 * 0.15;
              ctx.strokeStyle = `rgba(${colors.primary}, ${lineOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}