import { Component,
         OnInit, ChangeDetectorRef,
         ChangeDetectionStrategy } from '@angular/core';

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
    /*
    * Activate WebWorker which resides in a separate JS file
    */
    private initWebWorker() {
        this.worker = new Worker('worker.js');
        // `on-message` callback to receive data from worker
        this.worker.addEventListener('message', (e: MessageEvent) => {
          this.customersList = e.data;
          this.lastEntry = `Got customers list with ${this.customersList.length} entries`;
          this.cd.markForCheck();
        });
    }
    /*
    * Post a command to the worker
    */
    private onGetCustomersClicked($event) {
        this.worker.postMessage({ table: 'Customers'});
    }
    /*
    * React to row selections
    */
    private onRowSelected($event: { row: any }) {
        this.lastEntry = `${$event.row.ContactName} selected`;
    }
}
