


//Creation CRUD

var Creation = {
    //Insert
    nzinsert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO creation(name, updated, description, partsId) " +
            "VALUES(?,?,?, (SELECT id FROM parts order by id DESC LIMIT 1));";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    //Select 
    nzselect: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM creation WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    //SelectAll
    nzselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM creation;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    
    //Update
    nzupdate: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE creation SET name=?, updated=?, description=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    //Update Date (exclusive)
    nzupdate_date: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE creation SET updated=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    nzdelete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM creation WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

    

    
};

//Type CRUD

var Parts = {
    
    //Update
    nzupdate: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE parts SET blue=?, yellow=?, red=?, black=?, grey=?, white=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    //SelectAll
    nzselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM parts;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    //Insert
    nzinsert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO parts(blue, yellow, red, black, grey, white) " +
            "VALUES(?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    //Select 
    nzselect: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM parts WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    //Select Newest 
    nzselectnewest: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT id FROM parts order by id DESC LIMIT 1;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select Newest transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    //Delete
    nzdelete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM parts WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
    
    
};


