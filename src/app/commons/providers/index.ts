import { localStorageProvide } from './localStorage';
import { materialThemeProvide } from './material-theme';

export const providers = [
    localStorageProvide,
    materialThemeProvide
];
