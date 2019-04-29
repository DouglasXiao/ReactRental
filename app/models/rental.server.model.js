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

function queryLines(instance, socket) {
        if (!instance) {
                console.warn("The mongodb instance is not valid!");
        }

        // collection
        const table = instance.collection(dbConfig.collectionName);

        // query data
        // TODO: when finding locations, need to filter the places by distance
        table.find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                
                if (socket !== undefined) {
                        socket.emit('serverToClientChannel', result);
                }
        });
}

module.exports = {
        insertOneLine,
        queryLines,
};