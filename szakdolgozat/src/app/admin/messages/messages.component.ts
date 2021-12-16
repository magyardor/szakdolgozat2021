import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Messages } from 'src/app/models/message.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  displayedColumns: string [] = ['fullName', 'email', 'description', 'menu'];
  messages!: MatTableDataSource<Messages>;
  isLoading = false;
  msgSub!: Subscription;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.contactService.getMessage();
    this.msgSub = this.contactService.getUpdateMessageListener()
    .subscribe((msg: Messages[]) => {
      this.isLoading = false;
      this.messages = new MatTableDataSource(msg);
      this.messages.paginator = this.paginator;
    });
  }

  onDelete(msgID: string) {
    this.contactService.deleteMessages(msgID);
  }

  ngOnDestroy(): void {
    this.msgSub.unsubscribe();
  }
}
