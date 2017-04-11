import { Component,
         OnInit, OnDestroy,
         ChangeDetectorRef,
         ChangeDetectionStrategy } from '@angular/core';
import { CustomersClient } from 'app/clients';
import { ICustomer } from 'app/interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IAppState, getCustomer } from '../../states';

const logger = require('bows')('MyApp');

@Component({
    selector: 'my-app',
    templateUrl: './my-app.component.html',
    styleUrls: ['./my-app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAppComponent implements OnInit,
                                       OnDestroy {
    private customersList: any[] = [];
    private customer: Observable<ICustomer>;
    private client: CustomersClient;
    private customerSubscription: Subscription;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<IAppState>) { }

    public ngOnInit() {
        this.initStorageClient();
        this.getCustomerObservable();
    }

    public ngOnDestroy() {
    }

    private initStorageClient() {
        this.client = new CustomersClient();
    }
    
    private onGetCustomersClicked($event) {
        this.client.getCustomers().subscribe(e => {
            this.customersList = (<any>e).Customers;
            this.cd.detectChanges();
        });
    }

    private getCustomerObservable() {
        this.customer = getCustomer(this.store);
    }
}
