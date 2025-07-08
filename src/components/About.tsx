
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
      // Simple fade in animations
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Simple scroll triggered animations
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-content relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Peerzada Hanan
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/80 font-light">
              — Wonderer
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/70 font-light max-w-2xl leading-relaxed mb-8"
          >
            Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
          </p>

          <button
            ref={ctaRef}
            onClick={handleContactClick}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-full text-white font-medium text-lg hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-amber-500/25"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* About Section with Neon Glow */}
      <section 
        id="about" 
        ref={sectionRef} 
        className="py-16 px-6 relative" 
        data-scroll-section
      >
        {/* Neon Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 rounded-3xl blur-3xl animate-pulse"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-amber-400/5 via-orange-400/5 to-yellow-400/5 rounded-2xl blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Profile Image */}
            <div ref={imageRef} className="relative">
              <div className="relative w-72 h-72 mx-auto">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                  <img
                    src="/lovable-uploads/cb42e6bc-89a5-4b90-8234-3b0cef548720.png"
                    alt="Peerzada Hanan"
                    className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-500 ease-out"
                  />
                </div>
                {/* Glowing ring around image */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-pulse"></div>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl">
                  <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent filter drop-shadow-lg">
                    About Me
                  </span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  I'm a passionate developer who specializes in creating immersive digital experiences. 
                  With expertise in modern web technologies and a keen eye for design, I bring ideas to life 
                  through innovative solutions and cutting-edge animations.
                </p>
              </div>

              {/* Skills Grid */}
              <div ref={skillsRef} className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Skills & Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-amber-400/30 hover:border-amber-400/70 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 text-center hover:bg-gradient-to-br hover:from-amber-500/10 hover:to-orange-500/10"
                    >
                      <div className="text-2xl mb-2">
                        {skill.icon}
                      </div>
                      <p className="text-sm text-white/80 font-light">{skill.name}</p>
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
