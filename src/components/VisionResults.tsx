import React from 'react';
import { Solution } from '../lib/supabase';

interface VisionResultsProps {
  solutions: Solution[];
  onSolutionClick: (solution: Solution) => void;
  showResults: boolean;
}

const VisionResults: React.FC<VisionResultsProps> = ({ solutions, onSolutionClick, showResults }) => {
  if (!showResults || solutions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 vision-window rounded-t-none rounded-b-3xl max-h-96 overflow-y-auto animate-slide-up">
      <div className="p-2">
        {solutions.map((solution, index) => (
          <div
            key={solution.id}
            onClick={() => onSolutionClick(solution)}
            className="vision-result p-6 mb-2 last:mb-0"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="vision-result-number">
                  Uppgift {solution.id}
                </div>
                <div className="vision-result-subject">
                  {solution.subject}
                </div>
                <div className="vision-result-preview">
                  {solution.title}
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-text/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionResults;
