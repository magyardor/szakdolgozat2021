import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatprofileComponent } from './chatprofile.component';

describe('ChatprofileComponent', () => {
  let component: ChatprofileComponent;
  let fixture: ComponentFixture<ChatprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
