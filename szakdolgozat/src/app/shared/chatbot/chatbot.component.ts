import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          'max-height': '600px',
          opacity: '1',
          visibility: 'visible',
        })
      ),
      state(
        'out',
        style({
          'max-height': '0px',
          opacity: '0',
          visibility: 'hidden',
        })
      ),
      transition('in => out', [
        group([
          animate(
            '200ms ease-in-out',
            style({
              opacity: '0',
            })
          ),
          animate(
            '300ms ease-in-out',
            style({
              'max-height': '0px',
            })
          ),
          animate(
            '700ms ease-in-out',
            style({
              visibility: 'hidden',
            })
          ),
        ]),
      ]),
      transition('out => in', [
        group([
          animate(
            '1ms ease-in-out',
            style({
              visibility: 'visible',
            })
          ),
          animate(
            '200ms ease-in-out',
            style({
              opacity: '1',
            })
          ),
          animate(
            '300ms ease-in-out',
            style({
              'max-height': '600px',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class ChatbotComponent implements OnInit {
  animationState = 'out';
  profile: boolean = false;
  chatSub: any;
  chatID: any;
  chatList: Chat[] = [];

  constructor(
    private chat: ChatService
  ) { }

  async ngOnInit() {
    await this.chat.getChat();
    this.chatSub = this.chat.getUpdateListener()
    .subscribe(chat => {
      this.chatList = chat;
    });
    console.log(this.chatList)
  }

  toggleChat() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  loadChatProfile(event: any) {
    this.profile = true
    this.chatID = event
  }

}
