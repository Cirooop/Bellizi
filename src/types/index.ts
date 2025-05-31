// User and Role related types
export type Role = 'vendedor' | 'fabrica' | 'logistica' | 'instalador' | 'admin' | 'cliente' | null;

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

// Stats related types
export interface OrderStats {
  total: number;
  pending: number;
  production: number;
  ready: number;
  delivered: number;
  installed: number;
  confirmed: number;
}

// Props interfaces for components
export interface LayoutProps {
  children: React.ReactNode;
}

export interface RoleProviderProps {
  children: React.ReactNode;
}

export interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

// Form related types
export interface OrderFormData {
  clientName: string;
  address: string;
  sizeId: string;
}

// Navigation related types
export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}