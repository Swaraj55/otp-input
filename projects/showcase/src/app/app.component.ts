import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'showcase';
  otpStatus: 'success' | 'failed' | null = null;

  ngOnInit(): void {
    setTimeout(() => {
      this.otpStatus = null
    }, 2000)
  }

  onOtpComplete(event:any):void {
    console.log('onOtpComplete..',event);
  }

  onOtpChange(event:any):void {
    console.log('onOtpChange..',event);
  }
}
