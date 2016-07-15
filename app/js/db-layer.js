let indexedDBLayer = (function () {
    const db = Symbol('db'); // Database reference
    const storeName = Symbol('TODO-list'); // database name
    const schema = {
        id: "01",
        name: "Rafael",
        status: "TODO",
        text: "I need to do stuff bro!",
        email: "rafatexfr@gmail.com"
    };


    class indexedDBLayer {
        constructor(readyCallback) {
            var self = this;
            var openDBRequest = indexedDB.open(this[storeName]);

            openDBRequest.onerror = function (event) {
                console.log("Why didn't you allow my web app to use IndexedDB?!");
            };

            openDBRequest.onsuccess = function (event) {
                console.log('You can now add stuff to the database');
                self[db] = event.target.result;
            };

            // This event is only implemented in recent browsers
            openDBRequest.onupgradeneeded = function (event) {
                self[db] = event.target.result;

                self[db].onerror = function (event) {
                    // Generic error handler for all errors targeted at this database's requests!
                    console.log("Database error: " + event.target.errorCode);
                };

                // Create an objectStore for this database. We're going to use "id" as our
                // key path because it's guaranteed to be unique.
                var todoStore = self[db].createObjectStore(self[storeName], {keyPath: "id"});

                // Create an index to search todos by the posters name.
                // We may have duplicates so we can't use a unique index.
                todoStore.createIndex("name", "name", {unique: false});

                // Create an index to search posts by email. We want to ensure that
                // no two users have the same email, so we use a unique index.
                todoStore.createIndex("email", "email", {unique: true});

                // Use transaction oncomplete to make sure the objectStore creation is
                // finished before adding data into it.
                todoStore.transaction.oncomplete = function (event) {
                    console.log('You can now add stuff to the database');
                };
            };
        }


        // API functions

        list() {
            var tx = this[db].transaction([this[storeName]], "readonly");
            var objectStore = tx.objectStore(this[storeName]);

            return new Promise(function (resolve, reject) {
                var listRequest = objectStore.getAll();
                listRequest.onerror = function (event) {
                    // Handle errors!
                    reject(event);
                };

                listRequest.onsuccess = function (event) {
                    // Do something with the request.result!
                    resolve(listRequest.result);
                };
            });
        }


        getTodo(id) {
            var tx = this[db].transaction([this[storeName]], "readonly");
            var objectStore = tx.objectStore(this[storeName]);

            return new Promise(function (resolve, reject) {
                var getRequest = objectStore.get(id);

                getRequest.onerror = function (event) {
                    // Handle errors!
                    reject(event);
                };

                getRequest.onsuccess = function (event) {
                    // Do something with the request.result!
                    resolve(getRequest.result);
                };
            });
        }


        addTodo(todoJson) {
            var tx = this[db].transaction([this[storeName]], "readwrite");
            var objectStore = tx.objectStore(this[storeName]);

            return new Promise(function (resolve, reject) {
                var addRequest = objectStore.add(todoJson);

                addRequest.onerror = function (event) {
                    // Handle errors!
                    reject(event);
                };

                addRequest.onsuccess = function (event) {
                    // Do something with the request.result!
                    resolve(addRequest.result);
                };
            });
        }


        updateTodo(todoJson) {
            var tx = this[db].transaction([this[storeName]], "readwrite");
            var objectStore = tx.objectStore(this[storeName]);

            return new Promise(function (resolve, reject) {
                var updateRequest = objectStore.put(todoJson);

                updateRequest.onerror = function (event) {
                    // Handle errors!
                    reject(event);
                };

                updateRequest.onsuccess = function (event) {
                    // Success - the data is updated!
                    resolve(updateRequest.result);
                };
            });
        }

        deleteTodo(id) {
            var tx = this[db].transaction([this[storeName]], "readwrite");
            var objectStore = tx.objectStore(this[storeName]);

            return new Promise(function (resolve, reject) {
                var deleteRequest = objectStore.delete(id);

                deleteRequest.onerror = function (event) {
                    // Handle errors!
                    reject(event);
                };

                deleteRequest.onsuccess = function (event) {
                    // Success - the data is deleted!
                    resolve(deleteRequest.result);
                };
            });
        }
    }

    return indexedDBLayer;
}());