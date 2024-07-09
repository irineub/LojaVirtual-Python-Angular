import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthModel, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private url = `${environment.api}/auth`;
  private authData = {
    username: '',
    password: '',
  };
  private userData = null;
  register(username: string, password: string) {
    this.authData.username = username;
    this.authData.password = password;

    return this.httpClient.post<AuthModel>(
      `${this.url}/register`,
      this.authData
    );
  }
  logIn(username: string, password: string) {
    this.authData.username = username;
    this.authData.password = password;

    return this.httpClient.post<AuthModel>(`${this.url}/login`, this.authData);
  }
  setUser(user: any): void {
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(this.userData));
  }
  getUser(): any {
    if (!this.userData) {
      this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    }
    console.log("user em getuser", this.userData)
    return this.userData;
  }

   logOut(): void {
    this.userData = null;
    localStorage.removeItem('user');
    window.location.reload();

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

 
}
