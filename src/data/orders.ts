import { Order, OrderStatus } from '../types';

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 10);


const parseSize = (size: string): { width: number; height: number } => {
  const match = size.match(/([\d.]+)m\s*x\s*([\d.]+)m/);
  if (match) {
    return {
      width: parseFloat(match[1]) * 100,
      height: parseFloat(match[2]) * 100,
    };
  }
  return { width: 0, height: 0 };
};

// Generate a list of mock orders
export const mockOrders: Order[] = [
  {
    id: generateId(),
    clientName: 'Juan Pérez',
    address: 'Av. Siempreviva 742, Springfield',
    size: '1.5m x 2m',
    ...parseSize('1.5m x 2m'),
    clientPhone: '+54 11 5555-1234',
    clientEmail: 'juan.perez@email.com',
    components: [
      { id: generateId(), type: 'Tubo', description: 'Tubo de aluminio 1.5m', quantity: 1 },
      { id: generateId(), type: 'Tela', description: 'Tela blackout gris 3m²', quantity: 1 },
      { id: generateId(), type: 'Cadena', description: 'Cadena de metal 2m', quantity: 1 },
      { id: generateId(), type: 'Soportes', description: 'Soportes laterales', quantity: 2 },
    ],
    status: 'pending',
    createdAt: new Date(2023, 8, 15),
  },
  {
    id: generateId(),
    clientName: 'María González',
    address: 'Calle Falsa 123, Buenos Aires',
    size: '2m x 1.8m',
    ...parseSize('2m x 1.8m'),
    clientPhone: '+54 11 6666-2345',
    clientEmail: 'maria.gonzalez@email.com',
    components: [
      { id: generateId(), type: 'Tubo', description: 'Tubo de aluminio 2m', quantity: 1 },
      { id: generateId(), type: 'Tela', description: 'Tela screen beige 3.6m²', quantity: 1 },
      { id: generateId(), type: 'Cadena', description: 'Cadena de plástico 2m', quantity: 1 },
      { id: generateId(), type: 'Soportes', description: 'Soportes laterales', quantity: 2 },
    ],
    status: 'production',
    createdAt: new Date(2023, 8, 20),
  },
  {
    id: generateId(),
    clientName: 'Carlos Rodríguez',
    address: 'Av. Corrientes 1234, CABA',
    size: '1.2m x 1.5m',
    ...parseSize('1.2m x 1.5m'),
    clientPhone: '+54 11 7777-3456',
    clientEmail: 'carlos.rodriguez@email.com',
    components: [
      { id: generateId(), type: 'Tubo', description: 'Tubo de aluminio 1.2m', quantity: 1 },
      { id: generateId(), type: 'Tela', description: 'Tela sunscreen blanca 1.8m²', quantity: 1 },
      { id: generateId(), type: 'Cadena', description: 'Cadena de metal 1.5m', quantity: 1 },
      { id: generateId(), type: 'Soportes', description: 'Soportes laterales', quantity: 2 },
    ],
    status: 'ready',
    createdAt: new Date(2023, 8, 22),
  },
  {
    id: generateId(),
    clientName: 'Ana Martínez',
    address: 'Calle Rivadavia 567, Rosario',
    size: '2.5m x 2m',
    ...parseSize('2.5m x 2m'),
    clientPhone: '+54 11 8888-4567',
    clientEmail: 'ana.martinez@email.com',
    components: [
      { id: generateId(), type: 'Tubo', description: 'Tubo de aluminio 2.5m', quantity: 1 },
      { id: generateId(), type: 'Tela', description: 'Tela blackout azul 5m²', quantity: 1 },
      { id: generateId(), type: 'Cadena', description: 'Cadena de metal 2m', quantity: 1 },
      { id: generateId(), type: 'Soportes', description: 'Soportes laterales', quantity: 2 },
    ],
    status: 'delivered',
    createdAt: new Date(2023, 8, 25),
  },
  {
    id: generateId(),
    clientName: 'Luis Sánchez',
    address: 'Av. Santa Fe 987, CABA',
    size: '1.8m x 2.2m',
    ...parseSize('1.8m x 2.2m'),
    clientPhone: '+54 11 9999-5678',
    clientEmail: 'luis.sanchez@email.com',
    components: [
      { id: generateId(), type: 'Tubo', description: 'Tubo de aluminio 1.8m', quantity: 1 },
      { id: generateId(), type: 'Tela', description: 'Tela screen gris 3.96m²', quantity: 1 },
      { id: generateId(), type: 'Cadena', description: 'Cadena de plástico 2.2m', quantity: 1 },
      { id: generateId(), type: 'Soportes', description: 'Soportes laterales', quantity: 2 },
    ],
    status: 'installed',
    createdAt: new Date(2023, 8, 30),
  },
  {
    id: generateId(),
    clientName: 'Laura Torres',
    address: 'Calle Belgrano 432, Córdoba',
    size: '2.2m x 1.6m',
    ...parseSize('2.2m x 1.6m'),
    clientPhone: '+54 11 1010-6789',
    clientEmail: 'laura.torres@email.com',
    components: [
      { id: generateId(), type: 'Tubo', description: 'Tubo de aluminio 2.2m', quantity: 1 },
      { id: generateId(), type: 'Tela', description: 'Tela screen beige 3.52m²', quantity: 1 },
      { id: generateId(), type: 'Cadena', description: 'Cadena de metal 1.6m', quantity: 1 },
      { id: generateId(), type: 'Soportes', description: 'Soportes laterales', quantity: 2 },
    ],
    status: 'confirmed',
    createdAt: new Date(2023, 9, 5),
  },
];

// Store orders in memory (simulating a database)
let orders: Order[] = [...mockOrders];

// Order service functions
export const getOrders = () => {
  return [...orders];
};

export const getOrdersByStatus = (status: OrderStatus) => {
  return orders.filter(order => order.status === status);
};

export const getOrderById = (id: string) => {
  return orders.find(order => order.id === id);
};

export const updateOrderStatus = (id: string, status: OrderStatus) => {
  orders = orders.map(order => 
    order.id === id ? { ...order, status } : order
  );
  return getOrderById(id);
};

export const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
  const newOrder: Order = {
    ...order,
    id: generateId(),
    createdAt: new Date(),
  };
  orders.push(newOrder);
  return newOrder;
};

// Get statistics for admin dashboard
export const getOrderStats = () => {
  return {
    total: orders.length,
    pending: orders.filter(order => order.status === 'pending').length,
    production: orders.filter(order => order.status === 'production').length,
    ready: orders.filter(order => order.status === 'ready').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    installed: orders.filter(order => order.status === 'installed').length,
    confirmed: orders.filter(order => order.status === 'confirmed').length,
  };
};