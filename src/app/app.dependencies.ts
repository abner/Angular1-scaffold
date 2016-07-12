import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import * as ngAnimate from 'angular-animate';
// let uiMask = require('angular-ui-mask');
import { AppRoutesConfig } from './app.routes';
import { appStartup } from './app.startup';
import { AsyncPipe } from 'ng-metadata/common';
import { providers as appCommonsProviders} from './commons/providers';


export const APP_PROVIDERS = [
    ...appCommonsProviders,
    AppRoutesConfig,
    { provide: 'APP_PREFIX', useValue: 'myapp' }
];

export const APP_INITIALIZERS = [
    appStartup
]

export const APP_PIPES = [
    AsyncPipe
];

export const THIRD_PARTY_MODULES = [
    'angular-loading-bar',
    ngMaterial,
    ngAnimate,
    uiRouter,
    'LocalStorageModule',
    // 'angular-input-masks',
    // uiMask,
];
