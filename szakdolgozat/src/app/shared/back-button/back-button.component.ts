import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back();
  }

}
