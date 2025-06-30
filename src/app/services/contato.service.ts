import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = 'http://localhost:8080/contatos';

  constructor(private http:HttpClient) {}

  getAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  filtrarContatos(nome?: string, favorito?: boolean, ordenarAZ?: boolean): Observable<Contato[]> {
  let params = new HttpParams();

  if (nome) {
    params = params.set('name', nome);
  }

  if (favorito) {
    params = params.set('favorito', favorito.toString());
  }

  if (ordenarAZ) {
    params = params.set('ordenarAZ', ordenarAZ.toString());
  }

    return this.http.get<Contato[]>(`${this.apiUrl}/filtro`, { params });
  }

  buscaNome(name:string):Observable<Contato[]>{
    return this.http.get<Contato[]>(`${this.apiUrl}/buscaNome?name=${name}`);
  }

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  update(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${contato.id}`, contato);
  }

  delete(contato: Contato): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contato.id}`);
  }
}
