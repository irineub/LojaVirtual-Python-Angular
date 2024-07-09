import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CategoriesModel } from "../models/products.model";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private url = environment.api;

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}

    obterCategorias() {
        return this.httpClient.get<CategoriesModel[]>(`${this.url}/categories`);
    }

    criarCategoria(categoria:CategoriesModel) {
        const user = this.authService.getUser();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.access_token}`,
            'Content-Type': 'application/json'
        });
        return this.httpClient.post<CategoriesModel>(`${this.url}/categories`, categoria, { headers });
    }
    apagarCategoria(id:number) {
        const user = this.authService.getUser();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.access_token}`,
            'Content-Type': 'application/json'
        });
        return this.httpClient.delete<CategoriesModel>(`${this.url}/categories/${id}`, { headers });
    }
}
