import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BinService {

  constructor(private http: HttpClient) { }

   getBinData() {
    return  this.http.get<any>('https://t2csystem.com/bins').pipe()
}
}
