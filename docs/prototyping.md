## Angular Typescript Application Organization

Using the `component way` using ng-metadata decorators and trying to implement the Observable way of doing things too.

The purpose is provide an way of make applications using AngularJS (1.5), because it is more mature and have a lot of plugins and 
is more mature than the emergent Angular 2.


Next step will be use ngx-store to experiment the immutabillity concepts here too.
 

Inspired by http://fuse-angular-material.withinpixels.com/dashboard-project


## Router

  - Using angular ui-router -> https://github.com/angular-ui/ui-router/wiki/Nested-States-and-Nested-Views
  
  
## UI

 - Using Material JS


## Testing


## 

## MockBackendService

- Tested

    - pouchdb
 
        - has option to use in produtction syncing with couchdb as a nosql database
 
        - has a plugin https://github.com/nolanlawson/pouchdb-find to make easy work with indexes and sorting, which i tested and had an strange error, 
   the query planner choose to use the default index and was complaining it would not sort the field i asked it to sort.
   
    - dexiejs
 
        - simplier
    
        - easier way to setup  indexes and have features like pagination and sorting when prototyping applications
    
REFERENCES:

- Pouchdb -> https://github.com/nolanlawson/relational-pouch (Relational Plugin)
- Pouchdb - Secondary index and query -> https://pouchdb.com/guides/queries.html

- Dexie - Store(tables) and Indexes explained https://github.com/dfahlander/Dexie.js/wiki/Version.stores()
- Dexie - usage with Typescript https://github.com/dfahlander/Dexie.js/wiki/Typescript


## Clientside Key Generation


####  DocURI 

Site: https://www.npmjs.com/package/docuri

`npm install --save-dev docuri`

#### slug

 - https://github.com/dodo/node-slug

`npm install --save-dev slug`