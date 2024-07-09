import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthModel, AuthResponse, Cargo, UserModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = `${environment.api}/auth`

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  obterCargos():Observable<Cargo[]>{
    const user = this.authService.getUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user.access_token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<Cargo[]>(`${this.url}/roles`,{headers})

  }


  obterUsuarios(): Observable<UserModel[]> {
    const user = this.authService.getUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user.access_token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<UserModel[]>(`${this.url}/users`, { headers });
  }

  obterUsuarioPorId(id: any): Observable<UserModel> {
    const user = this.authService.getUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user.access_token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<UserModel>(`${this.url}/users/${id}`, { headers });
  }

  apagarUsuario(id: number): Observable<void> {
    const user = this.authService.getUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user.access_token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.delete<void>(`${this.url}/users/${id}`, { headers });
  }

  editarUsuario(userModel: UserModel): Observable<UserModel> {
    const user = this.authService.getUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user.access_token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.put<UserModel>(`${this.url}/users/${userModel.id}`, userModel, { headers });
  }
}
