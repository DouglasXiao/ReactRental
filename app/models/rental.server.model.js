var dbConfig = require('../../config/env/databaseConfig');

function insertOneLine(instance, line) {
        if (!instance) {
                console.warn("The mongodb instance is not valid!");
        }

        // collection
        const table = instance.collection(dbConfig.collectionName);

        // insert data
        table.insertOne(line, function(err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
        });
}

module.exports = {
        insertOneLine,
};