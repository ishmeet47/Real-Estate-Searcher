import { Injectable } from '@angular/core';
import { UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUser(user: UserForRegister) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  authUser(user: UserForRegister) {
    let UserArray = [];
    if (localStorage.getItem('Users')) {
      UserArray = JSON.parse(localStorage.getItem('Users'));
    }
    return UserArray.find(
      (p) => p.userName === user.userName && p.password === user.password
    );
  }

  constructor() {}
}
