import { ICustomerBase } from './ICustomerBase';
export interface ICustomer extends ICustomerBase {
    picture?: string;
    active_debt?: string;
}
