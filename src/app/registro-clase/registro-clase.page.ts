import { Component, OnInit } from '@angular/core';
import { ScanService } from './../servicios/scan.service';
import { PhotosService } from './../servicios/photos.service';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-registro-clase',
  templateUrl: './registro-clase.page.html',
  styleUrls: ['./registro-clase.page.scss'],
})
export class RegistroClasePage implements OnInit {
  scannedData: string;
  lastPhoto: string;
  latitude: number;
  longitude: number;
  nombre: string;
  apellido: string;
  rut: string;
  carrera: string;

  constructor(
    private scanService: ScanService, 
    private photosService: PhotosService, 
    private route: ActivatedRoute, 
    private geolocation: Geolocation) { 
    
  }

  ngOnInit() {
    const usernameParam = this.route.snapshot.paramMap.get('username');
    this.scannedData = this.scanService.getScannedData(); // Obtiene la información escaneada
    this.lastPhoto = this.photosService.getLatestPhoto(); // Obtén la última foto

    this.route.queryParams.subscribe((params) => {
      if (params.photoUrl) {
        this.lastPhoto = params.photoUrl;
      }
    });

    // Obtener los parámetros de consulta para nombre y apellido
    this.route.queryParams.subscribe((params) => {
      if (params.photoUrl) {
        this.lastPhoto = params.photoUrl;
      }
      if (params.nombre) {
        this.nombre = params.nombre;
      }
      if (params.apellido) {
        this.apellido = params.apellido;
      }
      if (params.rut) {
        this.rut = params.rut;
      }
      if (params.carrera) {
        this.carrera = params.carrera;
      }
      if (params.scannedData) {
        this.scannedData = params.scannedData;
      }
    });

    // Obtener la geolocalización
    this.getGeolocation();

  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // Asigna los valores de latitud y longitud a las propiedades del componente
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error al obtener la geolocalización', error);
    });
  }
  
}