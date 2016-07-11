

export interface IStatesConfig {
    [key: string]: ng.ui.IState;
}


export const ROUTES_DEFINITIONS: IStatesConfig = <IStatesConfig>{
    'account-show': {
        name: 'account-show',
        url: '/account/show',
        template: '<account-show-form></account-show-form>'
    },
    'login': {
        url: '/login',
        template: '<login-form></login-form>'
        // resolve: {
        //  todoData: TodoService => TodoService.getTodos();
        // }
    },
    'logout': {
        url: '/logout',
        name: 'logout',
        template: '<logout-comp-not-used></logout-comp-not-used>'
    },
    'main': {
        name: 'main',
        url: '/',
        template: '<main-component></main-component>'
        // resolve: {
        //  todoData: TodoService => TodoService.getTodos();
        // }
    },
    'signup': {
        name: 'signup',
        url: '/signup',
        template: '<signup-form></signup-form>'
        // resolve: {
        //  todoData: TodoService => TodoService.getTodos();
        // }
    },
    'team': <ng.ui.IState>{
        name: 'team',
        url: '/team',
        abstract: true,
        template: `
           <div ui-view=""></div>
           `,
        // resolve: {
        //  todoData: TodoService => TodoService.getTodos();
        // }
    },
    'team.list': {
        url: '/',
        template: ' <team-list></team-list>'
    },
    'team.edit': {
        name: 'team.edit',
        url: '/:id/edit',
        template: '<team-edit></team-edit>'
    },
    'team.add': {
        name: 'team.add',
        url: '/new',
        template: '<team-add-form></team-add-form>'
    }
};


AppRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function AppRoutesConfig(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
) {
    let key: string;
    for (key in ROUTES_DEFINITIONS) {
        $stateProvider.state(key, ROUTES_DEFINITIONS[key]);
    }
};
