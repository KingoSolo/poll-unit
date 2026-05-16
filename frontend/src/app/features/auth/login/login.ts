import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, MatIconModule, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit{
  loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService : AuthService,
    private router : Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){ 
    this.loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })
}

  login(){
    if(this.loginForm.invalid){
      return
    }

    this.authService
      .login(this.loginForm.value)
      .subscribe({
        next:(res:any) => {
          this.authService.saveToken(res.access_token)

          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });

          const user = this.authService.getCurrentUser();

          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }

        },

        error: (err) => {
          this.snackBar.open(err?.error?.message || 'Login failed', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        }
      })
  }

}
