import React, { useState, useEffect } from 'react';
import { getOrdersByStatus, updateOrderStatus } from '../../data/orders';
import { Order } from '../../types';

const LogisticaHome = () => {
  const [readyOrders, setReadyOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Get orders ready for delivery
    const orders = getOrdersByStatus('ready');
    setReadyOrders(orders);
  }, []);

  // Mark order as delivered
  const handleMarkAsDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'delivered');
    
    // Update local state
    setReadyOrders(readyOrders.filter(order => order.id !== orderId));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pedidos Listos para Entregar</h1>
      
      {readyOrders.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-500">No hay pedidos listos para entregar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readyOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Pedido #{order.id.substring(0, 6)}</h3>
                  <p className="text-sm text-gray-500">
                    Fecha: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Listo para entregar
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Cliente:</h4>
                <p className="text-sm text-gray-900">{order.clientName}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Dirección de entrega:</h4>
                <p className="text-sm text-gray-900">{order.address}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Detalles:</h4>
                <p className="text-sm text-gray-900">Cortina Roller {order.size}</p>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {order.components.map((component) => (
                    <li key={component.id} className="flex justify-between">
                      <span>{component.type}</span>
                      <span>x{component.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleMarkAsDelivered(order.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                >
                  Marcar como Entregado
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogisticaHome;