import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router: Router, private auth: Auth) {}

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
