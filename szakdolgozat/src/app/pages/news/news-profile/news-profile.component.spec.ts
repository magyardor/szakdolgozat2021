import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsProfileComponent } from './news-profile.component';

describe('NewsProfileComponent', () => {
  let component: NewsProfileComponent;
  let fixture: ComponentFixture<NewsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
