import { Component, OnInit } from '@angular/core';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'szakdolgozat';

  constructor(
    private service: AdminService
  ){}

  ngOnInit() {
    this.service.autoAuthUser();
  }
}
