import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = "https://projetofinalagendanf.duckdns.org/contatos";

  constructor(private http:HttpClient) {}

  getAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  filtrarContatos(tipo?: string, busca?:string ,favorito?: boolean, ordenarAZ?: boolean): Observable<Contato[]> {
  let contatoFiltrado = new HttpParams();

  if (tipo) {
    contatoFiltrado = contatoFiltrado.set('name', tipo);
  }

  if (busca){
    contatoFiltrado = contatoFiltrado.set('busca', busca);
  }

  if (favorito) {
    contatoFiltrado = contatoFiltrado.set('favorito', favorito.toString());
  }

  if (ordenarAZ) {
    contatoFiltrado = contatoFiltrado.set('ordenarAZ', ordenarAZ.toString());
  }

    return this.http.get<Contato[]>(`${this.apiUrl}`, { params: contatoFiltrado });
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
