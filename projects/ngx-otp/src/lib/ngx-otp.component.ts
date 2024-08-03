import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'ngx-otp',
  templateUrl: './ngx-otp.component.html',
  styleUrls: ['./ngx-otp.component.scss']
})
export class NgxOtpComponent implements OnInit, OnChanges {

  @ViewChildren('otpInput') otpInput!: QueryList<ElementRef>;;
  
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() autofocus: boolean = true; // true by default
  @Input() mask: boolean = false; // Essentially used to hide the value, similar to how it is done for password inputs.
  @Input() integerOnly: boolean = false; // The input will only accept integer values; any other characters will be ignored.
  @Input() tabIndex: boolean = false;

  @Input() length: number = 4; // or 6

  @Input() inputClass: string = '';
  @Input() variant: MatFormFieldAppearance = 'outline';
  @Input() regex: string = '';
 

  // Emitters
  @Output() onOtpChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onOtpComplete: EventEmitter<string> = new EventEmitter<string>();

  otpControls: Array<any> = new Array(4).fill(null);

  constructor(private renderer: Renderer2) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.otpControls = new Array(this.length).fill(null)
  }

  onInputChange(event: Event, index: number) {
    let userInput = event.target as HTMLInputElement;

    // Validate input based on the integerOnly and regex properties
    if (this.integerOnly) {
      userInput.value = userInput.value.replace(/[^0-9]/g, '');
    } else if (this.regex) {
      const regex = new RegExp(this.regex);
      if (!regex.test(userInput.value)) {
        userInput.value = '';
      }
    }

    // Set the value and emit changes
    this.otpControls[index] = userInput.value;
    console.log(this.otpControls)
    const otpValue = this.otpControls.join('');
    this.onOtpChange.emit(otpValue);

    // Move focus to the next input if applicable
    if (userInput.value&& index < this.otpInput.length  - 1) {
      const nextInput = this.otpInput.toArray()[index];
      if (nextInput) {
        nextInput.nativeElement.focus();
        nextInput.nativeElement.value = '';
      }
    }

    // Check if the OTP is complete
    if (otpValue.length === this.length) {
      this.onOtpComplete.emit(otpValue);
    }
  }


  onKeyDown(event: any, index: number) {
    if (event.key === 'Backspace' && index > 0) {
      event.preventDefault();
      
      // Clear the current input value
      this.otpControls[index] = '';
      
      // Move focus to the previous input if applicable
      if (index > 0) {
        const previousInput = this.otpInput.toArray()[index - 1];
        if (previousInput) {
          previousInput.nativeElement.focus();
        }
      }
    }
  }
}
