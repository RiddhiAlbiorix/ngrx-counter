import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../modals/AuthResponseData.modal';
import { User } from '../modals/user.modal';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  formateUser(data: AuthResponseData) {
    const user = new User(data.email, data.accessToken, data.id, data.username);
    return user;
  }

  signup(email:string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(AUTH_API + 'signup', {
      email,
      password
    }, httpOptions);
  }

  getErrorMessage(message: string) {
    console.log('message', message)
    switch (message) {
      case 'User Not Found!':
        return 'Email Not Found';
      case 'Invalid Password':
        return 'Invalid Password';
      case 'Failed! Email is already in use!':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    // const todaysDate = new Date().
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if(userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;
    } 
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
  }
}
