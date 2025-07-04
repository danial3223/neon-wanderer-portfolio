
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer fade and slide up animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating particles animation
      gsap.to('.particle', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 px-6 border-t border-white/10" data-scroll-section>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full blur-sm"></div>
        <div className="particle absolute top-1/2 left-1/2 w-3 h-3 bg-purple-400/20 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full blur-sm"></div>
        <div className="particle absolute top-3/4 left-3/4 w-2.5 h-2.5 bg-cyan-300/25 rounded-full blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo/Brand */}
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Peerzada Hanan
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center space-x-8">
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-cyan-400 transition-colors duration-300 font-light"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {[
              { icon: '🐙', link: '#' },
              { icon: '💼', link: '#' },
              { icon: '🐦', link: '#' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-lg hover:border-cyan-400/50 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/50 text-sm">
            © 2024 Peerzada Hanan. Crafted with passion and cutting-edge technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
