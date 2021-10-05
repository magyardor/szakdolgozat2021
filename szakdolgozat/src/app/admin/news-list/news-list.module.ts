import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/service/guards/auth.guard";
import { SharedModule } from "src/app/shared/shared.module";
import { NewsListComponent } from "./news-list.component";
import { AddNewsComponent } from './add-news/add-news.component';


const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'create',
    component: AddNewsComponent,
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'edit/:newsId',
    component: AddNewsComponent,
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
  declarations: [
    NewsListComponent,
    AddNewsComponent
  ]
})
export class NewsListModule{}
