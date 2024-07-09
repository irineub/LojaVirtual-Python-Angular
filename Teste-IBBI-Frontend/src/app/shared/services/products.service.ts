import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ProductModel } from "../models/products.model";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class ProductsService {
    private url = environment.api
    constructor(private httpClient: HttpClient, private authService:AuthService){}


    obterProdutos():Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}/products`)
    }
    obterProdutoPorId(id:any):Observable<ProductModel>{
        return this.httpClient.get<ProductModel>(`${this.url}/products/${id}`)
    }
    criarProduto(product: ProductModel):Observable<ProductModel>{
        const user = this.authService.getUser();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.access_token}`,     
            'Content-Type': 'application/json'
        });
        return this.httpClient.post<ProductModel>(`${this.url}/products`, product, { headers });
    }
    apagarProduto(id:number) {
        const user = this.authService.getUser();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.access_token}`,
            'Content-Type': 'application/json'
        });
        return this.httpClient.delete<ProductModel>(`${this.url}/products/${id}`, { headers });
    }
    editarProduto(product: ProductModel):Observable<ProductModel>{
        const user = this.authService.getUser();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.access_token}`,
            'Content-Type': 'application/json'
        });
        return this.httpClient.put<ProductModel>(`${this.url}/products/${product.productId}`,product, { headers });
    }
    
}