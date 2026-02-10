import React from 'react';
import { Category } from '../data/categories';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedChapter: string | null;
  onCategoryChange: (category: string) => void;
  onChapterChange: (chapter: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  selectedChapter,
  onCategoryChange,
  onChapterChange,
}) => {
  const activeCategory = categories.find(cat => cat.name === selectedCategory);

  return (
    <div className="flex flex-wrap items-center gap-3 animate-fade-in">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`category-pill transition-all duration-200 ${
              selectedCategory === category.name
                ? 'bg-accent/20 text-accent border-accent/30'
                : 'hover:bg-white/60'
            }`}
          >
            <span className="font-medium">{category.name}</span>
            <span className="ml-2 text-xs text-text-tertiary">
              {category.chapters.length}
            </span>
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="flex flex-wrap gap-2 animate-slide-up">
          {activeCategory.chapters.map((chapter) => (
            <button
              key={chapter}
              onClick={() => onChapterChange(chapter)}
              className={`category-pill text-sm transition-all duration-200 ${
                selectedChapter === chapter
                  ? 'bg-accent/15 text-accent border-accent/25'
                  : 'hover:bg-white/50'
              }`}
            >
              {chapter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
