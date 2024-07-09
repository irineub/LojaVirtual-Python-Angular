import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthModel, AuthResponse, Cargo, UserModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BuyModel } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class BuyProductService {
    private url = `${environment.api}/buy`
  
    constructor(private httpClient: HttpClient, private authService: AuthService) {}
  
    obterComprados():Observable<BuyModel[]>{
      const user = this.authService.getUser();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',
      });
      return this.httpClient.get<BuyModel[]>(`${this.url}/sold`,{headers})
  
    }   
    postarCompra(bought: BuyModel):Observable<BuyModel>{
        const user = this.authService.getUser();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.access_token}`,     
            'Content-Type': 'application/json'
        });
        return this.httpClient.post<BuyModel>(`${this.url}`, bought, { headers });
    }
  
  
    obterProdutosMaisVendidos(){
      const user = this.authService.getUser();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(`${this.url}/top-products`, { headers });
    }
  
    obterCategoriasMaisVendidas(){
      const user = this.authService.getUser();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(`${this.url}/top-categories`, { headers });
    }
  
    
  }
  