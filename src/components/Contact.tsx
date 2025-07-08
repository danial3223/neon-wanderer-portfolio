
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
    const mailtoLink = `mailto:peerzadagebran698@gmail.com?subject=${subject}&body=${body}`;
    
    // Auto-send email by opening default email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-12 px-6" data-scroll-section>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-lg text-white placeholder-white/60 focus:border-amber-400/70 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-amber-500/20"
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
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-lg text-white placeholder-white/60 focus:border-amber-400/70 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-amber-500/20"
                required
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-lg text-white placeholder-white/60 focus:border-amber-400/70 focus:outline-none transition-all duration-300 resize-none focus:shadow-lg focus:shadow-amber-500/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-lg text-white font-medium hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-amber-500/25"
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
                  <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center text-sm">
                    📧
                  </div>
                  <span className="text-sm">peerzadagebran698@gmail.com</span>
                </div>

                <div className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-sm">
                    📱
                  </div>
                  <span className="text-sm">+91 (234) 567-890</span>
                </div>

                <div className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-sm">
                    📍
                  </div>
                  <span className="text-sm">Srinagar, Jammu and Kashmir, India</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Connect With Me</h3>
              <div className="flex space-x-3">
                {[
                  { name: 'GitHub', icon: '🐙', link: '#' },
                  { name: 'LinkedIn', icon: '💼', link: '#' },
                  { name: 'Twitter', icon: '🐦', link: '#' },
                  { name: 'Dribbble', icon: '🏀', link: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:border-amber-400/70 hover:shadow-lg hover:shadow-amber-500/20"
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
