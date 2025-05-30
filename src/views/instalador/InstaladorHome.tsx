import React, { useState, useEffect } from 'react';
import { getOrdersByStatus, updateOrderStatus } from '../../data/orders';
import { Order } from '../../types';

const InstaladorHome = () => {
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Get orders that have been delivered
    const orders = getOrdersByStatus('delivered');
    setDeliveredOrders(orders);
  }, []);

  // Mark order as installed
  const handleMarkAsInstalled = (orderId: string) => {
    updateOrderStatus(orderId, 'installed');
    
    // Update local state
    setDeliveredOrders(deliveredOrders.filter(order => order.id !== orderId));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Instalaciones Asignadas</h1>
      
      {deliveredOrders.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-500">No hay instalaciones pendientes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveredOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Instalación #{order.id.substring(0, 6)}</h3>
                  <p className="text-sm text-gray-500">
                    Fecha de entrega: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Pendiente de instalación
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Cliente:</h4>
                <p className="text-sm text-gray-900">{order.clientName}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Dirección:</h4>
                <p className="text-sm text-gray-900">{order.address}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Producto:</h4>
                <p className="text-sm text-gray-900">Cortina Roller {order.size}</p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleMarkAsInstalled(order.id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                >
                  Marcar como Instalado
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstaladorHome;