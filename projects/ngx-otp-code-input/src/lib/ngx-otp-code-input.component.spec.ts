import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOtpCodeInputComponent } from './ngx-otp-code-input.component';

describe('NgxOtpCodeInputComponent', () => {
  let component: NgxOtpCodeInputComponent;
  let fixture: ComponentFixture<NgxOtpCodeInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxOtpCodeInputComponent]
    });
    fixture = TestBed.createComponent(NgxOtpCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
