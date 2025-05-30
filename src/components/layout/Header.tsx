import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  const getRoleDisplay = () => {
    switch(role) {
      case 'vendedor': return 'Vendedor';
      case 'fabrica': return 'Fábrica';
      case 'logistica': return 'Logística';
      case 'instalador': return 'Instalador';
      case 'admin': return 'Administrador';
      case 'cliente': return 'Cliente';
      default: return '';
    }
  };

  const getRoleColor = () => {
    switch(role) {
      case 'vendedor': return 'bg-blue-600';
      case 'fabrica': return 'bg-yellow-600';
      case 'logistica': return 'bg-green-600';
      case 'instalador': return 'bg-purple-600';
      case 'admin': return 'bg-red-600';
      case 'cliente': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <header className={`fixed w-full ${getRoleColor()} text-white shadow-md z-10`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Cortinas Roller Pro</h1>
            <span className="mx-2">|</span>
            <span className="text-sm font-medium">{getRoleDisplay()}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-1 rounded hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;