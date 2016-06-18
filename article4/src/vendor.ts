// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module


require('script!vendor/jquery-2.1.4.js');
// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router-deprecated';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';

// Immutable
import 'immutable';

// Lodash
import * as _ from 'lodash';
// Themes
import 'bootstrap-loader';
import 'font-awesome-sass-loader';

// Themes
import 'bootstrap-loader';

if ('production' === ENV) {
  // Production


} else {
  // Development

}
