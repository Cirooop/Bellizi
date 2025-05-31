import  { useState, useEffect } from 'react';
import { getOrdersByStatus, updateOrderStatus } from '../../data/orders';
import { Order } from '../../types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const ClienteHome = () => {
  const [installedOrders, setInstalledOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Get orders that have been installed but not confirmed
    const orders = getOrdersByStatus('installed');
    setInstalledOrders(orders);
    
    // If there's only one order, select it automatically
    if (orders.length === 1) {
      setSelectedOrder(orders[0]);
    }
  }, []);

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleConfirm = (isConfirmed: boolean) => {
    if (selectedOrder) {
      // Update order status to confirmed
      updateOrderStatus(selectedOrder.id, 'confirmed');
      
      // Show confirmation message
      setShowConfirmation(true);
      
      // Update local state
      setInstalledOrders(installedOrders.filter(order => order.id !== selectedOrder.id));
      setSelectedOrder(null);
      
      // If not confirmed, in a real app you might create a ticket
      if (!isConfirmed) {
        // Here you would create a ticket or notify admin
        console.log('Cliente no conforme, crear ticket');
      }
    }
  };

  if (showConfirmation) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="text-green-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por su confirmación!</h2>
          <p className="text-gray-600 mb-6">Hemos registrado su respuesta.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Confirmación de Instalación</h1>
      
      {installedOrders.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-500">No hay instalaciones pendientes de confirmar.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {installedOrders.length > 1 && !selectedOrder && (
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Seleccione una instalación</h2>
              <div className="space-y-3">
                {installedOrders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => handleOrderSelect(order)}
                    className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium">Cortina Roller {order.size}</div>
                    <div className="text-sm text-gray-500">Instalada el {new Date(order.createdAt).toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {selectedOrder && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Confirmar instalación</h2>
              
              <div className="mb-6">
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="font-medium text-gray-800">Detalles de la instalación:</div>
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex justify-between py-1">
                      <span>Producto:</span>
                      <span>Cortina Roller {selectedOrder.size}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Fecha de instalación:</span>
                      <span>{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Dirección:</span>
                      <span>{selectedOrder.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-800 mb-6">
                    ¿Quedó conforme con la instalación?
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleConfirm(true)}
                      className="flex flex-col items-center bg-green-50 text-green-700 px-6 py-4 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <ThumbsUp className="w-8 h-8 mb-2" />
                      <span>Sí, conforme</span>
                    </button>
                    
                    <button
                      onClick={() => handleConfirm(false)}
                      className="flex flex-col items-center bg-red-50 text-red-700 px-6 py-4 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <ThumbsDown className="w-8 h-8 mb-2" />
                      <span>No, tengo problemas</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClienteHome;