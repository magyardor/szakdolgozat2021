import { Products } from "./products.model";

export class Carts {
  id: number;
  name: string;
  imageUrl: string;
  price: number;

  quantity: number;

  constructor(product: Products){
      this.id = product.id;
      this.name = product.name;
      this.imageUrl = product.imagePath;
      this.price = product.price;
      this.quantity = 1;
  }
}
