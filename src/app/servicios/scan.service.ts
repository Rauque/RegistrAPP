import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private scannedData: string;

  setScannedData(data: string) {
    this.scannedData = data;
  }

  getScannedData() {
    return this.scannedData;
  }
}
