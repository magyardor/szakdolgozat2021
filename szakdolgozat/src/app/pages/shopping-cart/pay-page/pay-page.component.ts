import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements OnInit {
  fullPrice: any;
  cartsList: any;
  orderList: any;
  transportPrice: number = 0;
  payChoice: any;
  grandTotal: number = 0;
  form!: FormGroup;
  checked: boolean = false;
  isLinear = true;
  stepperOriental!: Observable<StepperOrientation>;

  constructor(
    private carts: CartService,
    breakPoint: BreakpointObserver,
  ) {
    this.stepperOriental = breakPoint.observe('(min-width: 600px)').pipe(map(({matches}) => (matches ? 'horizontal':'vertical')));
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null,{validators: [Validators.required]}),
      phone: new FormControl(null,{validators: [Validators.required]}),
      fullName: new FormControl(null,{validators: [Validators.required]}),
      zipCode: new FormControl(null,{validators: [Validators.required]}),
      city: new FormControl(null),
      street: new FormControl(null,{validators: [Validators.required]}),
      taxNumber: new FormControl(null),
      fullName_transport: new FormControl(null),
      zipCode_transport: new FormControl(null),
      city_transport: new FormControl(null),
      street_transport: new FormControl(null),
      taxNumber_transport: new FormControl(null),
    });
    this.cartsList = this.carts.productsItem;
    this.fullPrice = this.carts.totalPrice;
    this.grandTotal = this.transportPrice + this.fullPrice._value;
    this.orderList = this.carts.getOrder();
  }

  changeValue(value: any) {
    this.checked = !value;
  }

  addShipOrder() {
    if(this.checked) {
      this.form.value.fullName_transport = this.form.value.fullName;
      this.form.value.zipCode_transport = this.form.value.zipCode;
      this.form.value.city_transport = this.form.value.city;
      this.form.value.street_transport = this.form.value.street;
      this.form.value.taxNumber_transport = this.form.value.taxNumber;
      this.carts.addOrder(
      this.form.value
      )
    }
    else {
      this.carts.addOrder(
        this.form.value
      )
    }
    this.orderList = this.carts.getOrder();
  }

  radioChange(e: any){
    this.transportPrice = e.value;
    this.grandTotal = this.transportPrice + this.fullPrice._value;
    this.carts.transportChoice = this.transportPrice;
  }

  radioChangePay(e: any){
    this.payChoice = e.value;
    this.carts.payChoice = this.payChoice;
  }

  fullOrder() {
    this.carts.addFullOrderItem();
  }

  states: string[] = [
    'Alabama',
    'Alaska',
    'California',
    'Hungary'
  ]

  transport_choice: any[] = [
    {value: 0, name: "Személyes átvétel", disabled: false},
    {value: 900, name: "Futár +900Ft", disabled: false}
  ]

  pay_choice: any[] = [
    {value: 1, name: "Utánvét", disabled: false},
    {value: 2, name: "Kártya", disabled: true}
  ]

}
