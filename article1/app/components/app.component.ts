import { Component, Input }       from "angular2/core";
import { TableComponent }         from "./table.component";
import { ICustomer }              from "../interfaces/ICustomer";
import { ICustomerSelectedEvent } from "../interfaces/ICustomerSelectedEvent";
import bows                       from "bows";

const log = bows("AppComponent");

@Component({
    selector: "ang2-app",
    templateUrl: "./app/templates/app-template.html",
    directives: [TableComponent]
})
export class AppComponent {
  private selectedCustomer: ICustomer = null;
  private appName = "Northwind Demo";
  // private someValue = "default value";
  constructor() {
    log("INIT");
  }
  sayHello() {
    log("Hello World!");
  }
  onCustomerSelected(event: ICustomerSelectedEvent) {
    this.selectedCustomer = event.customer;
    log(event);
  }
}
