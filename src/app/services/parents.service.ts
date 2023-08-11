import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Parents } from '../models/parents.model';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:3000/parents';

@Injectable()
export class ParentsService {
  constructor(private http: HttpClient) {}

  // ...

  getAll(): Observable<Parents[]> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<any>(baseUrl, { headers }).pipe(
      map((response: any) => {
        const parentsData = response.parentsData; // Obtener el array de datos del objeto de respuesta
        return parentsData as Parents[]; // Asignar el array de datos al tipo Parents[]
      })
    );  }

  get(id: any): Observable<Parents> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<Parents>(`${baseUrl}/${id}`, { headers });
  }

  parentLogin(credentials: { username_parents: string, password_parents: string }): Observable<any> {
    const url = `${baseUrl}/login`;
    return this.http.post(url, credentials).pipe(
      map((response: any) => response), // Extract and return the response
      catchError(error => {
        throw error; // Rethrow the error
      })
    );
  }

  create(data: any): Observable<any> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.post(baseUrl, data, { headers });
  }

  update(id: any, data: any): Observable<any> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.put(`${baseUrl}/${id}`, data, { headers });
  }

  delete(id: any): Observable<any> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.delete(`${baseUrl}/${id}`, { headers });
  }

  deleteAll(): Observable<any> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.delete(baseUrl, { headers });
  }

  findByTitle(title: any): Observable<Parents[]> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<Parents[]>(`${baseUrl}?title=${title}`, { headers });
  }
}
