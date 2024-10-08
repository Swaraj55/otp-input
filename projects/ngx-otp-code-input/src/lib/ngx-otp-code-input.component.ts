import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChildren } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'ngx-otp-code-input',
  templateUrl: './ngx-otp-code-input.component.html',
  styleUrls: ['./ngx-otp-code-input.component.scss'],
})
export class NgxOtpCodeInputComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChildren('otpInput') otpInput!: QueryList<ElementRef>;

  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() autofocus: boolean = true; // * true by default
  @Input() mask: boolean = false; // * Essentially used to hide the value, similar to how it is done for password inputs.
  @Input() integerOnly: boolean = false; // * The input will only accept integer values; any other characters will be ignored.
  @Input() tabIndex: boolean = false;
  @Input() animationConfig: { type: string, duration: string } = { type: 'fade', duration: '0.3s' };
  @Input() status: 'success' | 'failed' | null = null;
  @Input() successIcon: string = 'check_circle';
  @Input() failureIcon: string = 'cancel';

  @Input() length: number = 4; // or 6

  @Input() inputClass: string = '';
  @Input() variant: MatFormFieldAppearance = 'outline';
  @Input() regex: string = '';

  // Emitters
  @Output() otpChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() otpComplete: EventEmitter<string> = new EventEmitter<string>();

  otpControls: Array<any> = new Array(4).fill(null);

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animationConfig']) {
      this.renderer.setStyle(document.documentElement, '--animation-duration', this.animationConfig.duration);
    }
  }  

  ngOnInit(): void {
    this.otpControls = new Array(this.length).fill(null);
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.otpInput.first.nativeElement.focus();
      this.cdr.detectChanges();
    }
  }

  getAnimationClass(): string {
    return `animate-${this.animationConfig.type}`;
  }  

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const index = Number(input.getAttribute('data-index'));

    // * If integerOnly is true then if user try to enetered non integer value make the field empty
    if (this.integerOnly) {
      input.value = input.value.replace(/\D/g, '');
    }

    if (input.value.length > 0) {
      if (index < this.otpControls.length - 1) {
        this.otpInput.toArray()[index + 1].nativeElement.focus();
      }
    }

    this.updateOtpValue();
  }

  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const index = Number(input.getAttribute('data-index'));
    
    // Prevent non-integer keys if integerOnly is true
    // if (this.integerOnly && !/^[0-9]$/.test(event.key) && event.key !== 'Backspace') {
    //   event.preventDefault();
    // }

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.otpInput.toArray()[index - 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    let pasteData = event.clipboardData?.getData('text').trim() || '';
    console.log('pasteData', pasteData)
    // * If integerOnly is true, filter out non-numeric characters
    if (this.integerOnly && pasteData) {
      pasteData = pasteData.replace(/\D/g, '');
    }
  
    if (pasteData && pasteData.length === this.otpControls.length) {
      this.otpControls.forEach((_, index) => {
        const input = this.otpInput.toArray()[index].nativeElement;
        input.value = pasteData[index];
      });
  
      this.updateOtpValue();
  
      // * Focus on the next input after the last filled input
      const lastIndex = this.otpControls.length - 1;
      this.otpInput.toArray()[lastIndex].nativeElement.focus();
    }
  
    event.preventDefault();
  }  

  updateOtpValue(): void {
    const otpValue = this.otpInput.toArray().map(input => input.nativeElement.value).join('');
    this.otpChange.emit(otpValue); // Emit the OTP value

    // * Check if the OTP is complete
    if (otpValue.length === this.otpControls.length) {
      this.otpComplete.emit(otpValue);
    }
  }
}
