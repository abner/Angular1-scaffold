import { bootstrap } from 'ng-metadata/platform-browser-dynamic';
import { enableProdMode } from 'ng-metadata/core';

import { AppComponent } from './app';
import { THIRD_PARTY_MODULES, APP_INITIALIZERS, APP_PROVIDERS, APP_PIPES } from './app/app.dependencies';

if (ENV === 'production') {
  enableProdMode();
}

// bootstraps the angular using the AppComponent as the Root Component
bootstrap(AppComponent, [
  ...THIRD_PARTY_MODULES,
  ...APP_INITIALIZERS,
  ...APP_PROVIDERS,
  ...APP_PIPES
]);
