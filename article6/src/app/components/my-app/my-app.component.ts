import { Component,
         OnInit, ChangeDetectorRef,
         ChangeDetectionStrategy } from '@angular/core';
import { NwClient } from 'app/clients';
import { ICustomerData } from 'app/interfaces';
const logger = require('bows')('MyApp');

@Component({
    selector: 'my-app',
    templateUrl: './my-app.component.html',
    styleUrls: ['./my-app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAppComponent implements OnInit {
    private worker: ServiceWorker;
    private customersList: any[] = [];
    private customerData: ICustomerData;
    private digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    private client: NwClient;

    constructor(private cd: ChangeDetectorRef) { }

    public ngOnInit() {
        this.initServiceWorker();
        this.initStorageClient();
    }
    /*
    * Install and run ServiceWorker which resides in a separate JS file
    */
    private initServiceWorker() {
        navigator.serviceWorker.register('./my-sw.js').then(registration => {
            logger.log(`Registered service worker with scope ${registration.scope}`);
        }).catch(err => {
            logger.log(`Could not register service worker. Reason: ${err}`);
        });
    }
    private initStorageClient() {
        this.client = new NwClient();
    }
    /*
    * Post a command to the worker
    */
    private onGetCustomersClicked($event) {
        this.client.get('Customers').subscribe(e => {
            this.customersList = e.data;
            this.cd.markForCheck();
            logger.log(`Got customers: ${e.data}`);
        });
    }
    /*
    * React to row selections
    */
    private onRowSelected($event: { row: any }) {
        const customer = $event.row.ContactName.replace(' ', '_');
        const picture = this.digits[Math.floor(Math.random() * this.digits.length)];
        const c = $event.row;
        this.customerData = {
            picture: `https://localhost:8080/assets/images/${picture}.png`,
            companyName: c.CompanyName,
            contactName: c.ContactName,
            phone: c.Phone,
            fax: c.Fax,
            id: c.CustomerID,
            contactTitle: c.ContactTitle,
            address: c.Address,
            city: c.City,
            postalCode: c.PostalCode,
            country: c.Country
        };
        this.cd.markForCheck();
    }
}
