import { localStorageProvide } from './localStorage.provider';
import { materialThemeProvide } from './material-theme.provider';
import { httpProviderConfig } from './httpInterceptor.provider';

export const providers = [
    localStorageProvide,
    materialThemeProvide,
    httpProviderConfig
];
