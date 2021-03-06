export interface Orders {
  id: any;
  orders: any;
}

export interface Order {
  carts: Carts[];
  data: Data[];
  transport: number;
  pay: string;
}
export interface Carts {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Data {
  city: string;
  city_transport: string;
  email: string;
  fullName: string;
  fullName_transport: string;
  phone: number;
  street: string;
  street_transport: string;
  taxNumber: number;
  taxNumber_transport: number;
  zipCode: number;
  zipCode_transport: number;
}
