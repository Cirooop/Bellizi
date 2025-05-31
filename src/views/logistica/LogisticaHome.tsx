import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getOrdersByStatus, updateOrderStatus } from "../../data/orders";
import { Order } from "../../types";

const LogisticaHome: React.FC = () => {
  const [readyOrders, setReadyOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetched = getOrdersByStatus("ready");
    setReadyOrders(fetched);
  }, []);

  const handleMarkDelivered = (orderId: string) => {
    updateOrderStatus(orderId, "delivered");
    setReadyOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pedidos Listos para Entregar ({readyOrders.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {readyOrders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-800">
                Pedido #{order.id.substring(0, 6)}
              </h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                Listo
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Cliente:</h4>
              <p className="text-sm text-gray-800 font-medium">
                {order.clientName}
              </p>
              <p className="text-sm text-gray-600">{order.clientPhone}</p>
              <p className="text-sm text-gray-600">{order.clientEmail}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                Dirección de Entrega:
              </h4>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800 font-medium">
                  {order.address}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Producto:</h4>
              <p className="text-sm text-gray-600 mb-1">
                Cortina Roller {order.size}
              </p>
              <ul className="text-sm text-gray-600 mb-1">
                {order.components.map((c) => (
                  <li key={c.id}>
                    {c.type} × {c.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                Información de Envío:
              </h4>
              <div className="bg-gray-50 p-3 rounded">
                <div className="flex justify-between text-sm mb-1">
                  <span>Peso estimado:</span>
                  <span className="font-medium">2.5 kg</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Dimensiones paquete:</span>
                  <span className="font-medium">
                    {order.width && order.height
                      ? Math.max(order.width, order.height) + 10 + " cm"
                      : "Medida desconocida"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Zona de entrega:</span>
                  <span className="font-medium">CABA/GBA</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleMarkDelivered(order.id)}
              variant="success"
              size="sm"
              className="w-full"
            >
              Marcar como Entregado
            </Button>
          </div>
        ))}
      </div>

      {readyOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            No hay pedidos listos para entregar
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Los pedidos aparecerán aquí cuando estén listos desde fábrica
          </p>
        </div>
      )}
    </Card>
  );
};

export default LogisticaHome;
