import * as socketIo from 'socket.io-client'

import { Component, OnInit } from '@angular/core';
import { BinService } from '../../services/bin.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bin =[];
  markers = [];
  latitude= 13.277569;
  longitude=100.927047;
  fullStatus = 0
  midStatus = 0
  emptyStatus =0

  // location = [
  //   {latitude :13.277569, longitude:100.927047},
  //   {latitude :13.277569, longitude:100.927047},
  //   {latitude :13.277569, longitude:100.927047},
  //   {latitude :13.277569, longitude:100.927047}
  // ]
  zoom = 13;
  titles = "hi";
  // label = "55";
  iconRed = { 
    url: './assets/images/red.png', 
    scaledSize: { 
      width: 50, 
      height: 50 } 
  };
  iconYellow = { 
    url: './assets/images/yellow.png', 
    scaledSize: { 
      width: 50, 
      height: 50 } 
  };
  iconGreen = { 
    url: './assets/images/green.png', 
    scaledSize: { 
      width: 50, 
      height: 50 } 
  };
  // mapArrayList = ['13.277569,100.927047','14.277569,100.927047'];

  constructor(private binservice :BinService) { }

  async ngOnInit() {

    const socket = socketIo('https://t2csystem.com')
    socket.on('binQty', async (data) => {
      console.log(data)
      this.bin =[];
      this.markers = [];
      this.fullStatus = 0
      this.midStatus = 0
      this.emptyStatus =0

      await this.binservice.getBinData().subscribe(res => {
        this.bin = res
        this.bin.forEach(element => {
        if(element.can_qty >= 80 || element.glass_qty >= 80 || element.plastic_qty >= 80){
          this.fullStatus++
          this.markers.push({
            name:element.name,
            lat:Number (element.latitude),
            lng:Number (element.longtitude),
            icon:this.iconRed
          }) 
        }else if(element.can_qty >= 50 || element.glass_qty >= 50 || element.plastic_qty >= 50){
            this.midStatus++
            this.markers.push({
              name:element.name,
              lat:Number (element.latitude),
              lng:Number (element.longtitude),
              icon:this.iconYellow
            }) 
          }else{
            this.emptyStatus++
            this.markers.push({
              name:element.name,
              lat:Number (element.latitude),
              lng:Number (element.longtitude),
              icon: this.iconGreen
            }) 
          }
  
        });
        console.log('IO finish');
      });

    })
   
    await this.binservice.getBinData().subscribe(res => {
      this.bin = res
      this.bin.forEach(element => {
      if(element.can_qty >= 80 || element.glass_qty >= 80 || element.plastic_qty >= 80){
        this.fullStatus++
        this.markers.push({
          name:element.name,
          lat:Number (element.latitude),
          lng:Number (element.longtitude),
          icon:this.iconRed
        }) 
      }else if(element.can_qty >= 50 || element.glass_qty >= 50 || element.plastic_qty >= 50){
          this.midStatus++
          this.markers.push({
            name:element.name,
            lat:Number (element.latitude),
            lng:Number (element.longtitude),
            icon:this.iconYellow
          }) 
        }else{
          this.emptyStatus++
          this.markers.push({
            name:element.name,
            lat:Number (element.latitude),
            lng:Number (element.longtitude),
            icon: this.iconGreen
          }) 
        }
      });
      console.log(this.markers);
    });
  }
mapClick(event){
  console.log(event);
}
markerClick(event){
  console.log(event);
  
}

setStyle(qty){
  let style ={
    'width': qty+'%'
  }
  return style
 
}
}
