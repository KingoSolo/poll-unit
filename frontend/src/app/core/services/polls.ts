import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPolls() {
    return this.http.get(`${this.baseUrl}/polls`);
  }

  getPoll(id: number) {
    return this.http.get(`${this.baseUrl}/polls/${id}`);
  }

  vote(data: any) {
    return this.http.post(`${this.baseUrl}/votes`, data);
  }

  createPoll(data: any) {
    return this.http.post(`${this.baseUrl}/polls`, data);
  }

  updatePoll(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/polls/${id}`, data);
  }

  closePoll(id: number) {
    return this.http.patch(`${this.baseUrl}/polls/${id}/close`, {});
  }

  deletePoll(id: number) {
    return this.http.delete(`${this.baseUrl}/polls/${id}`);
  }

  getResults(id: number, state?: string) {
    let url = `${this.baseUrl}/polls/${id}/results`;
    if (state) {
      url += `?state=${state}`;
    }
    return this.http.get(url);
  }
}
  

