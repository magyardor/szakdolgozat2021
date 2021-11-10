import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProfileComponent } from './products-profile.component';

describe('ProductsProfileComponent', () => {
  let component: ProductsProfileComponent;
  let fixture: ComponentFixture<ProductsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
