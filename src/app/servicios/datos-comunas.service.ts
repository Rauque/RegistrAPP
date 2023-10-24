import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosComunasService {
  private apiUrl = 'https://dev.matiivilla.cl/duoc/location/comuna';

  constructor(private http: HttpClient) {}

  obtenerComunas(regionId: number): Observable<any> {
    const url = `${this.apiUrl}/${regionId}`;
    return this.http.get<any>(url);
  }
}

