import { Products } from "./products.model";

export class Cart {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  total:number;

  constructor(product: Products){
      this.id = product.id;
      this.name = product.name;
      this.imageUrl = product.imagePath;
      this.description = product.description;
      this.price = product.price;
      this.quantity = 1;
      this.total = this.quantity*this.price;
  }
}
