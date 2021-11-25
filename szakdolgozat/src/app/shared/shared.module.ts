import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { GoToTopComponent } from './go-to-top/go-to-top.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { TranslateModule } from '@ngx-translate/core';

/* Material import */
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
     /* Material */
     MatBadgeModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatCardModule,
     MatCheckboxModule,
     MatChipsModule,
     MatDatepickerModule,
     MatDialogModule,
     MatExpansionModule,
     MatFormFieldModule,
     MatGridListModule,
     MatIconModule,
     MatInputModule,
     MatListModule,
     MatMenuModule,
     MatNativeDateModule,
     MatPaginatorModule,
     MatProgressSpinnerModule,
     MatRadioModule,
     MatRippleModule,
     MatSelectModule,
     MatSidenavModule,
     MatSlideToggleModule,
     MatSnackBarModule,
     MatSortModule,
     MatStepperModule,
     MatTableModule,
     MatTabsModule,
     MatToolbarModule,
     MatTooltipModule,
     MatTreeModule,
     IvyCarouselModule
  ],
  exports: [
    AlertComponent,
    GoToTopComponent,
    CustomIconComponent,
    BackButtonComponent,
    TranslateModule,
    LanguageSelectorComponent,
     /* Material */
     MatBadgeModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatCardModule,
     MatCheckboxModule,
     MatChipsModule,
     MatDatepickerModule,
     MatDialogModule,
     MatExpansionModule,
     MatFormFieldModule,
     MatGridListModule,
     MatIconModule,
     MatInputModule,
     MatListModule,
     MatMenuModule,
     MatPaginatorModule,
     MatProgressSpinnerModule,
     MatRadioModule,
     MatRippleModule,
     MatSelectModule,
     MatSidenavModule,
     MatSlideToggleModule,
     MatSnackBarModule,
     MatSortModule,
     MatStepperModule,
     MatTableModule,
     MatTabsModule,
     MatToolbarModule,
     MatTooltipModule,
     MatTreeModule,
     IvyCarouselModule
  ],
  declarations: [
    AlertComponent,
    CustomIconComponent,
    GoToTopComponent,
    BackButtonComponent,
    LanguageSelectorComponent
  ],
})
export class SharedModule { }
