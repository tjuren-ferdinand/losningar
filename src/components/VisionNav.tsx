import React from 'react';

interface VisionNavProps {
  activeSubject: string | null;
  onSubjectChange: (subject: string) => void;
}

const VisionNav: React.FC<VisionNavProps> = ({ activeSubject, onSubjectChange }) => {
  const subjects = ['Alla', 'Matematik', 'Fysik'];

  return (
    <nav className="vision-nav animate-fade-in">
      {subjects.map((subject) => (
        <div
          key={subject}
          onClick={() => onSubjectChange(subject)}
          className={`vision-nav-item ${
            activeSubject === subject ? 'active' : ''
          }`}
        >
          {subject}
        </div>
      ))}
    </nav>
  );
};

export default VisionNav;
