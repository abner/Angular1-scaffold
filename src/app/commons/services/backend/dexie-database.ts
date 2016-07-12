import Dexie from 'dexie';

import { Team } from '../../models/';

export class DexieDatabase extends Dexie  {

    // contacts: Dexie.Table<IContact, number>;
    // emails: Dexie.Table<IEmailAddress, number>;
    teams: Dexie.Table<Team, number>;

    constructor() {

        super('MyAppDatabase');

        //
        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        //
        this.version(1).stores({
            teams: '++id, &name'
        });
    }
}
