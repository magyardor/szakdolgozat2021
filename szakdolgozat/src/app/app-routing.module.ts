import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { AszfComponent } from './container/footer/aszf/aszf.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsProfileComponent } from './pages/news/news-profile/news-profile.component';
import { NewsComponent } from './pages/news/news.component';
import { ProductsProfileComponent } from './pages/products/products-profile/products-profile.component';
import { ProductsComponent } from './pages/products/products.component';
import { PayPageComponent } from './pages/shopping-cart/pay-page/pay-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { SharedModule } from './shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PrivacyComponent } from './container/footer/privacy/privacy.component';
import { GuideComponent } from './container/footer/guide/guide.component';
import { PaymentComponent } from './container/footer/payment/payment.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'products/:id',
        component: ProductsComponent,
      },
      {
        path: 'products-profile/:id',
        component: ProductsProfileComponent,
      },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'news-profile/:id',
        component: NewsProfileComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'carts',
        component: ShoppingCartComponent,
      },
      {
        path: 'pay',
        component: PayPageComponent
      },
      {
        path:'aszf',
        component: AszfComponent,
      },
      {
        path: 'privacy',
        component: PrivacyComponent
      },
      {
        path: 'guide',
        component: GuideComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot(),
  ],
  exports: [RouterModule, SharedModule]
})
export class AppRoutingModule { }
