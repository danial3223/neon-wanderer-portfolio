
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
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
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
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-medium text-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRef} className="py-16 px-6" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Profile Image */}
            <div ref={imageRef} className="relative">
              <div className="relative w-72 h-72 mx-auto">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src="/lovable-uploads/cb42e6bc-89a5-4b90-8234-3b0cef548720.png"
                    alt="Peerzada Hanan"
                    className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-500 ease-out"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  About Me
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
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:border-cyan-400/50 transition-all duration-300 text-center"
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
