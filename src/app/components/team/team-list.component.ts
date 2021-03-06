import { Component, Inject, OpaqueToken, OnInit, ChangeDetectionStrategy } from 'ng-metadata/core';
import { Observable } from 'rxjs/Observable';
import { BackendService } from '../../commons/services/backend';
import { Team } from '../../commons/models';

import { TeamBackendRestService } from './rest.service';
import { TeamBackendMockService } from './mock.service';

import {TEAM_BACKEND_SERVICE} from './backend.service';
import { TEAM_BACKEND_SERVICE_PROVIDE } from './backend.service.provide';


@Component({
    selector: 'team-list',
    template: require('./_list.html'),
    styles: require('./team.scss')
    ,
    providers: [
        TEAM_BACKEND_SERVICE_PROVIDE
    ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class TeamListComponent implements OnInit {
    list: Observable<Team[]>;
    total: Observable<number>;
    currentTeam: Team = null;

    QTD_PER_PAGE = 5;

    currentPage = 1;

    findAllParams: any = {
        pagination: {
            limit: 5,
            offset: 0
        }
    };

    constructor(
        @Inject('$scope') private $scope: ng.IScope,
        @Inject(TEAM_BACKEND_SERVICE) private backendService: BackendService<Team>,
        @Inject('$mdBottomSheet') private $mdBottomSheet: ng.material.IBottomSheetService,
        @Inject('$mdDialog') private $mdDialog: ng.material.IDialogService,
        @Inject('$element') private $element: ng.IAugmentedJQuery,
        @Inject('$state') private $state: ng.ui.IStateService
    ) {
    }


    ngOnInit() {
        this.list = this.backendService.getAll(this.findAllParams);
        this.total = this.backendService.count(this.backendService.count());

        this.backendService.onChanges().subscribe(e => {
            this.list = this.backendService.getAll(this.findAllParams);
            this.total = this.backendService.count(this.backendService.count());
            this.$scope.$applyAsync();
        });
    }

    addNewTeam($event) {
        this.$mdBottomSheet.show({
            template: `
            <team-add-form (onSave)="console.log('update clicked!');$ctrl.teamSaved($event)"></team-add-form>
            `
        });
    }


    editTeam(team, $event) {
        this.currentTeam = team;
        this.$mdBottomSheet.show({
            template: `
            <team-edit-form
                 [team]="$ctrl.currentTeam"
                 (onSave)="console.log('update clicked!');$ctrl.teamSaved($event)">
            </team-edit-form>
            `,
            scope: this.$scope.$new()
        });
    }

    delete(team: Team, $event) {
        let confirm: ng.material.IConfirmDialog = this.$mdDialog.confirm()
            .title('Are you sure?')
            .textContent('This will remove the team ' + team.name + '. Confirm delete?')
            .ok('Yes')
            .targetEvent($event)
            .cancel('No');

        this.$mdDialog.show(confirm).then(() => {
            this.backendService.delete(team);
        })
    }

    next() {
        this.currentPage += 1;
        this.findAllParams.pagination.offset += this.QTD_PER_PAGE;
        this.findAllParams.pagination.limit += this.QTD_PER_PAGE;
        this.refresh();
    }

    previous() {
        this.currentPage -= 1;
        this.findAllParams.pagination.offset -= this.QTD_PER_PAGE;
        this.findAllParams.pagination.limit -= this.QTD_PER_PAGE;
        this.refresh();
    }

    refresh() {
        this.list = this.backendService.getAll(this.findAllParams);
        this.$scope.$applyAsync();
    }
}

