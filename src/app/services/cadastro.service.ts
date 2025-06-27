import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from '../contato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl = 'http://localhost:3000/contacts';

  constructor(private http:HttpClient) {}

  save(contato:Contato): Observable<Contato>{
    return this.http.post<Contato>(this.apiUrl, contato);
  }
}
