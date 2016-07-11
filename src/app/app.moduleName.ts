
import {APP_PREFIX} from './app.component';

export default function moduleName(name) {
    return APP_PREFIX + '.' + name;
}
