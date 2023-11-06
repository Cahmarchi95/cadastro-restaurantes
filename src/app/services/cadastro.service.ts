import { Injectable } from '@angular/core';
import { ICadastroRestaurante } from '../model/icadastro-restaurante';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl = 'http://localhost:3000/restaurantes';

  constructor(private http: HttpClient) {}

  public addRestaurante(
    restauranteNovo: ICadastroRestaurante
  ): Observable<ICadastroRestaurante> {
    return this.http.post<ICadastroRestaurante>(this.apiUrl, restauranteNovo);
  }

  public excluirRestaurante(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  public editarRestaurante(
    id: number,
    restauranteEditado: ICadastroRestaurante
  ): Observable<ICadastroRestaurante> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ICadastroRestaurante>(url, restauranteEditado);
  }

  public getAllRestaurantes(): Observable<ICadastroRestaurante[]> {
    return this.http.get<ICadastroRestaurante[]>(this.apiUrl);
  }

  updateRestaurante(
    restaurante: ICadastroRestaurante,
    id: number
  ): Observable<ICadastroRestaurante> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ICadastroRestaurante>(url, restaurante);
  }
}
