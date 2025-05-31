import  { useState, useEffect } from 'react';
import { getOrders, getOrderStats } from '../../data/orders';
import { Order } from '../../types';

const AdminHome = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    production: 0,
    ready: 0,
    delivered: 0,
    installed: 0,
    confirmed: 0,
  });

  useEffect(() => {
    // Get all orders and stats
    const allOrders = getOrders();
    const orderStats = getOrderStats();
    
    setOrders(allOrders);
    setStats(orderStats);
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'production': return 'En producción';
      case 'ready': return 'Listo para entregar';
      case 'delivered': return 'Entregado';
      case 'installed': return 'Instalado';
      case 'confirmed': return 'Confirmado';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'production': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-purple-500';
      case 'installed': return 'bg-indigo-500';
      case 'confirmed': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'production': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'installed': return 'bg-indigo-100 text-indigo-800';
      case 'confirmed': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Resumen de Pedidos</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total de pedidos</span>
              <span className="font-semibold text-gray-900">{stats.total}</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="space-y-2">
              {Object.entries(stats)
                .filter(([key]) => key !== 'total')
                .map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}></div>
                      <span className="text-sm text-gray-600">{getStatusLabel(status)}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Distribución de Estados</h2>
          <div className="flex items-end h-48">
            {Object.entries(stats)
              .filter(([key, value]) => key !== 'total' && value > 0)
              .map(([status, count]) => {
                const percentage = Math.round((count / stats.total) * 100);
                return (
                  <div 
                    key={status} 
                    className="flex-1 flex flex-col items-center mx-1"
                  >
                    <div className="text-xs font-medium mb-1">{percentage}%</div>
                    <div 
                      className={`w-full ${getStatusColor(status)} rounded-t`} 
                      style={{ height: `${percentage}%` }}
                    ></div>
                    <div className="text-xs mt-1 text-gray-600 truncate w-full text-center">
                      {getStatusLabel(status).substring(0, 4)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Todos los Pedidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medida</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{order.id.substring(0, 6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;