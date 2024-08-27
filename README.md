
# ngx-otp-code-input

ngx-otp-code-input is an Angular component for OTP (One-Time Password) input. This component is highly customizable, allowing for various configurations such as masking, integer-only input, autofocus, and more.

If you like the library, please consider giving it a ⭐ on GitHub.


## Features

- Customizable Length: Specify the number of OTP input fields.
- Masking: Hide input values, useful for password-like behavior.
- Integer Only: Restrict input to only integers.
- Autofocus: Automatically focus on the first input field.
- Read-only and Disabled States: Make the input fields read-only or disabled.
- Tab Index: Control tab navigation between input fields.
- Events: Emit events on OTP change and completion.
- Success/Error Status Feedback: Visually indicate the result of OTP verification with customizable icons and colors.
- Animated Transitions: Smooth transitions or animations when focusing between OTP input fields.


## Installation

Install the package via npm:

```bash
  npm install ngx-otp-code-input
```
    
## Usage

#### Import the Module
Add **NgxOtpCodeInputModule** to your Angular module:
```javascript
import { NgxOtpCodeInputModule } from 'ngx-otp-code-input';

@NgModule({
  declarations: [
    // your components
  ],
  imports: [
    // other modules
    NgxOtpCodeInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

#### Use the Component in Your Template

Add the **ngx-otp-code-input** component to your template:

```javascript
<ngx-otp-code-input
  [length]="6"
  [mask]="false"
  [integerOnly]="false"
  [disabled]="false"
  variant="outline"
  [readonly]="false"
  [autofocus]="true"
  [animationConfig]="{ type: 'slide', duration: '1.0s' }" <!-- Optional: Configure animations -->
  [status]="otpStatus" <!-- Bind this to a variable in your component -->
  [successIcon]="'check_circle'" <!-- Optional: Bind to a custom icon for success -->
  [failureIcon]="'cancel'" <!-- Optional: Bind to a custom icon for failure -->
  [tabIndex]="true"
  (otpChange)="onOtpChange($event)"
  (otpComplete)="onOtpComplete($event)"
></ngx-otp-code-input>

```

#### Handle Events in Your Component

Add event handlers in your component:

```javascript
export class AppComponent {
  otpStatus: 'success' | 'failed' | null = null;

  onOtpComplete(event: string): void {
    console.log('OTP Complete:', event);
  }

  onOtpChange(event: string): void {
    console.log('OTP Change:', event);
  }
}

```
## Configuration

#### Inputs

| Input     | Type     | Default   |   Description          |
| :-------- | :------- | :-------- | :----------------------|
| `length`  | `number` | **4**     | Number of OTP input fields.     |
| `mask`  | `boolean` | **false**     | Hide the input values (like a password field).|
| `integerOnly`  | `boolean` | **false** | Restrict input to only integer values.|
| `disabled`  | `boolean` | **false**     | Disable the input fields.|
| `readonly`  | `boolean` | **false**     | Make the input fields read-only.|
| `autofocus`  | `boolean` | **true**     | Automatically focus on the first input field.|
| `tabIndex`  | `boolean` | **false**     | Enable tab navigation between input fields.|
| `inputClass`  | `string` | **''**     | Custom CSS class for the input fields.|
| `variant`  | `MatFormFieldAppearance` | **'outline', 'fill'**     | Appearance of the Material form field.|
| `regex`  | `string` | **''**     | Custom regex pattern for the input fields.|
| `status` | `any` | **null**   | Visual status of OTP verification.|
| `successIcon`  | `string` | **'check_circle'**     | Custom icon for success status.|
| `failureIcon`  | `string` | **'error'**     | Custom icon for failure status.|
| `animationConfig`  | `{ type: string, duration: string }` | **{ type: 'slide', duration: '1.0s' }**     | Configuration for animations when focusing between input fields.|


#### Outputs


| Output | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `otpChange`      | `EventEmitter<string>` | Emits the current OTP value when it changes |
| `otpComplete`      | `EventEmitter<string>` | Emits the OTP value when all fields are filled. |


## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes. 🚀


## License

[MIT](https://github.com/Swaraj55/otp-input/blob/master/LICENSE)

