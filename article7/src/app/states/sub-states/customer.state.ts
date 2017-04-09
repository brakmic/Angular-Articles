import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../interfaces';

export interface ICustomerState {
  customer: ICustomer;
}

export const initialCustomerState: ICustomerState = {
  customer: undefined
};

export function getCustomer(state$: Observable<ICustomerState>) {
  return state$.select(state => state.customer);
}
