import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isShowing = true;
  i = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  open(event: any){
    if(this.i == 0){
      this.isShowing = false;
      this.i++;
    }
    else{
      this.isShowing = true;
      this.i--;
    }

  }
}
