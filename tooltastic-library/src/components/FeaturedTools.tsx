
import React from 'react';
import { AITool } from '@/data/aiTools';
import { ChevronRight } from 'lucide-react';

interface FeaturedToolsProps {
  tools: AITool[];
}

const FeaturedTools: React.FC<FeaturedToolsProps> = ({ tools }) => {
  const featuredTools = tools.filter(tool => tool.featured);
  
  if (featuredTools.length === 0) return null;

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-brand-dark">Outils en Vedette</h2>
        <div className="text-brand-purple font-medium text-sm flex items-center">
          <span>Voir tout</span>
          <ChevronRight size={16} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredTools.map((tool) => (
          <a 
            key={tool.id}
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative h-64 rounded-xl overflow-hidden shadow-md animate-scale-in"
          >
            <img 
              src={tool.thumbnailUrl}
              alt={tool.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <div className="inline-block bg-brand-purple text-white text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                {tool.category}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{tool.name}</h3>
              <p className="text-gray-200 text-sm line-clamp-2">{tool.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTools;
