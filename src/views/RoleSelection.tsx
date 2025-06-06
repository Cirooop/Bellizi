import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import {
  ShoppingBag,
  Factory,
  Truck,
  Wrench,
  BarChart,
  User,
} from "lucide-react";
import { Role } from "../types";
// import { useState } from "react";

const RoleSelection = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleRoleSelect = (role: Role) => {
    setRole(role);
    navigate(`/${role}`);
  };

  const roles: {
    id: Role;
    name: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "vendedor",
      name: "Vendedor",
      description: "Crear y gestionar ventas",
      icon: <ShoppingBag className="w-12 h-12 mb-4 text-blue-600" />,
    },
    {
      id: "logistica",
      name: "Logística",
      description: "Coordinar entregas",
      icon: <Truck className="w-12 h-12 mb-4 text-green-600" />,
    },
    {
      id: "fabrica",
      name: "Fábrica",
      description: "Gestionar pedidos y producción",
      icon: <Factory className="w-12 h-12 mb-4 text-yellow-600" />,
    },
    {
      id: "instalador",
      name: "Instalador",
      description: "Realizar instalaciones",
      icon: <Wrench className="w-12 h-12 mb-4 text-purple-600" />,
    },
    {
      id: "admin",
      name: "Administrador",
      description: "Dashboard y gestión general",
      icon: <BarChart className="w-12 h-12 mb-4 text-red-600" />,
    },
    {
      id: "cliente",
      name: "Cliente",
      description: "Confirmar instalación",
      icon: <User className="w-12 h-12 mb-4 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="text-center mb-10">
            <img
              src="https://i.imgur.com/AOVg7ey.png"
              alt="Bellizzi Logo"
              className="mx-auto h-20 mb-4"
            />
            <p className="text-gray-600">
              Selecciona tu rol para ingresar al sistema
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center flex flex-col items-center"
            >
              {role.icon}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {role.name}
              </h2>
              <p className="text-gray-600">{role.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
