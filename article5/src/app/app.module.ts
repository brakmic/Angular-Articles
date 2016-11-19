import './app.loader';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AppState } from 'app/services';
import { StoreType } from 'app/types';
import { MyAppComponent, CustomersComponent,
         ConsoleComponent } from 'app/components';
import { ENV_PROVIDERS } from '../init/environment';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ MyAppComponent ], // declare Main component
  providers: [      // provide Services to Angular's Dependency Injection mechanism
   AppState,
   ...ENV_PROVIDERS
  ],
  imports: [          // import Angular's & own modules
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [     // load all available components & directives
    MyAppComponent,
    CustomersComponent,
    ConsoleComponent
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
