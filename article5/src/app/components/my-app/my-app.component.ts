import { Component,
         OnInit, ChangeDetectorRef,
         ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
const domready = require('domready');

@Component({
    selector: 'my-app',
    templateUrl: './my-app.component.html',
    styleUrls: ['./my-app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAppComponent implements OnInit {
    private worker: Worker;
    private customersList: any[] = [];
    private lastEntry: string = '';

    constructor(private cd: ChangeDetectorRef) { }

    public ngOnInit() {
        this.initWebWorker();
    }

    private initWebWorker() {
        // activate WebWorker which resides in a separate JS file in www-root dir
        this.worker = new Worker('worker.js');
        // `on-message` callback to receive data from worker
        this.worker.addEventListener('message', (e: MessageEvent) => {
          this.customersList = e.data;
          this.lastEntry = `Got customers list with ${this.customersList.length} entries`;
          this.cd.markForCheck();
        });
    }

    private getCustomers($event) {
        // post a command to the worker
        this.worker.postMessage({ table: 'Customers'});
    }

    private onRowSelected($event: { row: any }) {
        this.lastEntry = `${$event.row.ContactName} selected`;
    }
}
