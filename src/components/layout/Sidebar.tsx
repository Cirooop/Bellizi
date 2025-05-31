import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { 
  // ShoppingBag, 
  List, 
  PlusCircle, 
  Truck, 
  Wrench, 
  BarChart, 
  ThumbsUp 
} from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  onHover: (expanded: boolean) => void;
}

const Sidebar = ({ isExpanded, onHover }: SidebarProps) => {
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

  const currentNavItems = role ? navItems[role as keyof typeof navItems] : [];

  return (
    <aside 
      className={`fixed left-0 top-16 h-full bg-white shadow-md transition-all duration-300 ease-in-out z-20
        ${isExpanded ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <nav className="py-6">
        <ul>
          {currentNavItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors
                  ${isActive(item.path) ? 'bg-gray-100 font-medium' : ''}`}
              >
                <span className="min-w-[20px]">{item.icon}</span>
                <span className={`ml-3 whitespace-nowrap transition-opacity duration-300
                  ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;