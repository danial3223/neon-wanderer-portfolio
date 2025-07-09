
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
      // Simple fade in animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
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
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:peerzadahanan.edu@gmail.com?subject=${subject}&body=${body}`;
    
    // Auto-send email by opening default email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 px-6 relative min-h-screen" data-scroll-section>
      {/* Enhanced background for better text visibility */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-6">
          {/* Enhanced title background */}
          <div className="relative inline-block">
            <div className="absolute -inset-6 bg-black/70 backdrop-blur-sm rounded-2xl border border-cyan-400/30"></div>
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl blur-lg"></div>
            
            <div className="relative px-8 py-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">
                  Get In Touch
                </span>
              </h2>
            </div>
          </div>
          
          {/* Enhanced subtitle background with better spacing */}
          <div className="relative mt-8">
            <div className="absolute -inset-4 bg-black/60 backdrop-blur-sm rounded-xl border border-blue-400/20"></div>
            <p className="relative text-lg md:text-xl text-white max-w-3xl mx-auto px-6 py-4 leading-relaxed" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
              Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Enhanced Contact Form */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-3 bg-black/60 backdrop-blur-sm rounded-2xl border border-cyan-400/30"></div>
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-2xl blur-lg"></div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-6 p-8">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-black/70 backdrop-blur-sm border border-cyan-400/50 rounded-lg text-white placeholder-white/70 focus:border-cyan-400 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/30 text-lg"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-black/70 backdrop-blur-sm border border-cyan-400/50 rounded-lg text-white placeholder-white/70 focus:border-cyan-400 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/30 text-lg"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-black/70 backdrop-blur-sm border border-cyan-400/50 rounded-lg text-white placeholder-white/70 focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none focus:shadow-lg focus:shadow-cyan-500/30 text-lg"
                  required
                />
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                className="group relative w-full px-8 py-5 font-bold text-xl overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 shadow-2xl shadow-cyan-500/40"
              >
                {/* Multiple background layers for better visibility */}
                <div className="absolute inset-0 bg-black/70 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Enhanced glowing border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-0.5">
                  <div className="h-full w-full bg-black/80 rounded-xl"></div>
                </div>
                
                {/* Button content */}
                <span className="relative z-10 text-white drop-shadow-lg">
                  Send Message
                </span>
                
                {/* Enhanced hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"></div>
              </button>
            </form>
          </div>

          {/* Enhanced Contact Info & Social */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Enhanced Contact Info */}
            <div className="relative">
              <div className="absolute -inset-3 bg-black/60 backdrop-blur-sm rounded-xl border border-cyan-400/30"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-xl blur-lg"></div>
              
              <div className="relative p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-white drop-shadow-lg mb-6">Contact Info</h3>
                
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="w-12 h-12 bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/50 rounded-full flex items-center justify-center text-lg shadow-lg shadow-cyan-500/20 flex-shrink-0">
                      📧
                    </div>
                    <span className="text-base md:text-lg drop-shadow-lg break-all">peerzadahanan.edu@gmail.com</span>
                  </div>

                  <div className="flex items-center space-x-4 text-white">
                    <div className="w-12 h-12 bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 rounded-full flex items-center justify-center text-lg shadow-lg shadow-blue-500/20 flex-shrink-0">
                      📱
                    </div>
                    <span className="text-base md:text-lg drop-shadow-lg">+91 (234) 567-890</span>
                  </div>

                  <div className="flex items-center space-x-4 text-white">
                    <div className="w-12 h-12 bg-indigo-500/30 backdrop-blur-sm border border-indigo-400/50 rounded-full flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20 flex-shrink-0">
                      📍
                    </div>
                    <span className="text-base md:text-lg drop-shadow-lg">Srinagar, Jammu and Kashmir, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Icons */}
            <div className="relative">
              <div className="absolute -inset-3 bg-black/60 backdrop-blur-sm rounded-xl border border-cyan-400/30"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-xl blur-lg"></div>
              
              <div className="relative p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-white drop-shadow-lg mb-6">Connect With Me</h3>
                <div className="flex space-x-4 flex-wrap gap-3">
                  {[
                    { name: 'GitHub', icon: '🐙', link: '#' },
                    { name: 'LinkedIn', icon: '💼', link: '#' },
                    { name: 'Twitter', icon: '🐦', link: '#' },
                    { name: 'Dribbble', icon: '🏀', link: '#' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      className="group relative w-14 h-14 bg-black/70 backdrop-blur-sm border border-cyan-400/50 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 rounded-full transition-all duration-300"></div>
                      <span className="relative text-xl">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
