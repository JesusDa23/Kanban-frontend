import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})
export class CardService {
    
    BASE_URL: string = environment.baseUrl
    
    constructor(private http: HttpClient) { }

  getCards(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }

  createCard(card: any): Observable<any> {
    return this.http.post(this.BASE_URL, card);
  }

  updateCard(id: string, card: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, card);
  }

  deleteCard(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}