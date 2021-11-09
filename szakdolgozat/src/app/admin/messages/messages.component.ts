import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Messages } from 'src/app/models/message.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  displayedColumns: string [] = ['full name', 'email', 'description', 'menu'];
  messages: Messages[] = [];
  isLoading = false;
  msgSub!: Subscription;

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.contactService.getMessage();
    this.msgSub = this.contactService.getUpdateMessageListener()
    .subscribe((msg: Messages[]) => {
      this.isLoading = false;
      this.messages = msg;
    });
  }

  onDelete(msgID: string) {
    this.contactService.deleteMessages(msgID);
  }

  ngOnDestroy(): void {
    this.msgSub.unsubscribe();
  }
}
