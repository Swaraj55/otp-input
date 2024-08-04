import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'showcase';

  onOtpComplete(event:any):void {
    console.log('onOtpComplete..',event);
  }

  onOtpChange(event:any):void {
    console.log('onOtpChange..',event);
  }
}
