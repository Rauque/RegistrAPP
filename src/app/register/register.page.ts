import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatosRegionalesService } from '../servicios/datos-regionales.service';
import { DatosComunasService } from '../servicios/datos-comunas.service'; // Importa el servicio de comunas

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  carrera: string = '';
  regiones: any[] = [];
  comunas: any[] = [];
  selectedRegion: any;
  selectedComuna: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private datosRegionalesService: DatosRegionalesService,
    private datosComunasService: DatosComunasService // Inyecta el servicio de comunas
  ) {}

  ngOnInit() {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.datosRegionalesService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }
  obtenerComunasDeRegion() {
    if (this.selectedRegion) {
      this.datosComunasService.obtenerComunas(this.selectedRegion).subscribe(
        (data) => {
          this.comunas = data.data;
        },
        (error) => {
          console.error('Error no se pueden obtener las comunas: ', error);
        }
      );
    }
  }

  register() {
    if (
      !this.username ||
      !this.password ||
      !this.nombre ||
      !this.apellido ||
      !this.rut ||
      !this.carrera ||
      !this.selectedRegion ||
      !this.selectedComuna // Asegurarse de que se haya seleccionado una región
    ) {
      this.mostrarAlerta('Error', 'Por favor, rellena todos los campos.');
      return; // Detener la función si hay campos vacíos
    }

    // Crear un objeto para almacenar los datos del usuario
    const userData = {
      username: this.username,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      carrera: this.carrera,
      region: this.selectedRegion,
      comunas: this.selectedComuna,
    };

    // Convertir el objeto a una cadena JSON y almacenarlo en el almacenamiento local
    localStorage.setItem(this.username, JSON.stringify(userData));
    this.router.navigate(['/login'], {
      queryParams: { nombre: this.nombre, apellido: this.apellido }
    });
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
