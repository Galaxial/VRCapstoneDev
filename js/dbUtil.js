/* dbUtil.js
*   Database Table CRUD and specialized CRUD functions
* 
* @Author Noah Zenker, 2020
*  
*/

//Environment db class
//Assign crud functions to environment
var Environment = {
    //Insert

    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO environments(name, updated, description, audiopathId, imagepathId) " +
            "VALUES(?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    //Select 
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM environments WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    //SelectAll
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM environments;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    

    //Update Date (exclusive)
    update_date: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE environments SET updated=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM environments WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

    

    
};

//Imagepath db class
//Assign crud functions to Imagepath
var Imagepath = {
    
    //SelectAll
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM imagepaths;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM imagepaths WHERE id =?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
        
    }
    
};

//Audiopath db class
//Assign crud functions to audiopath
var Audiopath = {
    
    //SelectAll
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM audiopaths;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM audiopaths WHERE id =?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
        
    }
    
};



