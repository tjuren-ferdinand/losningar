import React from 'react';
import { Solution } from '../types';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

interface MinimalSolutionCardProps {
  solution: Solution;
  onClick: (solution: Solution) => void;
}

const MinimalSolutionCard: React.FC<MinimalSolutionCardProps> = ({ solution, onClick }) => {
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return 'bg-purple-500/10 text-purple-600 border-purple-200/50';
      case 'Mathematics':
        return 'bg-blue-500/10 text-blue-600 border-blue-200/50';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200/50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Tenta-uppgifter':
        return 'bg-red-500/10 text-red-600 border-red-200/50';
      case 'Bok-uppgifter':
        return 'bg-green-500/10 text-green-600 border-green-200/50';
      case 'General Notes':
        return 'bg-amber-500/10 text-amber-600 border-amber-200/50';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200/50';
    }
  };

  return (
    <div
      onClick={() => onClick(solution)}
      className="solution-card group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-text mb-2 truncate group-hover:text-accent transition-colors">
            {solution.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-text-tertiary">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{solution.createdAt.toLocaleDateString('sv-SE', { 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors flex-shrink-0 ml-4" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${getSubjectColor(solution.subject)}`}>
          {solution.subject}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${getTypeColor(solution.type)}`}>
          {solution.type}
        </span>
      </div>

      {solution.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {solution.tags.slice(0, 3).map((tag) => (
            <div key={tag} className="flex items-center gap-1 text-xs text-text-tertiary">
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
            </div>
          ))}
          {solution.tags.length > 3 && (
            <span className="text-xs text-text-tertiary">+{solution.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MinimalSolutionCard;
