import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  me() { return this.http.get<any>(`${this.api}/api/me`); }
}
