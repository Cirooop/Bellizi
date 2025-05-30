// Order related types
export type OrderStatus = 'pending' | 'production' | 'ready' | 'delivered' | 'installed' | 'confirmed';

export interface Component {
  id: string;
  type: string;
  description: string;
  quantity: number;
}

export interface Order {
  id: string;
  clientName: string;
  address: string;
  size: string;
  components: Component[];
  status: OrderStatus;
  createdAt: Date;
}

// Size related types
export interface Size {
  id: string;
  name: string;
  width: number;
  height: number;
}