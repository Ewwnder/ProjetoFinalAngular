import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../contato';

@Injectable({
  providedIn: 'root'
})
export class GerenciarService {
  
  private apiUrl = 'http://localhost:3000/contacts';

  constructor(private http:HttpClient) {}

  getAll(): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.apiUrl);
  }

  update(contato:Contato):Observable<Contato>{
    return this.http.put<Contato>(`${this.apiUrl}/${contato.id}`, contato);
  }

  delete(contato:Contato):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${contato.id}`);
  }
}
