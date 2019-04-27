var dbConfig = require('../config/env/databaseConfig');
var MongoClient = require('mongodb').MongoClient;

let dbInstance;

function initDb(callback) {
        if (dbInstance) {
                console.warn("Trying to init mongodb instance again!");
                return callback(null, dbInstance);
        }

        // Init MongoDB
        MongoClient.connect(dbConfig.MONGO_CONN_STR, { useNewUrlParser: true }, function(err, database) {
                if (err) throw err;

                console.log("MongoDB initialized!");
                dbInstance = database.db(dbConfig.DB_CONN_STR);

                return callback(null, dbInstance);
        });
}

module.exports = {
        initDb,
};