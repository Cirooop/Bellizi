import React, { useState, useEffect } from 'react';
import { getOrdersByStatus, updateOrderStatus } from '../../data/orders';
import { Order } from '../../types';

const FabricaHome = () => {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [productionOrders, setProductionOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'production'>('pending');

  useEffect(() => {
    // Get orders in pending and production status
    const pending = getOrdersByStatus('pending');
    const production = getOrdersByStatus('production');
    
    setPendingOrders(pending);
    setProductionOrders(production);
  }, []);

  // Start production of an order
  const handleStartProduction = (orderId: string) => {
    const updatedOrder = updateOrderStatus(orderId, 'production');
    
    if (updatedOrder) {
      // Update local state
      setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
      setProductionOrders([...productionOrders, updatedOrder]);
    }
  };

  // Mark order as ready
  const handleMarkAsReady = (orderId: string) => {
    updateOrderStatus(orderId, 'ready');
    
    // Update local state
    setProductionOrders(productionOrders.filter(order => order.id !== orderId));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Producción</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'pending'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pendientes ({pendingOrders.length})
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'production'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('production')}
            >
              En Producción ({productionOrders.length})
            </button>
          </nav>
        </div>
        
        <div className="p-4">
          {activeTab === 'pending' && (
            <>
              {pendingOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay pedidos pendientes de producción.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">Pedido #{order.id.substring(0, 6)}</h3>
                          <p className="text-sm text-gray-500">Cliente: {order.clientName}</p>
                          <p className="text-sm text-gray-500">Medida: {order.size}</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Pendiente
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Componentes a fabricar:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {order.components.map((component) => (
                            <li key={component.id} className="flex justify-between">
                              <span>{component.description}</span>
                              <span>x{component.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleStartProduction(order.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                        >
                          Iniciar Producción
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          {activeTab === 'production' && (
            <>
              {productionOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay pedidos en producción.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {productionOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">Pedido #{order.id.substring(0, 6)}</h3>
                          <p className="text-sm text-gray-500">Cliente: {order.clientName}</p>
                          <p className="text-sm text-gray-500">Medida: {order.size}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          En Producción
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Componentes en fabricación:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {order.components.map((component) => (
                            <li key={component.id} className="flex justify-between">
                              <span>{component.description}</span>
                              <span>x{component.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleMarkAsReady(order.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                        >
                          Marcar como Listo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FabricaHome;