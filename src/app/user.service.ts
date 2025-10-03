import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type AppRole = 'CUSTOMER' | 'STAFF' | 'TECHNICIAN' | 'ADMIN';

export interface UserDto {
  id: number;
  email: string;
  roles: AppRole[];
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = '/api/admin/users';

  constructor(private http: HttpClient) {}

  list(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.base);
  }

  get(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.base}/${id}`);
  }

  updateRoles(id: number, roles: AppRole[]): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.base}/${id}`, roles);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
    /** GET /api/me (HomeComponent đang dùng) */
  me() {
    return this.http.get<any>('/api/me');
  }

}
