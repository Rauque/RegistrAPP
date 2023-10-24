import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(
    private router: Router, 
    private alertController: AlertController) {}

  async login() {
    if (!this.username || !this.password) {
      this.mostrarAlerta('Error', 'Por favor, rellena todos campos.');
      return; // Detener la función si hay campos vacíos
    }

    const storedUserData = localStorage.getItem(this.username);

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);

      if (userData.password === this.password) {
        this.router.navigate(['/home', { username: this.username }]);
      } else {
        this.mostrarAlerta('Error', 'La contraseña es incorrecta.');
      }
    } else {
      this.mostrarAlerta('Error', 'El usuario no está registrado.');
    }
  }
  
    async mostrarAlerta(titulo: string, mensaje: string) {
      const alert = await this.alertController.create({
        header: titulo,
        message: mensaje,
        buttons: ['Aceptar'],
      });

    await alert.present();
  }

  iraRegistro() {
    this.router.navigate(['/register']);
  }

  iraCambiarPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
