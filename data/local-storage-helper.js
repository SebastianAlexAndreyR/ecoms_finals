class LocalStorageHelper {    
    add = function(storageKey, value) {
        var allItems = this._getFromStorage(storageKey);

        value.id = this._generateId(storageKey);

        allItems.push(value);
        this._setToStorage(storageKey, allItems);
    }

    update = function(storageKey, value) {
        var allItems = this._getFromStorage(storageKey);

        var updatedValue = allItems.map(function(item) {
            if (item.id == value.id)
                return value;

            return item;
        });

        this._setToStorage(storageKey, updatedValue);
    }

    getById = function(storageKey, id) {
        var allItems = this._getFromStorage(storageKey);

        return allItems.find(function(item) {
            return item.id == id;
        });
    }

    getList = function(storageKey) {
        return this._getFromStorage(storageKey);
    }

    deleteItem = function(storageKey, id) {
        var allItems = this._getFromStorage(storageKey);

        var filteredItems = allItems.filter(function(item) {
            return item.id != id;
        });

        this._setToStorage(storageKey, filteredItems);
    }



    _getFromStorage = function(key) {
        return JSON.parse(localStorage.getItem(key) ?? "[]");
    }

    _setToStorage = function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    _generateId = function(storageKey) {
        var allItems = this._getFromStorage(storageKey);
        
        if (!allItems?.length)
            return 1;

        var sorted = allItems.map(function(item) {
            return item.id
        }).sort(function(a,b) {
            return b - a;
        });

        return sorted[0] + 1;

    }
}