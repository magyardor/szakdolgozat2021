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
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onAddMessage(): void {
    if(this.contactForm.invalid) {
      this.alertService.warn('ALERT.WARN.INVALID_FORM');
      this.contactForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    else{
      this.isLoading = true;
      this.contactService.sendMessage(
        this.contactForm.value.first_name,
        this.contactForm.value.last_name,
        this.contactForm.value.email,
        this.contactForm.value.description,
      );
      this.contactForm.reset();
      this.isLoading = false;
      return;
    }
  }

}
