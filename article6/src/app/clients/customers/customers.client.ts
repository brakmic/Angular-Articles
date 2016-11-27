// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/from';

// Circular JSON (for better serializing of complex objects)
import 'circular-json';

import { Observable } from 'rxjs/Observable';


const _url = `https://brakmic.github.io/sw-demo/assets/data/customers.json`;

export class CustomersClient {
    constructor(private url: string = _url) {
    }
    /**
     * Return customers list
     * @returns {Observable<JSON>} Returns an Observable<JSON> 
     */
    public getCustomers(): Observable<JSON> {
       return Observable.fromPromise(self.fetch(this.url)
            .then(response => {
                return response.json();
            }));
    }
}
