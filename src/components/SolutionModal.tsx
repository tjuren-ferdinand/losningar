import React from 'react';
import { Solution } from '../lib/supabase';
import { X } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface SolutionModalProps {
  solution: Solution | null;
  isOpen: boolean;
  onClose: () => void;
}

const SolutionModal: React.FC<SolutionModalProps> = ({ solution, isOpen, onClose }) => {
  if (!isOpen || !solution) return null;

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-light text-text mb-8 tracking-wider">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-light text-text mb-6 tracking-wide">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-light text-text mb-4 tracking-wide">{line.slice(4)}</h3>;
      }
      if (line.includes('\\[') && line.includes('\\]')) {
        const mathContent = line.replace(/\\\[/g, '').replace(/\\\]/g, '').trim();
        return <div key={index} className="my-8 flex justify-center"><BlockMath math={mathContent} /></div>;
      }
      if (line.includes('\\(') && line.includes('\\)')) {
        const mathContent = line.replace(/\\\(/g, '').replace(/\\\)/g, '').trim();
        return <span key={index}><InlineMath math={mathContent} /></span>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-6 text-text leading-relaxed text-xl font-light tracking-wide">{line}</p>;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="vision-window p-12 max-w-4xl w-full max-h-[90vh] overflow-auto animate-scale-in">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-4xl font-light text-text mb-4 tracking-wider truncate">
              Uppgift {solution.id}
            </h2>
            <div className="flex items-center gap-6 text-sm text-text-secondary tracking-wide">
              <span>{solution.subject}</span>
              <span>•</span>
              <span>{solution.type}</span>
              <span>•</span>
              <span>{new Date(solution.created_at).toLocaleDateString('sv-SE')}</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-4 hover:bg-white/30 rounded-full transition-colors flex-shrink-0 ml-8"
          >
            <X className="w-6 h-6 text-text-secondary" />
          </button>
        </div>

        <div className="prose prose-xl max-w-none">
          {renderContent(solution.content)}
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;
