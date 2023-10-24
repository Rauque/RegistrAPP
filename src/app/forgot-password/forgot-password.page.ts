import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  username: string = '';
  newPassword: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async resetPassword() {
    if (!this.username || !this.newPassword) {
      this.mostrarAlerta('Error', 'Por favor, rellena todos campos.');
      return; // Detener la función si hay campos vacíos
    }

    // Verificar si el usuario existe en el almacenamiento local
    const storedUserData = localStorage.getItem(this.username);

    if (storedUserData) {
      // Si el usuario existe, parsear los datos almacenados
      const userData = JSON.parse(storedUserData);

      // Actualizar la contraseña
      userData.password = this.newPassword;

      // Guardar los datos actualizados en el almacenamiento local
      localStorage.setItem(this.username, JSON.stringify(userData));

      this.router.navigate(['/login']);
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

}
