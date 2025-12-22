import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'ngx-otp-code-input';
  
  // Form values (what user edits)
  formLength: number = 4;
  formMask: boolean = false;
  formIntegerOnly: boolean = false;
  formDisabled: boolean = false;
  formReadonly: boolean = false;
  formAutofocus: boolean = true;
  formTabIndex: boolean = false;
  formVariant: 'outline' | 'fill' = 'outline';
  formAnimationType: 'fade' | 'slide' | 'zoom' = 'fade';
  formAnimationDuration: string = '0.3s';
  formStatus: 'success' | 'failed' | null = null;
  formSuccessIcon: string = 'check_circle';
  formFailureIcon: string = 'cancel';
  formInputClass: string = '';
  formRegex: string = '';
  
  // Applied values (what component uses)
  length: number = 4;
  mask: boolean = false;
  integerOnly: boolean = false;
  disabled: boolean = false;
  readonly: boolean = false;
  autofocus: boolean = true;
  tabIndex: boolean = false;
  variant: 'outline' | 'fill' = 'outline';
  animationType: 'fade' | 'slide' | 'zoom' = 'fade';
  animationDuration: string = '0.3s';
  status: 'success' | 'failed' | null = null;
  successIcon: string = 'check_circle';
  failureIcon: string = 'cancel';
  inputClass: string = '';
  regex: string = '';
  
  // Demo value
  demoValue: string = '';
  
  // Event logs
  eventLogs: Array<{type: string, value: string, timestamp: Date}> = [];
  
  // Code preview
  codePreview: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Initialize form values to match applied values
    this.formLength = this.length;
    this.formMask = this.mask;
    this.formIntegerOnly = this.integerOnly;
    this.formDisabled = this.disabled;
    this.formReadonly = this.readonly;
    this.formAutofocus = this.autofocus;
    this.formTabIndex = this.tabIndex;
    this.formVariant = this.variant;
    this.formAnimationType = this.animationType;
    this.formAnimationDuration = this.animationDuration;
    this.formStatus = this.status;
    this.formSuccessIcon = this.successIcon;
    this.formFailureIcon = this.failureIcon;
    this.formInputClass = this.inputClass;
    this.formRegex = this.regex;
    
    this.updateCodePreview();
  }

  onOtpComplete(event: string): void {
    this.addEventLog('otpComplete', event);
    
    // Simulate validation
    if (event === '1234') {
      this.status = 'success';
      setTimeout(() => {
        this.status = null;
      }, 2000);
    } else if (event.length === this.length) {
      this.status = 'failed';
      setTimeout(() => {
        this.status = null;
      }, 2000);
    }
  }

  onOtpChange(event: string): void {
    this.demoValue = event;
    this.addEventLog('otpChange', event);
    this.updateCodePreview();
  }

  addEventLog(type: string, value: string): void {
    this.eventLogs.unshift({
      type,
      value,
      timestamp: new Date()
    });
    
    // Keep only last 10 logs
    if (this.eventLogs.length > 10) {
      this.eventLogs = this.eventLogs.slice(0, 10);
    }
  }

  updateCodePreview(): void {
    const config: any = {
      '[length]': this.length,
      '[mask]': this.mask,
      '[integerOnly]': this.integerOnly,
      '[disabled]': this.disabled,
      'variant': `"${this.variant}"`,
      '[readonly]': this.readonly,
      '[autofocus]': this.autofocus,
      '[animationConfig]': `{ type: '${this.animationType}', duration: '${this.animationDuration}' }`,
      '[status]': this.status !== null ? `"${this.status}"` : 'null',
      '[successIcon]': `"${this.successIcon}"`,
      '[failureIcon]': `"${this.failureIcon}"`,
      '[tabIndex]': this.tabIndex
    };

    if (this.regex) {
      config['[regex]'] = `"${this.regex}"`;
    }

    if (this.inputClass) {
      config['[inputClass]'] = `"${this.inputClass}"`;
    }

    const props = Object.entries(config)
      .map(([key, value]) => `  ${key}="${value}"`)
      .join('\n');

    this.codePreview = `<ngx-otp-code-input\n${props}\n  (otpChange)="onOtpChange($event)"\n  (otpComplete)="onOtpComplete($event)">\n</ngx-otp-code-input>`;
  }

  applyChanges(): void {
    // Apply form values to component values
    this.length = this.formLength;
    this.mask = this.formMask;
    this.integerOnly = this.formIntegerOnly;
    this.disabled = this.formDisabled;
    this.readonly = this.formReadonly;
    this.autofocus = this.formAutofocus;
    this.tabIndex = this.formTabIndex;
    this.variant = this.formVariant;
    this.animationType = this.formAnimationType;
    this.animationDuration = this.formAnimationDuration;
    this.status = this.formStatus;
    this.successIcon = this.formSuccessIcon;
    this.failureIcon = this.formFailureIcon;
    this.inputClass = this.formInputClass;
    this.regex = this.formRegex;
    
    // Clear demo value and status
    this.demoValue = '';
    this.status = null;
    
    // Update code preview
    this.updateCodePreview();
    
    // Trigger change detection
    this.cdr.detectChanges();
    
    // Clear inputs when length changes
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[data-index]');
      inputs.forEach((input: any) => {
        input.value = '';
      });
      // Focus first input if autofocus is enabled
      const firstInput = document.querySelector('input[data-index="0"]') as HTMLInputElement;
      if (firstInput && this.autofocus) {
        firstInput.focus();
      }
    }, 0);
  }

  clearOtp(): void {
    this.demoValue = '';
    this.status = null;
    this.eventLogs = [];
    // Reset all inputs
    const inputs = document.querySelectorAll('input[data-index]');
    inputs.forEach((input: any) => {
      input.value = '';
    });
    // Focus first input
    const firstInput = document.querySelector('input[data-index="0"]') as HTMLInputElement;
    if (firstInput && this.autofocus) {
      firstInput.focus();
    }
  }

  setDemoValue(): void {
    // This will be handled by the input field
  }

  get animationConfig() {
    return {
      type: this.animationType,
      duration: this.animationDuration
    };
  }

  copyCode(): void {
    const textarea = document.createElement('textarea');
    textarea.value = this.codePreview;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show feedback (you could add a toast notification here)
    const btn = document.querySelector('.copy-btn');
    if (btn) {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span class="material-icons">check</span>';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    }
  }

  testSuccess(): void {
    this.status = 'success';
    setTimeout(() => {
      this.status = null;
    }, 2000);
  }

  testFailed(): void {
    this.status = 'failed';
    setTimeout(() => {
      this.status = null;
    }, 2000);
  }
}
