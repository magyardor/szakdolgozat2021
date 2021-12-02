import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chatprofile',
  templateUrl: './chatprofile.component.html',
  styleUrls: ['./chatprofile.component.scss']
})
export class ChatprofileComponent implements OnInit {
  @Input() profile!: boolean;
  @Output() changeProfile = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  backButton() {
    this.profile = false;
    this.changeProfile.emit(this.profile);
  }
}
