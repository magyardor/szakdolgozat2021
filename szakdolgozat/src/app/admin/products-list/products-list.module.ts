import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/service/guards/auth.guard";
import { SharedModule } from "src/app/shared/shared.module";
import { ProductsListComponent } from "./products-list.component";
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'add-products',
    component: AddProductsComponent,
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'edit-products',
    component: AddProductsComponent,
    /* canActivate: [AuthGuard] */
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    AddProductsComponent,
    ProductsListComponent,
  ]
})
export class ProductsListModule{}
