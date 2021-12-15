import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Group, Products } from 'src/app/models/products.model';
import { AlertService } from 'src/app/service/alert.service';
import { ProductsService } from 'src/app/service/products/products.service';
import { GroupService } from 'src/app/service/productsGroups/group.service';
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
  groupSub: any;
  groupList: Group[] = [];
  private mode = "create";
  private productsId!: any;

  constructor(
    public productsService: ProductsService,
    private group: GroupService,
    public route: ActivatedRoute,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.getGroupList();
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      price: new FormControl(null, {validators: [Validators.required]}),
      productsGroup: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productsId")) {
        this.mode = "edit";
        this.productsId = paramMap.get("productsId");
        this.isLoading = true;
        this.productsService.getProduct(this.productsId).subscribe(productsData => {
          this.isLoading = false;
          this.products = {
            id: productsData._id,
            name: productsData.name,
            description: productsData.description,
            imagePath: productsData.imagePath,
            price: productsData.price,
            productsGroup: productsData.productsGroup
          };
          this.form.setValue({
            name: this.products.name,
            description: this.products.description,
            image: this.products.imagePath,
            price: this.products.price,
            productsGroup: this.products.productsGroup
          });
        });
      } else {
        this.mode = "create";
        this.productsId = '';
      }
    });
  }

  async getGroupList() {
    await this.group.getGroups();
    this.groupSub = this.group.getgroupUpdatedListener()
    .subscribe(group => {
      this.groupList = group;
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
      this.alertService.warn('ALERT.WARN.INVALID_FORM');
      this.form.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.productsService.addProducts(
        this.form.value.name,
        this.form.value.description,
        this.form.value.image,
        this.form.value.price,
        this.form.value.productsGroup
      )
    }
    else {
      this.productsService.updateProducts(
        this.productsId,
        this.form.value.name,
        this.form.value.description,
        this.form.value.image,
        this.form.value.price,
        this.form.value.productsGroup
      );
    }
    this.form.reset();

  }

}
