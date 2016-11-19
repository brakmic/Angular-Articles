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
import * as odata from 'odata';

const _url = `http://services.odata.org/V4/Northwind/Northwind.svc/`;

export class NwClient {
    constructor(private url: string = _url,
                private headers: any[] = []) {
        this.setupOData();
    }
    /**
     * Asynchronously execute an OData query 
     * @returns {Observable<ISupplier>} Returns an Observable 
     */
    public get(table: string): Observable<{ data: any }> {
       const obs = odata(table).get();
       return Observable.fromPromise(obs);
    }
    private setupOData = () => {
        odata().config({
            endpoint: this.url,
            json: true,       // currently only json is supported
            version: 4,       // oData version (currently supported version 4\. However most also work with version 3.)
            strictMode: true, // strict mode throws exceptions, non strict mode only logs them
            start: null,      // a function which is executed on loading
            ready: null,      // a function which is executed on ready
            error: null,      // a function which is executed on error
            headers: this.headers,        // an array of additional headers e.g.: [{name:'headername',value:'headervalue'}]
            username: null,   // a basic auth username
            password: null,   // a basic auth password
            isAsync: true     // set this to false to make synced (a)jax calls. (doesn't work with basic auth!)
        });

    }
}
