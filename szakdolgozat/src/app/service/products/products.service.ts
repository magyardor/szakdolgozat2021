import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products, ProductsGroup } from 'src/app/models/products.model';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { ɵangular_packages_platform_browser_animations_animations_d } from '@angular/platform-browser/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Products[] = [];
  private prodUpdated = new Subject<Products[]>();

  private productsGorup: ProductsGroup[] = [];
  private prodGroupUpdated = new Subject<ProductsGroup[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) { }

  getProducts() {
    this.http.get<{message: string, products: any}>( environment.apiUrl + "products")
    .pipe(map(productsData => {
        return productsData.products.map((product: any) => {
          return {
            name: product.name,
            description: product.description,
            id: product._id,
            parent_id: product.parent_id,
            imagePath: product.imagePath,
            price: product.price
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
    return this.http.get<{_id: any, name: string, description: string, imagePath: string, price: number, parent_id: any}>( environment.apiUrl + "products/" + id)
  }

  addProducts(name: string, description: string, image: File | string, price: any, parent_id: any) {
    const productsData = new FormData();
    productsData.append("name", name);
    productsData.append("description", description);
    productsData.append("image", image, name);
    productsData.append("price", price);
    productsData.append("parent_id", parent_id);
    this.http.post<{message: string, products: Products}>( environment.apiUrl + "products", productsData)
    .subscribe(responseData => {
      const products: Products = {
        id: responseData.products.id,
        name: name,
        parent_id: parent_id,
        description: description,
        imagePath: responseData.products.imagePath,
        price: price
      };
      this.products.push(products);
      this.prodUpdated.next([...this.products]);
      this.alert.success('ALERT.SUCCESS.ADD')
      this.router.navigate(["/admin/products-list"]);
    }, error => {
      this.alert.error(error.error.message);
    });
  }

  updateProducts(id: any, name: string, description: string, image: File | string, price: any, parent_id: any){
    let productsData: Products | FormData;
    if(typeof(image) === "object"){
      productsData = new FormData();
      productsData.append("id", id),
      productsData.append("name", name),
      productsData.append("parent_id", parent_id),
      productsData.append("description", description),
      productsData.append("image", image, name),
      productsData.append("price", price)
    }
    else{
      productsData = {id: id, name: name, description: description, imagePath: image, price: price, parent_id: parent_id};
    }
    this.http.put( environment.apiUrl + "products/" + id, productsData)
      .subscribe(response => {
        const updatedProducts = [...this.products];
        const oldProductsIndex = updatedProducts.findIndex(p => p.id === id);
        const products: Products = {
          id: id,
          name: name,
          parent_id: parent_id,
          description: description,
          imagePath: "",
          price: price
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
    return this.http.delete( environment.apiUrl + "products/" + productsID).subscribe(() =>{
      const updatedProducts = this.products.filter(post => post.id !== productsID);
      this.products = updatedProducts;
      this.prodUpdated.next([...this.products]);
      this.alert.success('ALERT.SUCCESS.DELETE');
    }, error => {
      this.alert.error(error.error.message);
    });
  }

  getProductsGroup() {
    this.http.get<{message: string, productsGorup: any}>( environment.apiUrl + "productsGroup")
    .pipe(map(productsData => {
        return productsData.productsGorup.map((productGroup: any) => {
          return {
            name: productGroup.name,
            id: productGroup._id,
          };
        });
      })
    ).subscribe(transformData => {
      this.productsGorup = transformData;
      this.prodGroupUpdated.next([...this.productsGorup]);
    });
  }

  getprodGorupUpdatedListener() {
    return this.prodGroupUpdated.asObservable();
  }
}
