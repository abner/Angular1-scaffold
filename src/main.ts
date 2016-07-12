import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import * as ngAnimate from 'angular-animate';
// let uiMask = require('angular-ui-mask');

import { bootstrap } from 'ng-metadata/platform-browser-dynamic';
import { enableProdMode } from 'ng-metadata/core';
import { AppComponent } from './app';
import { AsyncPipe } from 'ng-metadata/common';
import { providers as appProviders} from './app/commons/providers';

// import { APP_ROOT_MODULE } from './app/module';

import { AppRoutesConfig } from './app/app.routes';
import { appStartup } from './app/app.startup';

if (ENV === 'production') {
  enableProdMode();
}

const dependencies = [
  'angular-loading-bar',
  ngMaterial,
  ngAnimate,
  uiRouter,
  'LocalStorageModule',
  // 'angular-input-masks',
  // uiMask,
  ...appProviders,
  AppRoutesConfig,
  appStartup,
  AsyncPipe,
  { provide: 'APP_PREFIX', useValue: 'myapp'}

  // APP_ROOT_MODULE
];

bootstrap(AppComponent, dependencies);
