import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  email: string;
  password: string;
  displayName: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  signUp(){
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.signUp(email,password,displayName)
    .then(resolve => {
      alert("Sign up complete!");
      setTimeout(() => {
        this.router.navigate(['chat']);


      }, 1000);
    })
    .catch(error => this.errorMessage = error.message)
  }

  googleLogin() {
    this.authService.googleLogin();
    setTimeout(() => {
      this.router.navigate(['chat']);


    }, 1000);  }
}
