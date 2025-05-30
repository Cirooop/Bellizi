import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { 
  ShoppingBag, 
  List, 
  PlusCircle, 
  Truck, 
  Wrench, 
  BarChart, 
  ThumbsUp 
} from 'lucide-react';

const Sidebar = () => {
  const { role } = useRole();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = {
    vendedor: [
      { path: '/vendedor', label: 'Mis Ventas', icon: <List className="w-5 h-5" /> },
      { path: '/vendedor/crear-venta', label: 'Crear Venta', icon: <PlusCircle className="w-5 h-5" /> },
    ],
    fabrica: [
      { path: '/fabrica', label: 'Pedidos Pendientes', icon: <List className="w-5 h-5" /> },
    ],
    logistica: [
      { path: '/logistica', label: 'Pedidos para Entregar', icon: <Truck className="w-5 h-5" /> },
    ],
    instalador: [
      { path: '/instalador', label: 'Mis Instalaciones', icon: <Wrench className="w-5 h-5" /> },
    ],
    admin: [
      { path: '/admin', label: 'Dashboard', icon: <BarChart className="w-5 h-5" /> },
    ],
    cliente: [
      { path: '/cliente', label: 'Confirmación', icon: <ThumbsUp className="w-5 h-5" /> },
    ],
  };

  // Get nav items for current role
  const currentNavItems = role ? navItems[role as keyof typeof navItems] : [];

  return (
    <aside className="w-64 bg-white shadow-md h-full fixed left-0 top-16 overflow-y-auto hidden md:block">
      <nav className="py-6">
        <ul>
          {currentNavItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                  isActive(item.path) ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;