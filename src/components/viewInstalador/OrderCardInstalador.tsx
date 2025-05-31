import { Order } from "../../types";
import Button from "../ui/Button";

interface Props {
  order: Order;
  onMarkInstalled: (id: string) => void;
}

const OrderCardInstalador = ({ order, onMarkInstalled }: Props) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      {/* ID y estado */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-800">{order.id}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
          Entregado
        </span>
      </div>

      {/* Cliente */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Información del Cliente:</h4>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium text-gray-800">{order.clientName}</p>
          <p className="text-sm text-gray-600">{order.clientPhone}</p>
          <p className="text-sm text-gray-600 mt-1">{order.address}</p>
        </div>
      </div>

      {/* Detalles de instalación */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Detalles de Instalación:</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Producto:</span>
            <span className="font-medium">Cortina Roller</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Dimensiones:</span>
            <span className="font-medium">
              {order.width} x {order.height} cm
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tela:</span>
            <span className="font-medium">Screen 5%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Color:</span>
            <span className="font-medium">Blanco</span>
          </div>
        </div>
      </div>

      {/* Herramientas necesarias */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Herramientas Necesarias:</h4>
        <div className="bg-yellow-50 p-3 rounded">
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Taladro con mechas</li>
            <li>• Destornillador</li>
            <li>• Nivel</li>
            <li>• Metro</li>
            <li>• Lápiz para marcar</li>
          </ul>
        </div>
      </div>

      {/* Tiempo estimado */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Tiempo Estimado:</h4>
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-sm text-blue-800 font-medium">
            45 - 60 minutos por cortina
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Checklist de Instalación:</h4>
        <div className="space-y-2">
          {[
            "Verificar medidas en sitio",
            "Marcar puntos de fijación",
            "Instalar soportes",
            "Montar cortina",
            "Probar funcionamiento",
            "Explicar uso al cliente",
          ].map((item, i) => (
            <label key={i} className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Botón */}
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
