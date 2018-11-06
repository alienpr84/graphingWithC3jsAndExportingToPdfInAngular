import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private httpClient: HttpClient) { }

  getData(counter:any = ''): any {
    return this.httpClient.get(`../../assets/json/data${counter}.json`);
  }

}
