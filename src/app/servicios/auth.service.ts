import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  // Método para realizar la autenticación
  login(username: string, password: string): boolean {
    // Realiza la lógica de autenticación aquí
    if (/* condición de autenticación exitosa */) {
        this.isAuthenticated = true;
        return true; // Autenticación exitosa
    } else {
        this.isAuthenticated = false;
        return false; // Autenticación fallida
    }
}
  // Resto del servicio...
}