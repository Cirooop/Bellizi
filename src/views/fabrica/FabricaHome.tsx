import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Order } from '../../types';
import { getOrdersByStatus, updateOrderStatus } from '../../data/orders';

const FabricaHome = () => {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [productionOrders, setProductionOrders] = useState<Order[]>([]);

  useEffect(() => {
    setPendingOrders(getOrdersByStatus('pending'));
    setProductionOrders(getOrdersByStatus('production'));
  }, []);

  const handleStartProduction = (orderId: string) => {
    const updatedOrder = updateOrderStatus(orderId, 'production');
    if (updatedOrder) {
      setPendingOrders(prev => prev.filter(order => order.id !== orderId));
      setProductionOrders(prev => [...prev, updatedOrder]);
    }
  };

  const handleMarkAsReady = (orderId: string) => {
    updateOrderStatus(orderId, 'ready');
    setProductionOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pendientes */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Pedidos Pendientes de Fabricación ({pendingOrders.length})
            </h2>

            <div className="space-y-4">
              {pendingOrders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-800">#{order.id.substring(0, 6)}</h3>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pendiente</span>
                  </div>

                  <div className="mb-4 text-sm text-gray-700">
                    <p className="mb-1">Cliente: {order.clientName}</p>
                    <p className="mb-1">Medida: {order.size}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Componentes a Fabricar:</h4>
                    <div className="bg-gray-50 p-3 rounded">
                      {order.components.map(c => (
                        <div key={c.id} className="flex justify-between py-1 text-sm">
                          <span>{c.description}</span>
                          <span>x{c.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleStartProduction(order.id)}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Iniciar Producción
                  </Button>
                </div>
              ))}

              {pendingOrders.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No hay pedidos pendientes de fabricación
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* En Producción */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              En Producción ({productionOrders.length})
            </h2>

            <div className="space-y-4">
              {productionOrders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-800">#{order.id.substring(0, 6)}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">En Producción</span>
                  </div>

                  <div className="mb-4 text-sm text-gray-700">
                    <p className="mb-1">Cliente: {order.clientName}</p>
                    <p className="mb-1">Medida: {order.size}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Componentes en fabricación:</h4>
                    <div className="bg-green-50 p-3 rounded">
                      {order.components.map(c => (
                        <div key={c.id} className="flex justify-between py-1 text-sm">
                          <span>{c.description}</span>
                          <span>x{c.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleMarkAsReady(order.id)}
                    variant="success"
                    size="sm"
                    className="w-full"
                  >
                    Marcar como Listo
                  </Button>
                </div>
              ))}

              {productionOrders.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No hay pedidos en producción
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
  );
};

export default FabricaHome;
