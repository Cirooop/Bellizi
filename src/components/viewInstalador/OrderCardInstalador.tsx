import { Order } from "../../types";
import Button from "../ui/Button";

interface Props {
  order: Order;
  onMarkInstalled: (id: string) => void;
}

const OrderCardInstalador = ({ order, onMarkInstalled }: Props) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-800">{order.id}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
          Entregado
        </span>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Información del Cliente:</h4>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium text-gray-800">{order.clientName}</p>
          <p className="text-sm text-gray-600">{order.clientPhone}</p>
          <p className="text-sm text-gray-600 mt-1">{order.address}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Detalles de Instalación:</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Dimensiones:</span>
            <span className="font-medium">
              {order.width} x {order.height} cm
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Componentes:</span>
            <span className="font-medium">{order.components.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tamaño:</span>
            <span className="font-medium">{order.size}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => onMarkInstalled(order.id)}
        variant="success"
        size="sm"
        className="w-full"
      >
        Marcar como Instalado
      </Button>
    </div>
  );
};

export default OrderCardInstalador;
