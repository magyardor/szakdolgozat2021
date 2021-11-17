import { Injectable } from "@angular/core";
import { Order } from "src/app/models/transport.modul";

@Injectable({providedIn: 'root'})
export class TransportService {
  /* @Input() transportCheck: boolean | undefined; */
  all: Order[] = [];

  constructor(){}

  addOrder(value: any){
    console.log(value)
  }
}
