
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import About from '../components/About';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
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
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/lovable-uploads/18e8093b-6a22-42c6-827d-9e1b873344a4.png"
          alt="Elegant Cyan Curves Background"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div ref={scrollRef} data-scroll-container className="relative z-10 min-h-screen text-white overflow-hidden">
        <Navigation />
        <section id="home" className="min-h-screen">
          <About />
        </section>
        <Projects />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
