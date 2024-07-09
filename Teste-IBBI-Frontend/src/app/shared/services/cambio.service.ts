import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioDolarService {
   apiUrl = "https://economia.awesomeapi.com.br/USD-BRL/"
  constructor(private http: HttpClient) { }

  getCambioBRLtoUSD(): Observable<any> {
    return this.http.get(this.apiUrl)
}
}
