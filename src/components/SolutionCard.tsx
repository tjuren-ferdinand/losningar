import React from 'react';
import { Solution } from '../types';
import { Calendar, Tag, FileText } from 'lucide-react';

interface SolutionCardProps {
  solution: Solution;
  onClick: (solution: Solution) => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onClick }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Tenta-uppgifter':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Bok-uppgifter':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'General Notes':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div
      onClick={() => onClick(solution)}
      className="glass-card glass-card-hover p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
            {solution.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar className="w-4 h-4" />
            <span>{solution.createdAt.toLocaleDateString('sv-SE')}</span>
          </div>
        </div>
        <FileText className="w-5 h-5 text-text-secondary flex-shrink-0 ml-4" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(solution.type)}`}>
          {solution.type}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
          {solution.subject}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {solution.tags.map((tag) => (
          <div key={tag} className="flex items-center gap-1 text-xs text-text-secondary">
            <Tag className="w-3 h-3" />
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionCard;
