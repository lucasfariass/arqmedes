import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUser[]>(`${environment.API}/users`);
  }

  getUserById(id: number) {
    return this.http.get<IUser>(`${environment.API}/users/${id}`);
  }

  registerUser(user: IUser) {
    return this.http.post(`${environment.API}/users`, user);
  }

  editUser(user: IUser, id: number) {
    return this.http.put(`${environment.API}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.API}/users/${id}`);
  }
}
