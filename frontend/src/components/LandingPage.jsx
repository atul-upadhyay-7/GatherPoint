import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';

export default function LandingPage({ onEnter }) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const enterBtnRef = useRef(null);

  // Background Particle System (Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = Math.random() * 0.4 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulseSpeed = Math.random() * 0.015 + 0.005;
        this.pulseDir = 1;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity > 0.7) this.pulseDir = -1;
        if (this.opacity < 0.1) this.pulseDir = 1;

        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles = Array.from({ length: 60 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Loading simulation
  useEffect(() => {
    // Initial states
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(enterBtnRef.current, { display: 'none', opacity: 0 });

    const tl = gsap.timeline();
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    });

    const loaderObj = { val: 0 };
    gsap.to(loaderObj, {
      val: 100,
      duration: 4.0,
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.floor(loaderObj.val));
      },
      onComplete: () => {
        setLoadingComplete(true);
        
        // Transition loader out, show enter button in center of table
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.6,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none' });
            gsap.set(enterBtnRef.current, { display: 'flex' });
            gsap.fromTo(enterBtnRef.current, 
              { opacity: 0, scale: 0.9, y: 10 },
              { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
            );
          }
        });
      }
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center select-none"
      style={{ 
        backgroundImage: 'url(/landing-bg.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#020403'
      }}
    >
      {/* Interactive Floating Gold Particles Layer */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Main Interactive Content Overlays */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center">
        
        {/* Real Loading bar overlaying mockup loader */}
        <div 
          ref={overlayRef} 
          className="flex flex-col items-center justify-center w-[220px] md:w-[280px] mt-[180px] md:mt-[240px]"
        >
          <span className="font-cinzel text-[9px] md:text-[10px] tracking-[0.35em] text-[#D4AF37]/90 uppercase mb-3 animate-pulse">
            LOADING {progress}%
          </span>
          
          <div className="w-full h-[1.5px] bg-[#D4AF37]/15 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-[#8A6623] via-[#D4AF37] to-[#FFF2B2] shadow-[0_0_6px_#D4AF37] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Mask to cover the static mockup "ENTER TERMINAL" button in the center of the table */}
        <div className="absolute w-[180px] md:w-[220px] h-[36px] md:h-[44px] bg-[#0c1510] rounded-full blur-[2px] pointer-events-none mt-[70px] md:mt-[90px]" />

        {/* Real interactive "ENTER SYSTEM" button which glows and responds to hover, positioned below the subtitle text */}
        <div className="absolute w-[220px] md:w-[280px] mt-[180px] md:mt-[240px] flex justify-center">
          <button
            ref={enterBtnRef}
            onClick={onEnter}
            className="hidden items-center justify-center gap-2 px-8 py-3 rounded-full bg-black/90 border border-[#D4AF37] text-[#D4AF37] font-cinzel text-[11px] tracking-[0.25em] font-semibold uppercase hover:bg-[#D4AF37] hover:text-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-500 transform hover:scale-105 active:scale-95 group cursor-pointer"
          >
            ENTER TERMINAL
            <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
}
