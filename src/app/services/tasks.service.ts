import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks.model';
import { Observable, map } from 'rxjs';

const baseUrl = 'http://localhost:3000/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tasks[]> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<any>(baseUrl, { headers }).pipe(
      map((response: any) => {
        const tasksData = response.tasksData; // Obtener el array de datos del objeto de respuesta
        return tasksData as Tasks[]; // Asignar el array de datos al tipo Parents[]
      })
    );  }

  get(id: any): Observable<Tasks> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.get<Tasks>(`${baseUrl}/${id}`, { headers });
  }

  //Obtener todas las Taska de un Children
  getAllByChildrenId(id_children: string): Observable<Tasks[]> {
    const url = `${baseUrl}/children/${id_children}`;
    return this.http.get<Tasks[]>(url);
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

  delete(_id: any): Observable<any> {
    // Agregar los headers necesarios en una variable HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer tu-token-de-autenticacion' // Si es necesario para tu API
    });

    // Luego, usar los headers en la petición HTTP
    return this.http.delete(`${baseUrl}/${_id}`, { headers });
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

}
