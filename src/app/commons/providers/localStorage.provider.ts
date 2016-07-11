
import {APP_PREFIX} from '../../app.component';

localStorageProvide.$inject = ['localStorageServiceProvider'];

export function localStorageProvide(
    localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider
) {
    localStorageServiceProvider.setPrefix(APP_PREFIX);
    localStorageServiceProvider.setNotify(true, true);
}
