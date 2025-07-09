
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Futuristic entrance animations
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.8, filter: 'blur(20px)' },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 2, 
          ease: 'power3.out' 
        }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 1.5, 
          ease: 'power2.out' 
        },
        '-=1'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.5, rotationY: 180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotationY: 0, 
          duration: 1.2, 
          ease: 'back.out(2)' 
        },
        '-=0.8'
      );

      // Floating animations for background elements
      gsap.to('.glow-orb-1', {
        y: -30,
        x: 20,
        rotation: 360,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to('.glow-orb-2', {
        y: 25,
        x: -15,
        rotation: -360,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2,
      });

      // Scroll triggered animations
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100, rotationY: -45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = [
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'GSAP', icon: '🎭' },
    { name: 'Three.js', icon: '🎯' },
  ];

  return (
    <>
      {/* Futuristic Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="glow-orb-1 absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="glow-orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          {/* Digital Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Light Streaks */}
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent transform rotate-12"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent transform -rotate-12"></div>
        </div>

        <div className="hero-content relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Futuristic Main Title */}
          <h1
            ref={titleRef}
            className="relative text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight mb-8 tracking-wider"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              textShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)'
            }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent blur-sm"></span>
              <span className="relative bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Hi, I'm
              </span>
            </span>
            <br />
            <span className="relative inline-block">
              {/* Glowing background effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent blur-lg opacity-50"></span>
              <span className="relative bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent font-extrabold">
                Peerzada Hanan
              </span>
              {/* Pixel accent lines */}
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60"></div>
              <div className="absolute -bottom-6 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40"></div>
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-widest relative">
              <span className="relative">
                — Wonderer
                <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </span>
            </span>
          </h1>

          {/* Subtitle with cinematic depth */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/80 font-light max-w-3xl leading-relaxed mb-12 relative"
            style={{
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}
          >
            <span className="relative">
              Crafting <span className="text-cyan-400 font-medium">digital experiences</span> that inspire and engage through 
              <span className="text-blue-400 font-medium"> innovative design</span> and cutting-edge technology.
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-lg blur-xl"></div>
            </span>
          </p>

          {/* Futuristic CTA Button */}
          <button
            ref={ctaRef}
            onClick={handleContactClick}
            className="group relative px-10 py-5 font-semibold text-lg overflow-hidden rounded-xl transition-all duration-500 hover:scale-110"
          >
            {/* Button background layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-0.5">
              <div className="h-full w-full bg-gray-900/50 rounded-xl"></div>
            </div>
            
            {/* Button content */}
            <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
              Contact Me
            </span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
            
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
          </button>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section 
        id="about" 
        ref={sectionRef} 
        className="py-20 px-6 relative" 
        data-scroll-section
      >
        {/* Enhanced Neon Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-3xl blur-3xl animate-pulse"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-cyan-400/3 via-blue-400/3 to-purple-400/3 rounded-2xl blur-2xl"></div>
        <div className="absolute inset-4 bg-gradient-to-r from-cyan-300/2 via-blue-300/2 to-indigo-300/2 rounded-xl blur-xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Profile Image */}
            <div ref={imageRef} className="relative">
              <div className="relative w-80 h-80 mx-auto">
                {/* Multiple glowing rings */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border border-blue-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-4 rounded-full border border-indigo-400/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/40 shadow-2xl shadow-cyan-500/25">
                  <img
                    src="/lovable-uploads/cb42e6bc-89a5-4b90-8234-3b0cef548720.png"
                    alt="Peerzada Hanan"
                    className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-700 ease-out"
                  />
                  {/* Image overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 hover:opacity-50 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* Enhanced Content */}
            <div ref={contentRef} className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white relative">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent blur-sm"></span>
                    <span className="relative bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-200 bg-clip-text text-transparent font-black tracking-wide"
                          style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}>
                      About Me
                    </span>
                  </span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed relative">
                  I'm a passionate developer who specializes in creating <span className="text-cyan-400 font-medium">immersive digital experiences</span>. 
                  With expertise in modern web technologies and a keen eye for design, I bring ideas to life 
                  through <span className="text-blue-400 font-medium">innovative solutions</span> and cutting-edge animations.
                </p>
              </div>

              {/* Enhanced Skills Grid */}
              <div ref={skillsRef} className="space-y-6">
                <h3 className="text-2xl font-semibold text-white relative">
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Skills & Technologies
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-cyan-400/20 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-500 text-center hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-blue-500/5 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Skill card glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-indigo-500/10 rounded-xl transition-all duration-500 blur-sm"></div>
                      
                      <div className="relative z-10">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <p className="text-sm text-white/90 font-medium group-hover:text-cyan-300 transition-colors duration-300">
                          {skill.name}
                        </p>
                      </div>
                      
                      {/* Scan line effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
