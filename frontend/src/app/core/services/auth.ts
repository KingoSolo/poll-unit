import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl || 'http://localhost:3000'
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

  getCurrentUser():any{
    const token = this.getToken()
    if(!token) return null 
    
    return jwtDecode(token)
  }

  isAdmin():boolean{
    const user = this.getCurrentUser()
    return user?.role === 'admin'
  }

  getMe() {
    return this.http.get(`${this.baseUrl}/users/me`);
  }
}
