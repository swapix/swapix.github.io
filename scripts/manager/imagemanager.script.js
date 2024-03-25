class ImageManager {
    constructor() {
        this.dbName = "__swp_gc_cdb";
        this.dbVersion = 1;
        this.dbStoreName = "images";
        this.dbPromise = this.initDB();
    }

    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = function(event) {
                console.error("Error opening database:", event.target.errorCode);
                reject(event.target.errorCode);
            };

            request.onsuccess = function(event) {
                console.log("Database opened successfully");
                resolve(event.target.result);
            };

            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                db.createObjectStore(this.dbStoreName, { keyPath: "key" });
                console.log("Database upgraded successfully");
            };
        });
    }

    async saveImage(key, url) {
        const db = await this.dbPromise;
        const transaction = db.transaction(this.dbStoreName, "readwrite");
        const store = transaction.objectStore(this.dbStoreName);
        const request = store.put({ key, url });

        request.onerror = function(event) {
            console.error("Error saving image:", event.target.error);
        };

        request.onsuccess = function(event) {
            console.log("Image saved successfully");
        };
    }

    async getImage(key) {
        const db = await this.dbPromise;
        const transaction = db.transaction(this.dbStoreName, "readonly");
        const store = transaction.objectStore(this.dbStoreName);
        const request = store.get(key);

        return new Promise((resolve, reject) => {
            request.onerror = function(event) {
                console.error("Error retrieving image:", event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = function(event) {
                if (event.target.result) {
                    resolve(event.target.result.url);
                } else {
                    resolve(null);
                }
            };
        });
    }

    async deleteImage(key) {
        const db = await this.dbPromise;
        const transaction = db.transaction(this.dbStoreName, "readwrite");
        const store = transaction.objectStore(this.dbStoreName);
        const request = store.delete(key);

        request.onerror = function(event) {
            console.error("Error deleting image:", event.target.error);
        };

        request.onsuccess = function(event) {
            console.log("Image deleted successfully");
        };
    }
}
