import { useState, useEffect } from "react";
import { getOrdersByStatus, updateOrderStatus } from "../../data/orders";
import { Order } from "../../types";
import OrderCardInstalador from "../../components/viewInstalador/OrderCardInstalador";
import { toast } from "react-toastify";

const InstaladorHome = () => {
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Get orders that have been delivered
    const orders = getOrdersByStatus("delivered");
    setDeliveredOrders(orders);
  }, []);

  // Mark order as installed
  const handleMarkInstalled = (orderId: string) => {
    updateOrderStatus(orderId, "ready");
    toast.success("Pedido marcado como instalado");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Mis Instalaciones Asignadas
      </h1>

      {deliveredOrders.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-500">No hay instalaciones pendientes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveredOrders.map((order) => (
            <OrderCardInstalador
              key={order.id}
              order={order}
              onMarkInstalled={handleMarkInstalled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InstaladorHome;
