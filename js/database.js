

var db;

function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}


var DB = {
    createDatabase: function(){

        var shortName= "EnvironmentDB";
        var version = "0.1";
        var displayName = "VR Stored Environments DB";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Environments Database...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database EnvironmentDB created successfully.");
        }
    },
    createTables: function(){

        function txFunction(tx) {

            var options = [];

            //Table Creation Success Feedback Functions

            function successCreateEnvironments(){
                console.info("Success: Create table: environments successful.");
            }

            function successCreateDescriptions(){
                console.info("Success: Create table: descriptions successful.");
            }

            function successCreateAudioPaths(){
                console.info("Success: Create table: audiopaths successful.");
            }

            function successCreateImagePaths(){
                console.info("Success: Create table: imagepaths successful.");
            }

            //Create descriptions table

            console.info("Creating table: descriptions");

            var sql = "CREATE TABLE IF NOT EXISTS descriptions(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "description TEXT);";
                
            tx.executeSql(sql, options, successCreateDescriptions, errorHandler);

            //Create audiopaths table

            console.info("Creating table: audiopaths");

            var sql = "CREATE TABLE IF NOT EXISTS audiopaths(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "path TEXT);";
                
            tx.executeSql(sql, options, successCreateAudioPaths, errorHandler);


            //Create imagepaths table

            console.info("Creating table: imagepaths");
            
            var sql = "CREATE TABLE IF NOT EXISTS imagepaths(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "path TEXT);";
                
            tx.executeSql(sql, options, successCreateImagePaths, errorHandler);
            


            console.info("Creating table: environments");

            //Create creation table
            var sql = "CREATE TABLE IF NOT EXISTS environments(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(30)," +
                "updated DATE," +
                "descriptionId INTEGER NOT NULL," +
                "audiopathId INTEGER ," +
                "imagepathId INTEGER ," +
                "FOREIGN KEY(descriptionId) REFERENCES descriptions(id)" +
                "FOREIGN KEY(audiopathId) REFERENCES audiopaths(id)" +
                "FOREIGN KEY(imagepathId) REFERENCES imagepaths(id));";
            
            tx.executeSql(sql, options, successCreateEnvironments, errorHandler);
            
        }
        function successTransaction(){
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction );
    },


    dropTables: function(){
        
        function txFunction(tx){
            
            var options = [];
            var sql = "DROP TABLE IF EXISTS environments;";
            function successDrop() {
                console.info("Success: environments table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler );

            var sql = " DROP TABLE IF EXISTS descriptions;";
            function successDrop() {
                console.info("Success: descriptions table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler );

            var sql = " DROP TABLE IF EXISTS audiopaths;";
            function successDrop() {
                console.info("Success: audiopaths table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler );

            var sql = " DROP TABLE IF EXISTS imagepaths;";
            function successDrop() {
                console.info("Success: imagepaths table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler );
        }
        function successTransaction(){
            console.info("Success: Drop tables transaction successful");
        }
        
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};