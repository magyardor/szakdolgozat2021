import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

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
  ) { }

  ngOnInit(): void {
  }

  addUser(): void{
    if(this.addUserForm.invalid){
      return;
    }
    this.isLoading = true;
    this.service.addUser(this.addUserForm.value.email, this.addUserForm.value.password);
  }

}
