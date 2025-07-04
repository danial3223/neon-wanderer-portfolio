
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 });

    // Hero content animations
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    // Floating background elements
    gsap.to('.glow-orb-1', {
      y: -30,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    gsap.to('.glow-orb-2', {
      y: 25,
      x: -15,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1,
    });

    // CTA button hover animation
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      
      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    }
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute inset-0">
        <div className="glow-orb-1 absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="glow-orb-2 absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="hero-content relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Peerzada Hanan
          </span>
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-white/80 font-light">
            — Wonderer
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed mb-8"
        >
          Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
        </p>

        <button
          ref={ctaRef}
          className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-medium text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
        >
          <span className="relative z-10">Contact Me</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
