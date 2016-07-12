import { localStorageProvide } from './local-storage.provider';
import { materialThemeProvide } from './material-theme.provider';
import { httpProviderConfig } from './http-interceptor.provider';

export const providers = [
    localStorageProvide,
    materialThemeProvide,
    httpProviderConfig
];
