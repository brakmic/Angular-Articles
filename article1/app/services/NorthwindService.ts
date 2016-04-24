import { Injectable }             from "angular2/core";
import { Http, Response }         from "angular2/http";
import { Observable }             from "rxjs/Observable";
import { ICustomer }              from "../interfaces/ICustomer";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class NorthwindService {
    private nwUrl = "http://northwind.servicestack.net/customers.json";

    constructor(private _http: Http) {}
    getCustomers() {
        return this._http.get(this.nwUrl)
                        .map((response : Response) => response.json())
                        .catch(this.onError);
    }

    getCustomersEx(): Observable<ICustomer[]> {
        return this._http.get(this.nwUrl)
                          .map((response: Response) => <ICustomer[]>(response.json().Customers))
                          .catch(this.onError);
    }

    private onError(error: Response) {
        return Observable.throw(error.json().error || "Internal server error");
    }

}