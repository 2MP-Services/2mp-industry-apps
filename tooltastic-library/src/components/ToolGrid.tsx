
import React from 'react';
import ToolCard from './ToolCard';
import { AITool } from '@/data/aiTools';

interface ToolGridProps {
  tools: AITool[];
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools }) => {
  // Use the tool's own thumbnail if available, otherwise fall back to category image
  const toolsWithUpdatedImages = tools;

  if (toolsWithUpdatedImages.length === 0) {
    return (
      <div className="text-center py-16 w-full">
        <h3 className="text-xl font-medium text-brand-gray">Aucun outil ne correspond à vos critères de recherche</h3>
        <p className="mt-2 text-gray-400">Essayez d'ajuster vos filtres ou votre terme de recherche</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {toolsWithUpdatedImages.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
};

export default ToolGrid;
