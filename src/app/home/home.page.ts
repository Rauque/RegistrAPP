import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PhotosService } from './../servicios/photos.service';
import { ScanService } from './../servicios/scan.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit{
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  carrera: string = '';
  scannedResult: any;
  content_visibility = '';
  codigo: any;
  photos: string[] = [];
  lastPhoto: string;
  mostrarAlerta: boolean = true;

  constructor(private route: ActivatedRoute, private alertController: AlertController, private barcodeScanner: BarcodeScanner, private photosService: PhotosService, private scanService: ScanService, private navCtrl: NavController) {
    this.photos = this.photosService.photos;
    this.lastPhoto = this.photosService.getLatestPhoto();
  }

  ngOnInit() {

    const usernameParam = this.route.snapshot.paramMap.get('username');

    if (this.mostrarAlerta){
      this.presentAlert();
    }

    if (usernameParam !== null) {
      this.username = usernameParam;

      // Recuperar datos adicionales (nombre y apellido) del usuario desde el almacenamiento local
      const userData = localStorage.getItem(this.username);
      if (userData) {
        const user = JSON.parse(userData);
        this.nombre = user.nombre;
        this.apellido = user.apellido;
        this.rut = user.rut;
        this.carrera = user.carrera;
      }
    }
  }

 async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: 'Para registrar correctamente tu asistencia, debes escanear el Código QR y proporcionar una selfie tuya.',
      buttons: ['OK']
    });

    await alert.present();
  }

  scanQr() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.codigo = barcodeData.text;
      this.scanService.setScannedData(this.codigo); // Almacena la información escaneada
      console.log('Barcode data', this.codigo);

      if (this.codigo && this.lastPhoto) {
        // Ambas condiciones se cumplen, navegar a la página deseada
        this.navCtrl.navigateForward('registro-clase', {
          queryParams: {
            nombre: this.nombre,
            apellido: this.apellido,
            rut: this.rut,
            carrera: this.carrera,
            scannedData: this.codigo,
            lastPhoto: this.lastPhoto
          } });
      }
    }).catch((err) => {
      console.log('Error', err);
    });
  }

  async takePhoto(){
    await this.photosService.addNewPhoto();
    this.lastPhoto = this.photosService.getLatestPhoto();

    if (this.codigo && this.lastPhoto) {
      this.navCtrl.navigateForward('registro-clase', {
        queryParams: {
          nombre: this.nombre,
          apellido: this.apellido,
          rut: this.rut,
          carrera: this.carrera,
          scannedData: this.codigo,
          lastPhoto: this.lastPhoto
        } });
    }
  }
}
