import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  private baseUrl = 'https://localhost:3000/'
  constructor(private http:HttpClient){}


    getPolls() {
    return this.http.get(`${this.baseUrl}/polls`);
  }

  
  getPoll(id: number) {
    return this.http.get(`${this.baseUrl}/polls/${id}`);
  }

  // CAST VOTE
  vote(data: any) {
    return this.http.post(`${this.baseUrl}/votes`, data);
  }

  
  getResults(id: number, state?: string) {

    let url = `${this.baseUrl}/polls/${id}/results`;

    if (state) {
      url += `?state=${state}`;
    }

    return this.http.get(url);
  }
}
  

