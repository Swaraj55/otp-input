import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOtpComponent } from './ngx-otp.component';

describe('NgxOtpComponent', () => {
  let component: NgxOtpComponent;
  let fixture: ComponentFixture<NgxOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxOtpComponent]
    });
    fixture = TestBed.createComponent(NgxOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
