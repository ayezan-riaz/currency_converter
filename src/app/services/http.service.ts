import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviornment'; 
import { ApiResponse } from '../shared/interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = `${environment.host}`; 

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/currencies`);
  }

  convertCurrency(amount: number, from: string, to: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/convert`, { amount, from, to });
  }
}
