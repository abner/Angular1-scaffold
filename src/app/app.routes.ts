

export interface IStatesConfig {
    [key: string]: ng.ui.IState;
}

export const ROUTES_DEFINITIONS: IStatesConfig = <IStatesConfig> {
    'account-show': {
        name: 'account-show',
        url: '/account/show',
        template: '<account-show-form></account-show-form>',
        data: {
            loginRequired: true
        }
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
        template: '<logout-comp-not-used></logout-comp-not-used>',
        data: {
            loginRequired: true
        }
    },
    'main': {
        name: 'main',
        url: '',
        abstract: true,
        template: '<main-component></main-component>'
        // resolve: {
        //  todoData: TodoService => TodoService.getTodos();
        // }
    },
    'main.index': <any> {
        name: 'main.index',
        url: '/',
        template: '<my-project-box></my-project-box>',
        data: {
            loginRequired: true
        }
    },
    'main.teams': {
        name: 'main.teams',
        url: '/main/teams',
        template: '<my-team-box></my-team-box>',
        data: {
            loginRequired: true
        }
    },
    'main.tasks': {
        name: 'main.tasks',
        url: '/main/tasks',
        template: '<my-task-box></my-task-box>',
        data: {
            loginRequired: true
        }
    },
    'main.projects': {
        name: 'main.projects',
        url: '/main/projects',
        template: '<my-project-box></my-project-box>',
        data: {
            loginRequired: true
        }
    },
    'signup': {
        name: 'signup',
        url: '/signup',
        template: '<signup-form></signup-form>'
        // resolve: {
        //  todoData: TodoService => TodoService.getTodos();
        // }
    },
    'team': <ng.ui.IState> {
        name: 'team',
        url: '/team',
        abstract: true,
        template: `<div ui-view=""></div>`,
        data: {
            loginRequired: true
        }
    },
    'team.list': {
        url: '',
        template: ' <team-list></team-list>',
        data: {
            loginRequired: true
        }
    },
    'team.edit': {
        name: 'team.edit',
        url: '/:id/edit',
        template: '<team-edit></team-edit>',
        data: {
            loginRequired: true
        }
    },
    'team.add': {
        name: 'team.add',
        url: '/new',
        template: '<team-add-form></team-add-form>',
        data: {
            loginRequired: true
        }
    },
    'admin:': {
        name: 'admin',
        url: '/admin',
        template: 'ADMIN PAGE',
        data: {
            loginRequired: true,
            allowedRoles: [ 'Admin']
        }
    }
};


AppRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export function AppRoutesConfig(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
) {
    let key: string;
    for (key in ROUTES_DEFINITIONS) {
        $stateProvider.state(key, ROUTES_DEFINITIONS[key]);
    }

    $urlRouterProvider.otherwise('/');
};
