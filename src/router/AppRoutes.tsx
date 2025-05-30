import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import RoleSelection from '../views/RoleSelection';
import Layout from '../components/layout/Layout';

// Vendedor
import VendedorHome from '../views/vendedor/VendedorHome';
import CrearVenta from '../views/vendedor/CrearVenta';

// Fabrica
import FabricaHome from '../views/fabrica/FabricaHome';

// Logistica
import LogisticaHome from '../views/logistica/LogisticaHome';

// Instalador
import InstaladorHome from '../views/instalador/InstaladorHome';

// Admin
import AdminHome from '../views/admin/AdminHome';

// Cliente
import ClienteHome from '../views/cliente/ClienteHome';

const AppRoutes = () => {
  const { role } = useRole();

  // If no role is selected, show role selection
  if (!role) {
    return (
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    );
  }

  // Role-specific routes
  return (
    <Routes>
      {/* Common */}
      <Route path="/" element={<Navigate to={`/${role}`} replace />} />
      
      {/* Vendedor Routes */}
      <Route path="/vendedor" element={<Layout><VendedorHome /></Layout>} />
      <Route path="/vendedor/crear-venta" element={<Layout><CrearVenta /></Layout>} />
      
      {/* Fabrica Routes */}
      <Route path="/fabrica" element={<Layout><FabricaHome /></Layout>} />
      
      {/* Logistica Routes */}
      <Route path="/logistica" element={<Layout><LogisticaHome /></Layout>} />
      
      {/* Instalador Routes */}
      <Route path="/instalador" element={<Layout><InstaladorHome /></Layout>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Layout><AdminHome /></Layout>} />
      
      {/* Cliente Routes */}
      <Route path="/cliente" element={<Layout><ClienteHome /></Layout>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to={`/${role}`} replace />} />
    </Routes>
  );
};

export default AppRoutes;