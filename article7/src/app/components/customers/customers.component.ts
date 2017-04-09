import { Component,
         OnInit, Input,
         Output, ChangeDetectorRef,
         ChangeDetectionStrategy,
         SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { IAppState } from 'app/states';
import { CustomerActions } from 'app/actions';
import { ICustomer, INWCustomer } from 'app/interfaces';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
    @Input() public list: any[] = [];
    private customerTable: DataTables.DataTable;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<IAppState>,
                private customerActions: CustomerActions) { }

    public ngOnInit() {
    }
    /*
    * Setup everything
    */
    public ngAfterViewInit() {
        this.initTable();
    }
    public ngOnChanges(changes: SimpleChanges) {
        this.updateTable();
    }
    /*
    * Each time we get new data datatables should be updated too
    */
    private updateTable() {
        if (!_.isNil(this.customerTable)) {
            this.customerTable.clear();
            this.customerTable.rows.add(this.list);
            this.customerTable.draw();
        }
    }
    private initTable() {
        this.customerTable = $('#customer').DataTable(<DataTables.Settings>{
            processing: true,
            select: true,
            data: this.list,
            columns:  [
                { 'data' : 'CompanyName', title: 'Company' },
                { 'data' : 'ContactTitle', title: 'Title' },
                { 'data' : 'ContactName', title: 'Contact' },
                { 'data' : 'Phone' },
                { 'data' : 'Address' },
                { 'data' : 'PostalCode', title: 'Zip' },
                { 'data' : 'City' },
                { 'data' : 'Country' }
            ]
        });
        this.customerTable.on('select', (e: Event, dt: DataTables.DataTable,
                                         type: string, indexes: number[]) => {
              let row: INWCustomer = dt.rows(indexes[0]).data()['0'];
              const customer = this.toLocalCustomer(row);
              this.store.dispatch(this.customerActions.customerSelected(customer));
        });
    }

    private toLocalCustomer(c: INWCustomer): ICustomer {
        return {
                companyName: c.CompanyName,
                contactName: c.ContactName,
                phone: c.Phone,
                fax: c.Fax,
                id: c.CustomerID,
                contactTitle: c.ContactTitle,
                address: c.Address,
                city: c.City,
                postalCode: c.PostalCode,
                country: c.Country,
                active_debt: undefined,
                picture: undefined
              };
    }

}
