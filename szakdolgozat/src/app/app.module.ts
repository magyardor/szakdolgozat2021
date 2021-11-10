import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewsComponent } from './pages/news/news.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './container/footer/footer.component';
import { JwtInterceptor } from './service/interceptors/jwt.interceptor';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from './service/interceptors/error.interceptor';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { ToolbarComponent } from './container/toolbar/toolbar.component';
import { NewsProfileComponent } from './pages/news/news-profile/news-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductsProfileComponent } from './pages/products/products-profile/products-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ProductsComponent,
    ContactComponent,
    HomeComponent,
    ContainerComponent,
    FooterComponent,
    AdminComponent,
    NavbarComponent,
    ToolbarComponent,
    NewsProfileComponent,
    ShoppingCartComponent,
    ProductsProfileComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
