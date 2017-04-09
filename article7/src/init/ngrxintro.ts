// Vendor scripts go here
// -----------------------
window.$ = window.jQuery = require('jquery');
require('bootstrap-loader');
require('datatables.net')();
require('datatables.net-bs')();
require('datatables.net-buttons')();
require('datatables.net-colreorder')();
require('datatables.net-fixedcolumns')();
require('datatables.net-fixedheader')();
require('datatables.net-keytable')();
require('datatables.net-responsive')();
require('datatables.net-scroller')();
require('datatables.net-autofill')();
require('datatables.net-select')();
import '@angularclass/hmr';

import '../vendor/dom/dom4.min';
import '../vendor/dom/browser-events';
import '../vendor/dom/bows-alt';

// Hammjer.js
import 'hammerjs';

import '../vendor/jquery/jquery.hammer.js';

// Lodash
import * as _ from 'lodash';

// Circular JSON (for better serializing of complex objects)
import 'circular-json';

if ('production' === ENV) {
  // Production

} else {
  // Development
  require('angular2-hmr');
}
