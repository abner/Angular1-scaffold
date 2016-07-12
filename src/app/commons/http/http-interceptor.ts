
// This base class in needed to avoid the interceptors to lose the reference of 'this'
// which occurs because of the way calls the interceptors methods
// REF: http://stackoverflow.com/a/34163273
export class HttpInterceptor {
  constructor() {
    ['request', 'requestError', 'response', 'responseError']
        .forEach((method) => {
          if (this[method]) {
            this[method] = this[method].bind(this);
          }
        });
  }
}
