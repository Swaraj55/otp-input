import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'ngx-otp-code-input';
  
  // Configuration properties
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

  ngOnInit(): void {
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

  onConfigChange(): void {
    this.updateCodePreview();
    this.status = null;
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
