
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form inputs animation
      gsap.fromTo(
        '.form-input',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social icons animation
      gsap.fromTo(
        '.social-icon',
        { opacity: 0, scale: 0.5, rotationY: 180 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.social-icons',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    const submitBtn = e.currentTarget.querySelector('.submit-btn');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });

    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:peerzadagebran@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 px-6" data-scroll-section>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="form-input">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-cyan-400/50 focus:outline-none focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                required
              />
            </div>

            <div className="form-input">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-cyan-400/50 focus:outline-none focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                required
              />
            </div>

            <div className="form-input">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-cyan-400/50 focus:outline-none focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-medium text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Contact Info</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <span>peerzadagebran@gmail.com</span>
                </div>

                <div className="flex items-center space-x-3 text-white">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <span>+91 (234) 567-890</span>
                </div>

                <div className="flex items-center space-x-3 text-white">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <span>Srinagar, Jammu and Kashmir, India</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Connect With Me</h3>
              <div className="social-icons flex space-x-3">
                {[
                  { name: 'GitHub', icon: '🐙', link: '#' },
                  { name: 'LinkedIn', icon: '💼', link: '#' },
                  { name: 'Twitter', icon: '🐦', link: '#' },
                  { name: 'Dribbble', icon: '🏀', link: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    className="social-icon group w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-xl hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
