import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chatprofile',
  templateUrl: './chatprofile.component.html',
  styleUrls: ['./chatprofile.component.scss']
})
export class ChatprofileComponent implements OnInit {
  selectedChat: any;
  form!: FormGroup;
  message: any;

  @Input() profile!: boolean;
  @Input() chatID!: any;
  @Input() chatList: any;

  @Output() changeProfile = new EventEmitter<boolean>();

  constructor(
    private chat: ChatService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl(null, {validators: [Validators.required]}),
    });
    this.selectedChat = this.chatList.find((x: { id: any; }) => x.id === this.chatID);
  }

  backButton() {
    this.profile = false;
    this.changeProfile.emit(this.profile);
  }

  onSendText(event: any) {
    if(event.type === "click")
    {
      this.message = this.form.value.message;
    }
  }
}
