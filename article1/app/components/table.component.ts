import { Component, Output, EventEmitter } from "angular2/core";
import { NorthwindService }                from "../services/NorthwindService";
import { ICustomer }                       from "../interfaces/ICustomer";
import { ICustomerSelectedEvent }          from "../interfaces/ICustomerSelectedEvent";
import domready                            from "domready";
import bows                                from "bows";
import randomizer                          from "random-js";

const random = randomizer();
const log = bows("TableComponent");


@Component({
  selector: "nw-table",
  template: `<table id="northwind" class="display" width="100%"></table>`,
  providers: [NorthwindService]
})
export class TableComponent {
  @Output() customerSelected = new EventEmitter<ICustomerSelectedEvent>();
  private _table : DataTables.DataTable;
  private ajaxDataFunc: DataTables.FunctionAjax = (data : Object,
                                                   callback : Function,
                                                   settings : DataTables.SettingsLegacy) : void => {
    this._nwService.getCustomersEx().subscribe((cdata : ICustomer[]) => {
      cdata.forEach((c : ICustomer) => {
        c.Picture = `http://robohash.org/set_set2/${random.integer(0,100)}?size=150x150`;
        this._table.row.add(c);
      });
      this._table.draw();
    });
  }
  private tableSettings : Object = {
        ajax: {
           //url: "http://northwind.servicestack.net/customers.json",
           data: this.ajaxDataFunc,
           dataSrc: "Customers"
        },
        columns: [
            { data: "Id", title: "Id" },
            { data: "CompanyName", title: "Company" },
            { data: "ContactName", title: "Contact" },
            { data: "ContactTitle", title: "Title" },
            { data: "Address", title: "Address" },
            { data: "City", title: "City" },
            { data: "Country", title: "Country" },
            { data: "Phone", title: "Phone" }
        ],
        select: true
  }
  constructor(private _nwService: NorthwindService) {
    domready(() => {
      this.init();
    });
  }
  init(){
    this._table = $("#northwind").DataTable(<DataTables.Settings>this.tableSettings);
    $.fn.dataTable.ext.errMode = "ignore";
    this._table.on("select", (e : Event, dt: DataTables.DataTable, type: string, indexes : number[]) => {
     if ( type === "row" ) {
        let customer = dt.rows(indexes[0]).data()["0"];
        this.customerSelected.emit({
                                     sender: this,
                                     customer
                                    });
      }
    });
  }
}
