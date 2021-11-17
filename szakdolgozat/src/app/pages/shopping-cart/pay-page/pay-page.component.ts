import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransportService } from 'src/app/service/transport_billing/transport.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements OnInit {
  cartsList: [] = [];
  form!: FormGroup;
  checked: boolean = false;
  stepperOriental!: Observable<StepperOrientation>;

  constructor(
    private transport: TransportService,
    breakPoint: BreakpointObserver,
  ) {
    this.stepperOriental = breakPoint.observe('(min-width: 600px)').pipe(map(({matches}) => (matches ? 'horizontal':'vertical')));
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(''),
      phone: new FormControl(''),
      fullName: new FormControl(''),
      zipCode: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
      taxNumber: new FormControl(''),
      fullName_transport: new FormControl(''),
      zipCode_transport: new FormControl(''),
      city_transport: new FormControl(''),
      street_transport: new FormControl(''),
      taxNumber_transport: new FormControl(''),
    });
  }

  changeValue(value: any) {
      this.checked = !value;
      console.log(this.checked)
  }

  addShipOrder() {
    this.transport.addOrder(
      this.form.value
    )
  }

  radioChange(e: any){
    console.log(e.value);
    console.log(this.pay_choice);
  }

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Hungary'
  ]

  transport_choice: any[] = [
    {value: 0, name: "Személyes átvétel", disabled: false},
    {value: 900, name: "Futár +900Ft", disabled: false}
  ]

  pay_choice: any[] = [
    {value: 1, name: "Készpénz", disabled: false},
    {value: 2, name: "Kártya", disabled: true}
  ]

}
