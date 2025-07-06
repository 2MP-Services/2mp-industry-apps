
import React from 'react';
import { Search } from 'lucide-react';
import logo from "./logo.svg";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="w-full bg-white py-6 px-4 md:px-8 border-b shadow-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="2MP Services Logo" 
              className="h-12 md:h-16"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-darkgray">
                <span className="text-brand-yellow">Répertoire</span> d'Outils IA
              </h1>
              <p className="text-brand-gray mt-1">Découvrez les meilleurs outils d'IA pour votre équipe</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-brand-gray" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher des outils..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
