import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Chat } from "../models/chat.model";
import { AlertService } from "./alert.service";

@Injectable({providedIn: 'root'})
export class ChatService {
  private chat: Chat[] = [];
  private chatUpdate = new Subject<Chat[]>();
  chatList: any[] = [];
  chatID: number = 0;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private router: Router,
  ){}

  getChat() {
    this.http.get<{message: string, chat: any}>(environment.apiUrl + "/api/chat")
    .pipe(map(response => {
        return response.chat.map((chats: any) => {
          return {
            id: chats._id,
            title: chats.title,
            description: chats.description,
            contact: chats.contact
          };
        });
      })
    ).subscribe(transformData => {
      this.chat = transformData;
      this.chatUpdate.next([...this.chat]);
    });
  }

  getUpdateListener() {
    return this.chatUpdate.asObservable();
  }

  getChatID(id: any){
    return this.http.get<{_id: any, title: string, description: string, contact: string}>(environment.apiUrl + "/api/chat/" + id)
  }

  addMessage(message: any) {
    this.chatList.push(message);
  }

}
