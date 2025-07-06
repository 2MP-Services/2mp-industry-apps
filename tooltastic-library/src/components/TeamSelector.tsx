
import React from 'react';
import { teamToCategoriesMap } from '@/data/aiTools';

interface TeamSelectorProps {
  setSelectedTeam: (team: string | null) => void;
  selectedTeam: string | null;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ setSelectedTeam, selectedTeam }) => {
  const teams = [
    { id: "marketing", name: "Équipe Marketing" },
    { id: "mechanics", name: "Équipe Mécanique" },
    { id: "electronics", name: "Équipe Électronique" },
    { id: "development", name: "Équipe Développement" },
    { id: "hr", name: "Équipe RH" },
    { id: "finance", name: "Équipe Finance" },
    { id: "management", name: "Management" }
  ];

  return (
    <div className="my-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-brand-darkgray">Sélectionnez votre équipe</h2>
        <p className="text-brand-gray mt-1">
          Nous vous montrerons les meilleurs outils d'IA adaptés à vos besoins spécifiques
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
            className={`
              flex flex-col items-center p-4 rounded-lg transition-all
              ${selectedTeam === team.id 
                ? 'bg-brand-yellow text-brand-darkgray shadow-lg scale-105' 
                : 'bg-white hover:bg-gray-50 border border-gray-200 text-brand-gray hover:shadow'
              }
            `}
          >
            <div className="text-lg font-medium">{team.name}</div>
            <div className="text-sm mt-2">
              {selectedTeam === team.id ? "Sélectionné" : "Cliquez pour sélectionner"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamSelector;
