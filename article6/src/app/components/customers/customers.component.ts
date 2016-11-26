import { Component,
         OnInit, Input,
         Output, ChangeDetectorRef,
         ChangeDetectionStrategy,
         SimpleChanges, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
    @Input() public list: any[] = [];
    @Output() public rowSelected = new EventEmitter(true);
    private customerTable: DataTables.DataTable;

    constructor(private cd: ChangeDetectorRef) { }

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
              let row = dt.rows(indexes[0]).data()['0'];
              this.rowSelected.emit({ row });
        });
    }

}
