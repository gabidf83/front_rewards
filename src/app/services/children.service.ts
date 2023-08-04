import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Children } from '../models/children.model';
import { Observable, map } from 'rxjs';

const baseUrl = 'http://localhost:3000/children';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Children[]> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<any>(baseUrl, { headers }).pipe(
      map((response: any) => {
        const childrenData = response.childrenData; // Obtener el array de datos del objeto de respuesta
        return childrenData as Children[]; // Asignar el array de datos al tipo Parents[]
      })
    );  }

  get(id: any): Observable<Children> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<Children>(`${baseUrl}/${id}`, { headers });
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

  findByTitle(title: any): Observable<Children[]> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<Children[]>(`${baseUrl}?title=${title}`, { headers });
  }
}

