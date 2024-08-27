import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxOtpCodeInputComponent } from './ngx-otp-code-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    NgxOtpCodeInputComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,

    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    NgxOtpCodeInputComponent
  ]
})
export class NgxOtpCodeInputModule  { }
