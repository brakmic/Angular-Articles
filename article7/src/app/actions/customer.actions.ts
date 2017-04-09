import { Action } from '@ngrx/store';
import { type } from '../types';
import { CATEGORY } from '../categories/app.common';
import { ICustomer } from '../interfaces';

export interface ICustomerActions {
  INIT:        string;
  INIT_FAILED: string;
  INITIALIZED: string;
  SELECTED:    string;
  CHANGED:     string;
  SAVED:       string;
  DELETED:     string;
}

export const CustomerActionTypes: ICustomerActions = {
  INIT:        type(`${CATEGORY} Customer Init`),
  INIT_FAILED: type(`${CATEGORY} Customer Init Failed`),
  INITIALIZED: type(`${CATEGORY} Customer Initialized`),
  SELECTED:    type(`${CATEGORY} Customer Selected`),
  CHANGED:     type(`${CATEGORY} Customer Changed`),
  DELETED:     type(`${CATEGORY} Customer Deleted`),
  SAVED:       type(`${CATEGORY} Customer Saved`)
};

export class InitCustomerAction implements Action {
  type = CustomerActionTypes.INIT;
  payload: string = null;
}

export class InitializedCustomerAction implements Action {
  type = CustomerActionTypes.INITIALIZED;

  constructor(public payload: ICustomer) { }
}

export class InitFailedCustomerAction implements Action {
  type = CustomerActionTypes.INIT_FAILED;
  payload: string = null;
}

export class CustomerSelectedAction implements Action {
  type = CustomerActionTypes.SELECTED;

  constructor(public payload: ICustomer) { }
}

export class CustomerChangedAction implements Action {
  type = CustomerActionTypes.CHANGED;
  payload: string = null;

  constructor() { }
}

export class CustomerDeletedAction implements Action {
  type = CustomerActionTypes.CHANGED;
  payload: string = null;

  constructor() { }
}

export class CustomerSavedAction implements Action {
  type = CustomerActionTypes.CHANGED;

  constructor(public payload: ICustomer) { }
}

export type CustomerAction
  = InitCustomerAction
  | InitializedCustomerAction
  | InitFailedCustomerAction
  | CustomerSelectedAction
  | CustomerChangedAction
  | CustomerDeletedAction
  | CustomerSavedAction;
