// angular
import {
  Injectable, Inject,
  forwardRef
} from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../interfaces';
import { IAppState } from '../states';
import { PaymentService, ImageService } from '../services';
import * as _ from 'lodash';
import { CustomerAction, CustomerActionTypes,
         CustomerActions } from '../actions';

@Injectable()
export class CustomerEffects {

  @Effect() customerSelected$: Observable<Action> = this.actions$
    .ofType(CustomerActionTypes.SELECTED)
    .map(action => {
        let customer: ICustomer = _.cloneDeep(action.payload);
        customer.active_debt = this.paymentService.activeDebt(customer.id);
        customer.picture = this.imageService.imageUrl(customer.id);
        return this.customerActions.customerInitialized(customer);
    });

  constructor(private store: Store<IAppState>,
    private actions$: Actions,
    private customerActions: CustomerActions,
    private paymentService: PaymentService,
    private imageService: ImageService) { }

}
