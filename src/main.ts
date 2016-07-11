import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';

// let uiMask = require('angular-ui-mask');

import { bootstrap } from 'ng-metadata/platform-browser-dynamic';
import { enableProdMode } from 'ng-metadata/core';
import { AppComponent } from './app';
import { AsyncPipe } from 'ng-metadata/common';
import { providers as appProviders} from './app/commons/providers';

// import { APP_ROOT_MODULE } from './app/module';

import AppRoutesConfig from './app/app.routes';

if (ENV === 'production') {
  enableProdMode();
}

const dependencies = [
  ngMaterial,
  uiRouter,
  'LocalStorageModule',
  // 'angular-input-masks',
  // uiMask,
  ...appProviders,
  AppRoutesConfig,
  AsyncPipe,
  { provide: 'APP_PREFIX', useValue: 'myapp'}
  // APP_ROOT_MODULE
];

bootstrap(AppComponent, dependencies);
