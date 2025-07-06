
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  fullDescription?: string;
  likes: number;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: '3D Interactive Web',
      description: 'Modern web experience with Three.js and GSAP animations',
      fullDescription: 'A cutting-edge web application featuring immersive 3D elements powered by Three.js. This project showcases advanced animation techniques using GSAP, creating a seamless and engaging user experience.',
      image: '/lovable-uploads/ebda59a4-3c57-40b2-b022-f196099f4619.png',
      tech: ['React', 'Three.js', 'GSAP'],
      likes: 24,
    },
    {
      id: 2,
      title: 'Gaming UI Design',
      description: 'Next-level gaming interface with smooth animations',
      fullDescription: 'A sophisticated gaming interface designed with modern UI/UX principles. Features include dynamic animations, responsive layouts, and intuitive user interactions.',
      image: '/lovable-uploads/e222639a-a5c9-44b4-9f7b-ba8a4c7d3885.png',
      tech: ['React', 'GSAP', 'CSS3'],
      likes: 18,
    },
    {
      id: 3,
      title: '3D Portfolio',
      description: 'Immersive portfolio experience with 3D elements',
      fullDescription: 'An innovative portfolio website that pushes the boundaries of web design. Built with Spline for 3D modeling and React for seamless interactions.',
      image: '/lovable-uploads/35e18a91-9487-41ac-ab25-0beccdd686e8.png',
      tech: ['Spline', 'React', 'GSAP'],
      likes: 31,
    },
    {
      id: 4,
      title: 'Gaming Website',
      description: 'Creative gaming platform with stunning visuals',
      fullDescription: 'A comprehensive gaming platform featuring WebGL-powered graphics and smooth GSAP animations. The website includes user profiles, game libraries, and social features.',
      image: '/lovable-uploads/1b5960e0-4a71-4b5a-bc45-c09cee2f7dff.png',
      tech: ['React', 'WebGL', 'GSAP'],
      likes: 27,
    },
    {
      id: 5,
      title: 'Animation Tutorial',
      description: 'Step-by-step animated portfolio creation guide',
      fullDescription: 'An educational platform teaching modern web animation techniques. Features comprehensive tutorials on GSAP, CSS animations, and React transitions.',
      image: '/lovable-uploads/55ca3fa8-24b7-409b-b0d3-a80d126ac34e.png',
      tech: ['GSAP', 'React', 'CSS3'],
      likes: 15,
    },
    {
      id: 6,
      title: 'Web Animation Tools',
      description: 'Comprehensive guide to modern web animation libraries',
      fullDescription: 'A detailed comparison and tutorial platform for popular web animation libraries. Covers GSAP, Framer Motion, and Lottie with practical examples.',
      image: '/lovable-uploads/b3091ada-85bc-4ca5-ad94-93e4de6ef300.png',
      tech: ['GSAP', 'Framer', 'Lottie'],
      likes: 22,
    },
  ]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleLike = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
        setProjects(prevProjects => 
          prevProjects.map(p => p.id === projectId ? { ...p, likes: p.likes - 1 } : p)
        );
      } else {
        newSet.add(projectId);
        setProjects(prevProjects => 
          prevProjects.map(p => p.id === projectId ? { ...p, likes: p.likes + 1 } : p)
        );
      }
      return newSet;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-16 px-6" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
          >
            Featured Projects
          </h2>

          <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="project-card group relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Like Button */}
                  <button
                    onClick={(e) => handleLike(e, project.id)}
                    className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-200"
                  >
                    <Heart 
                      className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                  </button>
                </div>

                {/* Project Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Likes Count */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-white/60 text-sm">{project.likes} likes</span>
                  </div>
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
