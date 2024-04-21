export type Table = {
  id: number;
  name: string;
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type MenucardCategory = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type MenucardItem = {
  id: number;
  name: string;
  type: 'FOOD' | 'DRINK' | 'OTHER';
  menucardCategoryId: number;
  price: number;
  onsiteVatId: number;
  deliveryVatId: number;
  discount?: number;
  serviceFee?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type Order = {
  id: number;
  tableId: number;
  serviceDayId: number;
  userId: number;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: number;
  orderId: number;
  menucardItemId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  pin: string;
  role: 'ADMIN' | 'WAITER' | 'MANAGER';
  createdAt: Date;
  updatedAt: Date;
};