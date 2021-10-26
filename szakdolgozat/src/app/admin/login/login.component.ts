import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { AlertService } from 'src/app/service/alert.service';

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
    private service: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.userForm.invalid){
      this.alertService.warn('ALERT.WARN.INVALID_FORM');
      this.userForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    this.submitted = true;
    this.isLoading = true;
    this.service.logIn(this.userForm.value.email, this.userForm.value.password);
    this.alertService.success('ALERT.SUCCESS.LOGIN');
  }

}
