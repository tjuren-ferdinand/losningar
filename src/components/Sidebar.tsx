import React from 'react';
import { Category } from '../types';
import { BookOpen, Plus } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="w-64 h-screen bg-white/50 backdrop-blur-sm border-r border-border p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold">Tekniskt Basår</h1>
      </div>

      <nav className="space-y-6">
        <div>
          <h2 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
            Ämnen
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === category.name
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-text hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                <span className="text-sm text-text-secondary bg-gray-100 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
            Typer
          </h2>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-lg text-text hover:bg-gray-100 transition-colors">
              Tenta-uppgifter
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-text hover:bg-gray-100 transition-colors">
              Bok-uppgifter
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-text hover:bg-gray-100 transition-colors">
              General Notes
            </button>
          </div>
        </div>

        <button className="w-full flex items-center gap-2 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
          <Plus className="w-4 h-4" />
          Ny Lösning
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
