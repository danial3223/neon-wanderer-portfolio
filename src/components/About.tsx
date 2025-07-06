
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
      // Hero content animations (no delay since preloader is removed)
      const tl = gsap.timeline({ delay: 0.5 });

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

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100, rotationY: 45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skills stagger animation
      gsap.fromTo(
        '.skill-icon',
        { opacity: 0, scale: 0.5, rotationY: 180 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
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
            onClick={handleContactClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-medium text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRef} className="py-20 px-6" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div ref={imageRef} className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-cyan-500/20">
                  <img
                    src="/lovable-uploads/aadd41b0-29ff-4ae3-a8bb-59387409dbbc.png"
                    alt="Peerzada Hanan"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    About Me
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  I'm a passionate developer who specializes in creating immersive digital experiences. 
                  With expertise in modern web technologies and a keen eye for design, I bring ideas to life 
                  through innovative solutions and cutting-edge animations.
                </p>
              </div>

              {/* Skills Grid */}
              <div ref={skillsRef} className="space-y-4">
                <h3 className="text-2xl font-semibold text-white/90">Skills & Technologies</h3>
                <div className="grid grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="skill-icon group relative p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <p className="text-sm text-white/80 font-light">{skill.name}</p>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
