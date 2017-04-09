import './app.loader';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState, PaymentService,
         ImageService } from 'app/services';
import { StoreType } from 'app/types';
import { MyAppComponent, CustomersComponent,
         InfoComponent } from 'app/components';
import { AppReducer } from './states';
import { CustomerActions } from 'app/actions';
import { CustomerEffects } from 'app/effects';
import { ENV_PROVIDERS } from '../init/environment';

export const APP_ACTIONS: any[] = [
  CustomerActions
];

export const APP_EFFECTS: any[] = [
  CustomerEffects
];

export const APP_PROVIDERS: any[] = [
  ImageService,
  PaymentService,
  AppState
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ MyAppComponent ], // declare Main component
  providers: [      // provide Services to Angular's Dependency Injection mechanism
   APP_PROVIDERS,
   ENV_PROVIDERS,
   APP_ACTIONS,
   APP_EFFECTS
  ],
  imports: [          // import Angular's & own modules
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(CustomerEffects),
  ],
  declarations: [     // load all available components & directives
    MyAppComponent,
    CustomersComponent,
    InfoComponent
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef,
              public appState: AppState) {}
  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
