import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxOtpComponent } from './ngx-otp.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    NgxOtpComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,

    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    NgxOtpComponent
  ]
})
export class NgxOtpCodeInputModule  { }
