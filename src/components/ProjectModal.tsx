
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  fullDescription?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Animate modal in
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else if (!isOpen && modalRef.current) {
      // Animate modal out
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.3,
        onComplete: () => {
          if (modalRef.current) {
            gsap.set(modalRef.current, { display: 'none' });
          }
        }
      });
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ display: 'none' }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Project Image */}
        <div className="mb-6">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 md:h-80 object-cover rounded-xl"
          />
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {project.title}
          </h2>
          
          <p className="text-lg text-white/80 leading-relaxed">
            {project.fullDescription || project.description}
          </p>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white/90">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
