

appStartup.$inject = ['cfpLoadingBarProvider'];

export function appStartup(cfpLoadingBarProvider: angular.loadingBar.ILoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.includeSpinner = false;
}
