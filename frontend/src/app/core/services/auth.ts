import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/v1'
  constructor(private http:HttpClient){}

  signup(data:any){
    return this.http.post(`${this.baseUrl}/auth/signup`,data)
  }

  login(data:any){
    return this.http.post(`${this.baseUrl}/auth/login`,data)
  }

  saveToken(token:string){
    localStorage.setItem('token',token)
  }

  logout(){
    localStorage.removeItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!this.getToken()
  }

  getCurrentuser():any{
    const token = this.getToken()
    if(!token) return null 
    
    return jwtDecode(token)
  }

  isAdmin():boolean{
    const user = this.getCurrentuser()
    return user?.role === 'admin'
  }
}
