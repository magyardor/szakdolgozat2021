import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  aszf = false;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      first_name: new FormControl(null, {validators: [Validators.required]}),
      last_name: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  onAddMessage(): void {
    if(this.aszf){

    }
  }

}
