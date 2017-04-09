import { Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces';
@Injectable()
export class PaymentService {
   
    constructor() { }

    public activeDebt(customerId: string) {
       // do some complex API stuff here, like SQL queries etc.
       return this.random().toFixed(2);
    }

    private random(min: number = 10, max: number = 2000) {
       return Math.random() * (max - min) + min;
    }

}
