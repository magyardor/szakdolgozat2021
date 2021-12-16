import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products } from 'src/app/models/products.model';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Products[] = [];
  private prodUpdated = new Subject<Products[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) { }

  getProducts() {
    this.http.get<{message: string, products: any}>( environment.apiUrl + "/api/products")
    .pipe(map(productsData => {
        return productsData.products.map((product: any) => {
          return {
            name: product.name,
            description: product.description,
            id: product._id,
            imagePath: environment.apiUrl + product.imagePath,
            price: product.price,
            productsGroup: product.productsGroup
          };
        });
      })
    ).subscribe(transformData => {
      this.products = transformData;
      this.prodUpdated.next([...this.products]);
    });
  }

  getprodUpdatedListener() {
    return this.prodUpdated.asObservable();
  }

  getProduct(id: any) {
    return this.http.get<{_id: any, name: string, description: string, imagePath: string, price: number, productsGroup: any}>( environment.apiUrl + "/api/products/" + id)
  }

  addProducts(name: string, description: string, image: File | string, price: any, productsGroup: any) {
    const productsData = new FormData();
    productsData.append("name", name);
    productsData.append("description", description);
    productsData.append("image", image, name);
    productsData.append("price", price);
    productsData.append("productsGroup", productsGroup);
    this.http.post<{message: string, products: Products}>( environment.apiUrl + "/api/products", productsData)
    .subscribe(responseData => {
      const products: Products = {
        id: responseData.products.id,
        name: name,
        description: description,
        imagePath: responseData.products.imagePath,
        price: price,
        productsGroup: productsGroup
      };
      this.products.push(products);
      this.prodUpdated.next([...this.products]);
      this.alert.success('ALERT.SUCCESS.ADD')
      this.router.navigate(["/admin/products-list"]);
    }, error => {
      this.alert.error(error.error.message);
    });
  }

  updateProducts(id: any, name: string, description: string, image: File | string, price: any, productsGroup: any){
    let productsData: Products | FormData;
    if(typeof(image) === "object"){
      productsData = new FormData();
      productsData.append("id", id),
      productsData.append("name", name),
      productsData.append("description", description),
      productsData.append("image", image, name),
      productsData.append("price", price),
      productsData.append("productsGroup", productsGroup)
    }
    else{
      productsData = {
        id: id,
        name: name,
        description: description,
        imagePath: image,
        price: price,
        productsGroup: productsGroup
      };
    }
    this.http.put( environment.apiUrl + "/api/products/" + id, productsData)
      .subscribe(response => {
        const updatedProducts = [...this.products];
        const oldProductsIndex = updatedProducts.findIndex(p => p.id === id);
        const products: Products = {
          id: id,
          name: name,
          description: description,
          imagePath: "",
          price: price,
          productsGroup: productsGroup
        };
        updatedProducts[oldProductsIndex] = products;
        this.products = updatedProducts;
        this.prodUpdated.next([...this.products]);
        this.alert.success('ALERT.SUCCESS.MODIFY');
        this.router.navigate(["/admin/products-list"]);
      }, error => {
        this.alert.error(error.error.message);
      });
  }

  deleteProducts(productsID: any) {
    return this.http.delete( environment.apiUrl + "/api/products/" + productsID).subscribe(() =>{
      const updatedProducts = this.products.filter(post => post.id !== productsID);
      this.products = updatedProducts;
      this.prodUpdated.next([...this.products]);
      this.alert.success('ALERT.SUCCESS.DELETE');
    }, error => {
      this.alert.error(error.error.message);
    });
  }

}
