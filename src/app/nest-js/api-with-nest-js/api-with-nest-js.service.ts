import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiWithNestJsService {
  constructor(private http: HttpClient) {}

  get(url: string, data?: any) {
    return this.http.get(`http://localhost:3000/${url}`, data);
  }

  post(url: string, data: any) {
    return this.http.post(`http://localhost:3000/${url}`, data);
  }

  put(url: string, data: any) {
    return this.http.patch(`http://localhost:3000/${url}`, data);
  }

  delete(url: string) {
    return this.http.delete(`http://localhost:3000/${url}`);
  }
}
