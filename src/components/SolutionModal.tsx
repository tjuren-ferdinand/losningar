import React from 'react';
import { Solution } from '../lib/supabaseClient';
import { X } from 'lucide-react';

interface SolutionModalProps {
  solution: Solution | null;
  isOpen: boolean;
  onClose: () => void;
}

const SolutionModal: React.FC<SolutionModalProps> = ({ solution, isOpen, onClose }) => {
  if (!isOpen || !solution) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="vision-window p-12 max-w-4xl w-full max-h-[90vh] overflow-auto animate-scale-in">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-4xl font-light text-text mb-4 tracking-wider truncate">
              {solution.title}
            </h2>
            <div className="flex items-center gap-6 text-sm text-text-secondary tracking-wide">
              <span>{solution.subject}</span>
              <span>•</span>
              <span>{new Date(solution.created_at).toLocaleDateString('sv-SE')}</span>
            </div>
            <div className="mt-4 text-sm text-text-secondary tracking-wide">
              <span>{solution.category}</span>
              <span className="mx-3">•</span>
              <span>{solution.chapter}</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-4 hover:bg-white/30 rounded-full transition-colors flex-shrink-0 ml-8"
          >
            <X className="w-6 h-6 text-text-secondary" />
          </button>
        </div>
        {solution.image_url && (
          <div className="mt-8">
            <img
              src={solution.image_url}
              alt={solution.title}
              className="w-full max-h-[60vh] object-contain rounded-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionModal;
