import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  isLoading = false;

  addUserForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private service: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
  }

  addUser(): void{
    if(this.addUserForm.invalid){
      this.alertService.warn('ALERT.WARN.INVALID_FORM');
      this.addUserForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.service.addUser(this.addUserForm.value.email, this.addUserForm.value.password);
    this.alertService.success('ALERT.SUCCESS.ADD');
  }

}
