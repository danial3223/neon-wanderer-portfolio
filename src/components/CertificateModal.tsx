
import { X } from 'lucide-react';

interface CertificateModalProps {
  certificate: {
    title: string;
    image?: string;
    description: string;
    date: string;
  } | null;
  onClose: () => void;
}

const CertificateModal = ({ certificate, onClose }: CertificateModalProps) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-white/20 bg-white/5 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white">{certificate.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="p-6">
          {certificate.image && (
            <div className="mb-6">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-auto rounded-lg border border-white/20"
              />
            </div>
          )}
          
          <div className="space-y-4">
            <p className="text-white/70 text-lg leading-relaxed">
              {certificate.description}
            </p>
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <span className="text-cyan-400 font-medium">Date: {certificate.date}</span>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
