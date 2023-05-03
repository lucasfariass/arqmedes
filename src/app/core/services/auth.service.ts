import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  setUser(user: string) {
    this.user.next(user);
  }

  checkUserLogged() {
    const user = sessionStorage.getItem('USER');
    if (user) {
      this.setUser(user);
    }
  }

  getUser() {
    return this.user.asObservable();
  }

  logout() {
    this.user.next('');
    sessionStorage.clear();
  }
}
