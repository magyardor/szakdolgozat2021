import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { AddUserComponent } from './add-user/add-user.component';

import { AuthGuard } from "../service/guards/auth.guard";
import { AdminComponent } from "./admin.component";
import { MessagesComponent } from './messages/messages.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-user',
        component: AddUserComponent,
        /* canActivate: [AuthGuard], */
      },
      {
        path: 'news-list',
        loadChildren: () => import('./news-list/news-list.module').then(m => m.NewsListModule),
       /*  canActivate: [AuthGuard], */
      },
      {
        path: 'products-list',
        loadChildren: () => import('./products-list/products-list.module').then(m => m.ProductsListModule),
        /* canActivate: [AuthGuard], */
      },
      {
        path: 'messages-list',
        component: MessagesComponent,
      },
      {
        path: 'orders-list',
        component: OrdersComponent,
      },
      { path: '**', redirectTo: 'products-list', pathMatch: 'full' },
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    AddUserComponent,
    MessagesComponent,
    OrdersComponent,
  ],
  providers: [AuthGuard]
})
export class AdminModule { }
