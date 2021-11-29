import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { ContactService } from 'src/app/service/contact.service';
import { mimeType } from 'src/app/service/validators/mime-type.validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  imagePreview!: string;

  constructor(
    private contactService: ContactService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(''),
      description: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddMessage(): void {
    if(this.form.invalid) {
      this.alertService.warn('ALERT.WARN.INVALID_FORM');
      this.form.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    console.log(this.form);
    this.isLoading = true;
    this.contactService.sendMessage(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.email,
      this.form.value.description,
      this.form.value.image,
      )
    this.isLoading = false
  }

  clear() {
    if(this.form.invalid) {
      this.form.reset();
      this.alertService.success('Clear');
    }
    else {
      /* dialog */
      this.form.reset();
      this.alertService.success('Clear');
    }

  }

}
