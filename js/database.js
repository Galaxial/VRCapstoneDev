

var db;

//SQL Error handler function
//Takes reported errors and prints associated details to console
function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

//DB Object (WebSQL)
//Create database and populate tables with default data
//assign internal db functions
var DB = {

    //createDatabase
    //Creates database
    createDatabase: function () {

        var shortName = "EnvironmentDB";
        var version = "0.1";
        var displayName = "VR Stored Environment Schema DB";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Environments Database...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database EnvironmentDB created successfully.");
        }
    },

    //createTables
    //creates db tables and populates with starter data
    createTables: function () {

        function txFunction(tx) {

            var options = [];

            //TX Success Callback Feedback Functions

            function successCreateEnvironments() {
                console.info("Success: Create table: environments successful.");
            }

            function successUpdateAudioPaths() {
                console.info("Success: Update table: audiopaths successful.");
            }

            function successUpdateImagePaths() {
                console.info("Success: Update table: imagepaths successful.");
            }

            function successCreateAudioPaths() {
                console.info("Success: Create table: audiopaths successful.");
            }

            function successCreateImagePaths() {
                console.info("Success: Create table: imagepaths successful.");
            }


            //Create audiopaths table

            console.info("Creating table: audiopaths");

            var sql = "CREATE TABLE IF NOT EXISTS audiopaths(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name TEXT," +
                "path TEXT);";

            tx.executeSql(sql, options, successCreateAudioPaths, errorHandler);

            //Insert included audio data 1

            var sql = "INSERT INTO audiopaths(name, path) SELECT'forest','/media/forest.mp3' WHERE NOT EXISTS (SELECT * FROM audiopaths WHERE id = 1);";

            tx.executeSql(sql, options, successUpdateAudioPaths, errorHandler);

            //Insert included audio data 2

            var sql = "INSERT INTO audiopaths(name, path) SELECT'alleyway','/media/alleyway.mp3' WHERE NOT EXISTS (SELECT * FROM audiopaths WHERE id = 2);";

            tx.executeSql(sql, options, successUpdateAudioPaths, errorHandler);

            //Insert included audio data 3

            var sql = "INSERT INTO audiopaths(name, path) SELECT'studio','/media/studio.mp3' WHERE NOT EXISTS (SELECT * FROM audiopaths WHERE id = 3);";

            tx.executeSql(sql, options, successUpdateAudioPaths, errorHandler);

            //Insert included audio data 4

            var sql = "INSERT INTO audiopaths(name, path) SELECT'factory','/media/factory.mp3' WHERE NOT EXISTS (SELECT * FROM audiopaths WHERE id = 4);";

            tx.executeSql(sql, options, successUpdateAudioPaths, errorHandler);




            //Create imagepaths table

            console.info("Creating table: imagepaths");

            var sql = "CREATE TABLE IF NOT EXISTS imagepaths(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name TEXT," +
                "path TEXT);";

            tx.executeSql(sql, options, successCreateImagePaths, errorHandler);



            //Insert included image data 1

            var sql = "INSERT INTO imagepaths(name, path) SELECT'park','/img/park.jpg' WHERE NOT EXISTS (SELECT * FROM imagepaths WHERE id = 1);";

            tx.executeSql(sql, options, successUpdateImagePaths, errorHandler);

            //Insert included image data 2

            var sql = "INSERT INTO imagepaths(name, path) SELECT'alleyway','/img/alleyway.jpg' WHERE NOT EXISTS (SELECT * FROM imagepaths WHERE id = 2);";

            tx.executeSql(sql, options, successUpdateImagePaths, errorHandler);

            //Insert included image data 3

            var sql = "INSERT INTO imagepaths(name, path) SELECT'studio','/img/studio.jpg' WHERE NOT EXISTS (SELECT * FROM imagepaths WHERE id = 3);";

            tx.executeSql(sql, options, successUpdateImagePaths, errorHandler);

            //Insert included image data 4 

            var sql = "INSERT INTO imagepaths(name, path) SELECT 'boiler','/img/boiler.jpg' WHERE NOT EXISTS (SELECT * FROM imagepaths WHERE id = 4);";

            tx.executeSql(sql, options, successUpdateImagePaths, errorHandler);


            //Create environments table

            console.info("Creating table: environments");
            var sql = "CREATE TABLE IF NOT EXISTS environments(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(30)," +
                "updated DATE," +
                "description TEXT," +
                "audiopathId INTEGER ," +
                "imagepathId INTEGER ," +
                "FOREIGN KEY(audiopathId) REFERENCES audiopaths(id)" +
                "FOREIGN KEY(imagepathId) REFERENCES imagepaths(id));";

            tx.executeSql(sql, options, successCreateEnvironments, errorHandler);

        }
        function successTransaction() {
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    //dropTables function
    //drops tables in db
    dropTables: function () {

        function txFunction(tx) {

            var options = [];
            var sql = "DROP TABLE IF EXISTS environments;";
            function successDrop() {
                console.info("Success: environments table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);

            var sql = " DROP TABLE IF EXISTS audiopaths;";
            function successDrop() {
                console.info("Success: audiopaths table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);

            var sql = " DROP TABLE IF EXISTS imagepaths;";
            function successDrop() {
                console.info("Success: imagepaths table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Drop tables transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }

};