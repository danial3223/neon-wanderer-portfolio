
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from './ProjectModal';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  fullDescription?: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards stagger animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const projects: Project[] = [
    {
      title: '3D Interactive Web',
      description: 'Modern web experience with Three.js and GSAP animations',
      fullDescription: 'A cutting-edge web application featuring immersive 3D elements powered by Three.js. This project showcases advanced animation techniques using GSAP, creating a seamless and engaging user experience. The application includes interactive 3D models, smooth transitions, and responsive design that works across all devices.',
      image: '/lovable-uploads/ebda59a4-3c57-40b2-b022-f196099f4619.png',
      tech: ['React', 'Three.js', 'GSAP'],
    },
    {
      title: 'Gaming UI Design',
      description: 'Next-level gaming interface with smooth animations',
      fullDescription: 'A sophisticated gaming interface designed with modern UI/UX principles. Features include dynamic animations, responsive layouts, and intuitive user interactions. The design incorporates gaming aesthetics with professional functionality, creating an engaging platform for gamers.',
      image: '/lovable-uploads/e222639a-a5c9-44b4-9f7b-ba8a4c7d3885.png',
      tech: ['React', 'GSAP', 'CSS3'],
    },
    {
      title: '3D Portfolio',
      description: 'Immersive portfolio experience with 3D elements',
      fullDescription: 'An innovative portfolio website that pushes the boundaries of web design. Built with Spline for 3D modeling and React for seamless interactions. The project features interactive 3D scenes, smooth scrolling animations, and a modern design aesthetic that captivates visitors.',
      image: '/lovable-uploads/35e18a91-9487-41ac-ab25-0beccdd686e8.png',
      tech: ['Spline', 'React', 'GSAP'],
    },
    {
      title: 'Gaming Website',
      description: 'Creative gaming platform with stunning visuals',
      fullDescription: 'A comprehensive gaming platform featuring WebGL-powered graphics and smooth GSAP animations. The website includes user profiles, game libraries, social features, and real-time interactions. Built with performance and user experience as top priorities.',
      image: '/lovable-uploads/1b5960e0-4a71-4b5a-bc45-c09cee2f7dff.png',
      tech: ['React', 'WebGL', 'GSAP'],
    },
    {
      title: 'Animation Tutorial',
      description: 'Step-by-step animated portfolio creation guide',
      fullDescription: 'An educational platform teaching modern web animation techniques. Features comprehensive tutorials on GSAP, CSS animations, and React transitions. Includes interactive code examples, video tutorials, and downloadable resources for developers looking to enhance their animation skills.',
      image: '/lovable-uploads/55ca3fa8-24b7-409b-b0d3-a80d126ac34e.png',
      tech: ['GSAP', 'React', 'CSS3'],
    },
    {
      title: 'Web Animation Tools',
      description: 'Comprehensive guide to modern web animation libraries',
      fullDescription: 'A detailed comparison and tutorial platform for popular web animation libraries. Covers GSAP, Framer Motion, and Lottie with practical examples and performance benchmarks. Includes best practices, optimization techniques, and real-world use cases.',
      image: '/lovable-uploads/b3091ada-85bc-4ca5-ad94-93e4de6ef300.png',
      tech: ['GSAP', 'Framer', 'Lottie'],
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-20 px-6" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project)}
                className="project-card group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Projects;
