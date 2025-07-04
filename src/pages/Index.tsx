
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import Navigation from '../components/Navigation';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    if (scrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        class: 'is-reveal',
      });

      // Update ScrollTrigger when Locomotive Scroll updates
      locomotiveScrollRef.current.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          return arguments.length
            ? locomotiveScrollRef.current?.scrollTo(value, { duration: 0, disableLerp: true })
            : locomotiveScrollRef.current?.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: scrollRef.current?.style.transform ? 'transform' : 'fixed',
      });
    }

    // Refresh ScrollTrigger
    ScrollTrigger.addEventListener('refresh', () => locomotiveScrollRef.current?.update());
    ScrollTrigger.refresh();

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Preloader />
      
      {/* Fixed Spline Background */}
      <div className="fixed inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-xe7Z6tFljiTL4Xg1KI95KLmR/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-[1px]"></div>
      </div>

      <div ref={scrollRef} data-scroll-container className="relative z-10 min-h-screen text-white overflow-hidden">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
