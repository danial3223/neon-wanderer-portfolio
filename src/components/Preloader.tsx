
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo appearance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.5, rotationY: 180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 1, ease: 'back.out(1.7)' }
    );

    // Animate progress bar
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      {
        width: '100%',
        duration: 2.5,
        ease: 'power2.out',
        onComplete: () => {
          // Hide preloader and show main content
          gsap.to(preloaderRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              if (preloaderRef.current) {
                preloaderRef.current.style.display = 'none';
              }
              
              // Trigger main content animations
              gsap.from('.hero-content', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power2.out',
                delay: 0.2,
              });
            },
          });
        },
      }
    );
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-10 text-6xl md:text-8xl font-bold mb-8"
      >
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Peerzada
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50"
        ></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-white/60 font-light tracking-wider">Loading Experience...</p>
    </div>
  );
};

export default Preloader;
