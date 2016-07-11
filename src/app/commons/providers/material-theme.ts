materialThemeProvide.$inject = ['$mdThemingProvider'];
export function materialThemeProvide($mdThemingProvider: angular.material.IThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .warnPalette('orange')
    .accentPalette('blue');
}
