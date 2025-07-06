
import React from 'react';
import { cn } from '@/lib/utils';
import { Category, categories } from '@/data/aiTools';

interface CategoryFilterProps {
  selectedCategories: Category[];
  toggleCategory: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategories, 
  toggleCategory 
}) => {
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-3">Catégories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={cn(
              "category-badge",
              selectedCategories.includes(category)
                ? "category-badge-active"
                : "category-badge-inactive"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
