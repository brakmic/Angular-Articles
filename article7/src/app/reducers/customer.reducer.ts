import { ICustomerState, initialCustomerState } from '../states/sub-states';
import { CustomerAction, CustomerActionTypes } from '../actions';

export function customerReducer(
    state: ICustomerState = initialCustomerState,
    action: CustomerAction
): ICustomerState {
  switch (action.type) {
    case CustomerActionTypes.INITIALIZED:
      return (<any>Object).assign({}, state, {
        customer: action.payload
      });
    case CustomerActionTypes.SAVED:
      return (<any>Object).assign({}, state, {
        customer: action.payload
      });
    case CustomerActionTypes.DELETED:
      return (<any>Object).assign({}, state, {
        customer: undefined
      });
    default:
      return state;
  }
}
