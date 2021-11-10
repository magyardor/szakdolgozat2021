import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  hidden = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

}
