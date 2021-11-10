import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Messages } from "../models/message.model";
import { AlertService } from "./alert.service";

@Injectable({providedIn: 'root'})
export class ContactService {
  private messages: Messages [] = [];
  private msgUpdate = new Subject<Messages[]>();

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private router: Router,
  ){}

  getMessage(){
    this.http.get<{message: string, messages: any}>(environment.apiUrl + "messages")
    .pipe(map(messagesData => {
      return messagesData.messages.map((msg: any) => {
        return {
          id: msg._id,
          firstName: msg.firstName,
          lastName: msg.lastName,
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

  sendMessage(firstName: string, lastName: string, email: string, description: string){
    const messagesData = new FormData();
    messagesData.append("firstName", firstName);
    messagesData.append("lastName", lastName);
    messagesData.append("email", email);
    messagesData.append("description", description);
    this.http.post<{message: string, messages: Messages}>(environment.apiUrl + "messages", messagesData)
    .subscribe(responseData => {
      const msg: Messages = {
        id: responseData.messages.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        description: description
      };
      this.messages.push(msg);
      this.msgUpdate.next([...this.messages]);
      this.alert.success('ALERT.SUCCESS.ADD');
      this.router.navigate(["/contact"]);
    }, error => {
      this.alert.error(error.error.message);
    });
  }

  deleteMessages(msgID: any){
    return this.http.delete(environment.apiUrl + "messages/" + msgID)
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
