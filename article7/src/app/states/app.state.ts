import { Observable } from 'rxjs/Observable';
import { ActionReducer } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
// For composing any number of functions in a chain.
// It takes  value and executes each of the composed functions
// with it thus returning the final outcome back.
import { compose } from '@ngrx/core/compose';
// to prevent accidental state mutations
import { storeFreeze } from 'ngrx-store-freeze';
// Like the above `compose` this function takes all reducers and 
// combines them into one meta-reducer that encompasses the 
// whole application state. In some way reducers resemble tables
// and combineReducers acts like a database.
import { combineReducers } from '@ngrx/store';
// our sub-states, reducers and interfaces
import * as fromSubstates from './sub-states';
import { ICustomerState } from './sub-states'; 
import { ICustomer } from '../interfaces';
import { customerReducer } from '../reducers';

// currently our 'database' comprises of a single table
export interface IAppState {
    customerState: fromSubstates.ICustomerState
};

// and we have only a single reducer here
const reducers = {
  customerState: customerReducer
};

const developmentReducer: ActionReducer<IAppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);

// our meta-reducer will take care of forwarding all actions
export function AppReducer(state: any, action: any) {
  if (String('<%= BUILD_TYPE %>') === 'dev') {
    return developmentReducer(state, action);
  } else {
    return productionReducer(state, action);
  }
}

/**
 * These are helper methods for state extraction
 */

export function getCustomerState(state$: Observable<IAppState>): Observable<ICustomerState> {
  return state$.select(state => state.customerState);
}

export const getCustomer: (obs: Observable<IAppState>) => Observable<ICustomer> = compose(fromSubstates.getCustomer, getCustomerState);
