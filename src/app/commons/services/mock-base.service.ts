interface TypeWithId {
    id: number;
}

export class MockService<T extends TypeWithId> {
    constructor(private data: T[]) {

    }

    findOne(id: number): T {
        // find the game that matches that id
        let list = $.grep(this.getData(), function (element: any, index: number) {
            return (element.id === id);
        });
        if (list.length === 0) {
            return <T> {};
        }
        // even if list contains multiple items, just return first one
        return list[0];
    }

    getData(): T[] {
        return this.data;
    }

    findAll() {
        return this.getData();
    };

    findMany(options: T): T[] {
        // find pessoa that match all of the options
        let list = $.grep(this.getData(), function (element, index) {
            let matchAll = true;
            $.each(options, function (optionKey, optionValue) {
                if (element[optionKey] !== optionValue) {
                    matchAll = false;
                    return false;
                }
            });
            return matchAll;
        });
        return list;
    };

    addOne(dataItem: T): T {
        // must calculate a unique ID to add the new data
        let newId = this.newId();
        dataItem.id = newId;
        this.data.push(dataItem);
        return dataItem;
    };

    private newId() {
        // find all current ids
        let currentIds = $.map(this.getData(), function (dataItem) { return dataItem.id; });
        // since id is numeric, and we will treat like an autoincrement field, find max
        let maxId = Math.max.apply(Math, currentIds);
        // increment by one
        return maxId + 1;
    };

    updateOne(id: number, dataItem: T): T {
        // find the game that matches that id
        let list = this.getData();
        let match = null;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                match = list[i];
                break;
            }
        }
        if (!angular.isObject(match)) {
            return <T> {};
        }
        angular.extend(match, dataItem);
        return match;
    };

    deleteOne(id: number): boolean {
        // find the game that matches that id
        let list = this.getData();
        let match = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                match = true;
                list.splice(i, 1);
                break;
            }
        }
        return match;
    };

}
