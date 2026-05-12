import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit{
  loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService : AuthService,
    private router : Router
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

          const user = this.authService.getCurrentUser();

          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }

        },

        error: (err) => {
          console.log(err.error.message);
        }
      })
  }

}
