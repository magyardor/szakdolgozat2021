import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AszfComponent } from './aszf.component';

describe('AszfComponent', () => {
  let component: AszfComponent;
  let fixture: ComponentFixture<AszfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AszfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AszfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
