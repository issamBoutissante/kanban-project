import { Component } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email!: string;
  errorMessage!: string;

  constructor(private auth: Auth) {}

  resetPassword() {
    sendPasswordResetEmail(this.auth, this.email)
      .then(() => {
        // Password reset email sent!
        // ...
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
