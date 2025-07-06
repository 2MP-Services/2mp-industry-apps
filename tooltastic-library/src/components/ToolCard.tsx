
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AITool } from '@/data/aiTools';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="tool-card bg-white rounded-xl overflow-hidden shadow-md border animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tool.thumbnailUrl} 
          alt={tool.name} 
          className="w-full h-full object-cover"
        />
        {tool.featured && (
          <div className="absolute top-3 right-3 bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded-full">
            En Vedette
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-brand-dark">{tool.name}</h3>
          <span className="inline-block bg-brand-light-purple text-brand-purple text-xs font-medium px-2.5 py-0.5 rounded">
            {tool.category}
          </span>
        </div>
        
        <p className="mt-2 text-gray-600 line-clamp-3">{tool.description}</p>
        
        <div className="mt-3 flex flex-wrap">
          {tool.tags.map((tag, index) => (
            <span key={index} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={tool.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-brand-blue hover:underline"
        >
          Visiter le Site <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default ToolCard;
