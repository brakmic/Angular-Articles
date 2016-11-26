import * as _ from 'lodash';
import { ICustomer, IOrder } from 'app/interfaces';
import doFetch from './fetch';
/**
 * Return customer list from Northwind DB
 */
function getCustomers(): Promise<ICustomer[]> {
    return doFetch('https://services.odata.org/V3/Northwind/Northwind.svc/Customers?$format=json')
           .then(data => {
                return (<any>data).value;
           });
}
/**
 * Return orders from Northwind DB
 */
function getOrders(): Promise<IOrder[]> {
    return doFetch('http://northwind.servicestack.net/orders?format=json');
}

const northwindApi = {
    getCustomers,
    getOrders
};

export {
    northwindApi
}

