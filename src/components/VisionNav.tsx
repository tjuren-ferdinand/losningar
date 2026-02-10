import React from 'react';

interface VisionNavProps {
  activeSubject: string | null;
  onSubjectChange: (subject: string) => void;
}

const VisionNav: React.FC<VisionNavProps> = ({ activeSubject, onSubjectChange }) => {
  const subjects = ['Fysik'];

  return (
    <nav className="vision-nav animate-fade-in" aria-label="Ämnesfilter">
      {subjects.map((subject) => (
        <button
          key={subject}
          type="button"
          onClick={() => onSubjectChange(subject)}
          className={`vision-nav-item ${
            activeSubject === subject ? 'active' : ''
          }`}
        >
          {subject}
        </button>
      ))}
    </nav>
  );
};

export default VisionNav;
