import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ICustomer } from '../../interfaces';
import * as customer from '../customer.actions';

@Injectable()
export class CustomerActions {
  public customerInit() {
    return new customer.InitCustomerAction();
  }
  public customerInitialized(payload: ICustomer) {
      return new customer.InitializedCustomerAction(payload);
  }
  public customerInitFailed() {
      return new customer.InitFailedCustomerAction();
  }
  public customerSelected(payload: ICustomer) {
      return new customer.CustomerSelectedAction(payload);
  }
  public customerChanged() {
      return new customer.CustomerChangedAction();
  }
  public customerDeleted() {
      return new customer.CustomerDeletedAction();
  }
  public customerSaved(payload: ICustomer) {
      return new customer.CustomerSavedAction(payload);
  }
}
