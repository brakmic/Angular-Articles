import { ICustomer } from "./ICustomer";

export interface ICustomerSelectedEvent {
    sender   : Object,
    customer : ICustomer;
}