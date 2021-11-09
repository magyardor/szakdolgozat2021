import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Message } from "../models/message.model";
import { AlertService } from "./alert.service";

@Injectable({providedIn: 'root'})
export class ContactService {
  private messages: Message [] = [];
  private msgUpdate = new Subject<Message[]>();

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ){}

  getMessage(){
    this.http.get<{msg: string, message: any}>(environment.apiUrl + "message")
    .pipe(map(messagesData => {
      return messagesData.message.map((msg: any) => {
        return {
          id: msg._id,
          first_name: msg.first_name,
          last_name: msg.last_name,
          email: msg.email,
          description: msg.description
        };
      });
    })
    ).subscribe(transformData => {
      this.messages = transformData;
      this.msgUpdate.next([...this.messages]);
    });
  }

  getUpdateMessageListener() {
    return this.msgUpdate.asObservable();
  }

  sendMessage(first_name: string, last_name: string, email: string, description: string){
    const messagesData = new FormData();
    messagesData.append("first_name", first_name);
    messagesData.append("last_name", last_name);
    messagesData.append("email", email);
    messagesData.append("description", description);
    this.http.post<{message: string, messages: Message}>(environment.apiUrl + "message", messagesData)
    .subscribe(responseData => {
      const msg: Message = {
        id: responseData.messages.id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        description: description
      };
      this.messages.push(msg);
      this.msgUpdate.next([...this.messages]);
      this.alert.success('ALERT.SUCCESS.ADD');
    }, error => {
      this.alert.error(error.error.message);
    });
  }

  deleteMessages(msgID: any){
    return this.http.delete(environment.apiUrl + "message/" + msgID)
    .subscribe(() => {
      const updateMsg = this.messages.filter(x => x.id !== msgID);
      this.messages = updateMsg;
      this.msgUpdate.next([...this.messages]);
      this.alert.success('ALERT.SUCCESS.DELETE');
    }, error => {
      this.alert.error(error.error.message);
    });
  }
}
