
function tableDropper(){
    clearDatabase();
}

function init() {

    

    //$("#plusButton_blue").on("click", quantityPlus_blue);
    
}

function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}

$(document).ready(function(){
    
    init();
    initDB();

});