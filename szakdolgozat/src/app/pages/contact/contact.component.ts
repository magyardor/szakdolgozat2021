import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading = false;

  constructor(
    private contactService: ContactService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  onAddMessage(): void {
    if(this.contactForm.invalid) {
      this.alertService.warn('ALERT.WARN.INVALID_FORM');
      this.contactForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    if(this.contactForm.valid){
       this.contactService.sendMessage(
        this.contactForm.value.firstName,
        this.contactForm.value.lastName,
        this.contactForm.value.email,
        this.contactForm.value.description,
      );
      this.isLoading = false;
    }
    this.contactForm.reset();
  }

}
