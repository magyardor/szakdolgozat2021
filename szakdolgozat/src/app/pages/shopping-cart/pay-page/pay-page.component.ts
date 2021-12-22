import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/service/alert.service';
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
  payChoice: any;
  orderID: any;
  transportPrice: number = 0;
  grandTotal: number = 0;
  checked: boolean = false;
  isLoading: boolean = false;
  imagePreview!: string;
  isLinear = true;
  form!: FormGroup;
  stepperOriental!: Observable<StepperOrientation>;

  constructor(
    private carts: CartService,
    private alertService: AlertService,
    breakPoint: BreakpointObserver,
    private router: Router
  ) {
    this.stepperOriental = breakPoint.observe('(min-width: 800px)').pipe(map(({matches}) => (matches ? 'horizontal':'vertical')));
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
    if(this.checked){
      if(this.form.invalid) {
        this.alertService.warn('ALERT.WARN.INVALID_FORM');
        this.form.markAllAsTouched();
        return;
      }
      else{
        this.form.value.fullName_transport = this.form.value.fullName;
        this.form.value.zipCode_transport = this.form.value.zipCode;
        this.form.value.city_transport = this.form.value.city;
        this.form.value.street_transport = this.form.value.street;
        this.form.value.taxNumber_transport = this.form.value.taxNumber;
        this.carts.addOrder(this.form.value)
      }
    }
    else {
      if(this.form.invalid) {
        this.alertService.warn('ALERT.WARN.INVALID_FORM');
        this.form.markAllAsTouched();
        return;
      }
      else{
        this.carts.addOrder(
          this.form.value
        )
      }
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
    this.isLoading = true;
    this.carts.addFullOrderItem(this.grandTotal, this.fullPrice._value);
    this.getOrderID();
  }

  cancel() {
    this.form.reset();
    this.carts.productsItem = [];
    this.router.navigate(['/home']);
  }

  async getOrderID() {
    const list = this.carts.getprodUpdatedListener().subscribe((x: any) => {
      const list2 = x;
      if(list2){
        this.orderID = this.carts.orderID;
      }
    });
    this.isLoading = false;
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
