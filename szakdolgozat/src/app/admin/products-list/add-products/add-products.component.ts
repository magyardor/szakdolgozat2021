import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Products } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/service/products/products.service';
import { mimeType } from 'src/app/service/validators/mime-type.validator';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  products!: Products;
  isLoading = false;
  form!: FormGroup;
  imagePreview!: string;
  private mode = "add-products";
  private productsId!: any;

  constructor(
    public productsService: ProductsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      price: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productsId")) {
        this.mode = "edit-products";
        this.productsId = paramMap.get("productsId");
        this.isLoading = true;
        this.productsService.getProduct(this.productsId).subscribe(productsData => {
          this.isLoading = false;
          this.products = {id: productsData._id, name: productsData.name, description: productsData.description, imagePath: productsData.imagePath, price: productsData.price};
          this.form.setValue({
            name: this.products.name,
            description: this.products.description,
            image: this.products.imagePath
          });
        });
      } else {
        this.mode = "add-products";
        this.productsId = '';
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddProducts(): void {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'add-products') {
      this.productsService.addProducts(this.form.value.name, this.form.value.description, this.form.value.image, this.form.value.price);
    }
    else {
      this.productsService.updateProducts(this.productsId, this.form.value.name, this.form.value.description, this.form.value.image, this.form.value.price);
    }
    this.form.reset();

  }

}