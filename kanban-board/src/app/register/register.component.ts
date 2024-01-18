import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router: Router, private auth: Auth) {}

  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
