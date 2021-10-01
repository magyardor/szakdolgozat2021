import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  submitted = false;

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private service: AdminService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.userForm.invalid){
      return
    }
    this.submitted = true;
    this.isLoading = true;
    this.service.logIn(this.userForm.value.email, this.userForm.value.password);
  }

}
