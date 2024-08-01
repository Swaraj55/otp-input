import { TestBed } from '@angular/core/testing';

import { NgxOtpService } from './ngx-otp.service';

describe('NgxOtpService', () => {
  let service: NgxOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
