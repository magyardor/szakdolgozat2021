import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chatprofile',
  templateUrl: './chatprofile.component.html',
  styleUrls: ['./chatprofile.component.scss']
})
export class ChatprofileComponent implements OnInit {
  selectedChat: any;

  @Input() profile!: boolean;
  @Input() chatID!: any;
  @Input() chatList: any;

  @Output() changeProfile = new EventEmitter<boolean>();

  constructor(
    private chat: ChatService
  ) { }

  ngOnInit(): void {
    this.selectedChat = this.chatList.find((x: { id: any; }) => x.id === this.chatID);
    console.log(this.selectedChat)
  }

  backButton() {
    this.profile = false;
    this.changeProfile.emit(this.profile);
  }
}
