export interface Products {
  id: number;
  name: string;
  parent_id: number;
  description: string;
  imagePath: string;
  price: number;
}

export interface ProductsGroup {
  id: number;
  name: string;
}
