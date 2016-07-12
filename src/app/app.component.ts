import { Component, OnInit, Inject, OpaqueToken} from 'ng-metadata/core';

import { ShowIfLoggedDirective } from './commons/auth';

import { LAYOUT_COMPONENTS } from './commons/layout';
import { MainComponent } from './components/main';
import { LOGIN_COMPONENTS } from './components/login';
import { SIGNUP_COMPONENTS } from './components/signup';
import { ACCOUNT_COMPONENTS } from './components/account';
import { TEAM_COMPONENTS } from './components/team';
import { COMMONS_DIRECTIVES } from './commons/directives';

import { HTTP_INTERCEPTORS_PROVIDERS } from './app.http.interceptors';

import { AppNavigationService, LOGIN_ROUTE_NAME, NOTFOUND_ROUTE_NAME  } from './app-navigation.service';

import { UserNotificationService } from './commons/notification/user-notification.service';

export const APP_TITLE = 'My App - Abner ®';
export const APP_PREFIX = 'myapp';
export const APP_NAME = 'MY APP';

export const APP_TITLE_TOKEN = new OpaqueToken('APP_TITLE');
export const APP_PREFIX_TOKEN = new OpaqueToken('APP_PREFIX');
export const APP_NAME_TOKEN = new OpaqueToken('APP_NAME');


@Component({
  selector: 'my-app',
  styles: [require('./app.scss')],
  template: require('./app.html'),
  providers: [
    { provide: APP_TITLE_TOKEN, useValue: APP_TITLE },
    { provide: APP_PREFIX_TOKEN, useValue: APP_PREFIX },
    { provide: APP_NAME_TOKEN, useValue: APP_NAME },
    // PROVIDING ROUTES FOR LOGIN AND NOT FOUND TO BE USED BY AppNavigationService
    { provide: LOGIN_ROUTE_NAME, useValue: 'login' },
    { provide: NOTFOUND_ROUTE_NAME, useValue: '404' },

    { provide: UserNotificationService, useClass: UserNotificationService },
    { provide: AppNavigationService, useClass: AppNavigationService },

    ...HTTP_INTERCEPTORS_PROVIDERS
  ],
  directives: [
    MainComponent,
    ...COMMONS_DIRECTIVES,
    ...LAYOUT_COMPONENTS,
    ...LOGIN_COMPONENTS,
    ...SIGNUP_COMPONENTS,
    ...ACCOUNT_COMPONENTS,
    ...TEAM_COMPONENTS,
    ShowIfLoggedDirective
  ]
})
export class AppComponent implements OnInit {

  searchEnabled: boolean = false;
  loading: boolean = false;

  constructor(
    @Inject('$log') private _$log: ng.ILogService,
    @Inject(APP_NAME_TOKEN) appName: String,
    @Inject(AppNavigationService) appNavigationService: AppNavigationService
  ) {
    _$log.info('APP NAME -----> ', appName);
  }

  ngOnInit() {
    this._$log.log('hello from pluto during OnInit');
  }

}
