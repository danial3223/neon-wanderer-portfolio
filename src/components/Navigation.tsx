
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      '.nav-item',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 3.5 }
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }
      );
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="nav-item text-2xl font-bold">
            <div className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              PH
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Projects', id: 'projects' },
              { name: 'Achievements', id: 'achievements' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="nav-item relative px-4 py-2 text-white font-medium tracking-wide transition-all duration-300 
                         bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-lg border border-white/20
                         hover:from-cyan-400/20 hover:to-purple-500/20 hover:border-cyan-400/50 hover:text-cyan-400
                         shadow-lg hover:shadow-cyan-400/25 hover:scale-105"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden nav-item p-2 text-white transition-all duration-300
                     bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-lg border border-white/20
                     hover:from-cyan-400/20 hover:to-purple-500/20 hover:border-cyan-400/50
                     shadow-lg hover:shadow-cyan-400/25"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Projects', id: 'projects' },
              { name: 'Achievements', id: 'achievements' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="mobile-nav-item px-8 py-4 text-3xl text-white font-light transition-all duration-300
                         bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20
                         hover:from-cyan-400/20 hover:to-purple-500/20 hover:border-cyan-400/50 hover:text-cyan-400
                         shadow-lg hover:shadow-cyan-400/25 hover:scale-105"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 p-2 text-white transition-all duration-300
                     bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-lg border border-white/20
                     hover:from-cyan-400/20 hover:to-purple-500/20 hover:border-cyan-400/50
                     shadow-lg hover:shadow-cyan-400/25"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm rotate-45 translate-y-1"></span>
              <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm opacity-0"></span>
              <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -rotate-45 -translate-y-1"></span>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
