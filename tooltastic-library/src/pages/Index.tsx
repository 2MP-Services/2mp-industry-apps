
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ToolGrid from '@/components/ToolGrid';
import TeamSelector from '@/components/TeamSelector';
import { aiTools, Category, teamToCategoriesMap } from '@/data/aiTools';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const toggleCategory = (category: Category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // When team changes, update categories accordingly
  React.useEffect(() => {
    if (selectedTeam) {
      const teamCategories = teamToCategoriesMap[selectedTeam as keyof typeof teamToCategoriesMap];
      if (teamCategories) {
        setSelectedCategories(teamCategories as Category[]);
      }
    } else {
      setSelectedCategories([]);
    }
  }, [selectedTeam]);

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      // Filter by search term
      const matchesSearch = 
        searchTerm === '' || 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by categories
      const matchesCategory = 
        selectedCategories.length === 0 || 
        selectedCategories.includes(tool.category);

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main className="container mx-auto px-4 py-8">
        <TeamSelector selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
        
        <CategoryFilter 
          selectedCategories={selectedCategories} 
          toggleCategory={toggleCategory} 
        />
        
        <ToolGrid tools={filteredTools} />
      </main>
      
      <footer className="mt-12 py-6 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Répertoire d'Outils IA — Découvrez les meilleurs outils d'IA pour votre workflow</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
