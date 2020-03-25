

function clearDatabase() {
    var result = confirm("Do you really want to clear the database?");
    if (result) {
        try {
            DB.nzdropTables();
            alert("Database cleared!");
            location.reload();
        } catch (e) {
            alert(e);
        }
    }
}


//Save new record (insert)
function nzAddCreation() {
    
    var options = [];
    
    var blue = 0;
    var yellow = 0;
    var red = 0;
    var black = 0;
    var grey = 0;
    var white = 0;

    options = [blue, yellow, red, black, grey, white];

    function callbackParts() {
        console.info("Success: parts list inserted successfully");
    }
    
    Parts.nzinsert(options, callbackParts);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var getDate = today;
    var name = $("#nzAddCreationName").val();
    if (name ==""){
        name = "My Creation";
    }
    var updated = getDate;
    var description = $("#nzAddCreationDescription").val();
    
    options = [name, updated, description];
    
    function callback() {
        console.info("Success: creation records inserted successfully");
        
    }
    
    Creation.nzinsert(options, callback);
        
}
//List all Creations
function nzGetCreations() {
    
    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];
            htmlCode += "<li><a data-role='button' class='whynot' data-row-id='" + row['id'] + "' href='#'>" +
                "<h2>" + row['name'] + "</h2>" +
                "<p>Description: " + row['description'] + "</p>" +
                "<p>Last Edited: " + row['updated'] + "</p></a></li>";
                
        }
        var ls = $("#nzCreationLinks");
        ls = ls.html(htmlCode);
        ls.listview("refresh"); 
        $("#nzCreationList a.whynot").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#nzViewCreation');
            
        }

    }

    Creation.nzselectAll(options, callback);
    
}
//Show current Creation
function nzShowCurrentCreation() {

    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];
        var htmlCode ="";
        htmlCode += 
                "<h1>" + row['name'] + "</h1>" +
                "<p>Last Edited: " + row['updated'] + "</p>" +
                "<h4>Description: </h4>" +
                "<p data-inset='true'>" + row['description'] + "</p>";
                
        var ls = $("#nzDisp");
        ls = ls.html(htmlCode);
    }
    Creation.nzselect(options, callback);
    
}

function nzShowCurrentCreationMiniList() {
    var id = localStorage.getItem("id");
    var options = [id];
    function callback(tx, results) {
        var row = results.rows[0];
        var htmlCode ="";               
        htmlCode += "<li><p> Brick, 2x4 [Blue x" + row['blue'] + "]</p></li>" + 
                    "<li><p> Brick, 2x4 [Yellow x" + row['yellow'] + "]</p></li>" + 
                    "<li><p> Brick, 2x4 [Red x" + String(row['red']) + "]</p></li>" + 
                    "<li><p> Brick, 2x2 [Black x" + row['black'] + "]</p></li>" + 
                    "<li><p> Brick, 2x2 [Grey x" + row['grey'] + "]</p></li>" + 
                    "<li><p> Brick, 2x2 [White x" + row['white'] + "]</p></li>";    
        var ls = $("#nzBrickListMini");
        ls = ls.html(htmlCode);
        ls.listview("refresh"); 

    }

    Parts.nzselect(options, callback);
    
}

function nzUpdateParts(){

    var id = localStorage.getItem("id");
    var cd = new Date();
    var dd = String(cd.getDate()).padStart(2, '0');
    var mm = String(cd.getMonth() + 1).padStart(2, '0');
    var yyyy = cd.getFullYear();

    cd = mm + '/' + dd + '/' + yyyy;
    var getDate = cd;
    dateOptions = [getDate, id];

    var blue = Number($("#quantityCount_blue").html());
    var yellow = Number($("#quantityCount_yellow").html());
    var red = Number($("#quantityCount_red").html());
    var black = Number($("#quantityCount_black").html());
    var grey = Number($("#quantityCount_grey").html());
    var white = Number($("#quantityCount_white").html());

    options = [blue, yellow, red, black, grey, white, id];
            
     
    function callbackDate() {
        console.info("date updated");
    }

    function callback() {
        $(location).prop('href', '#nzViewCreation');
    }
    Creation.nzupdate_date(dateOptions, callbackDate)
    Parts.nzupdate(options, callback);
    
}



function nzdeleteCreation(){
    var id = localStorage.getItem("id");
    var options = [id];

    function callbackParts() {
        console.info("Success: Parts Record deleted successfully");
    }

    function callback() {
        alert("Success: Record deleted successfully");
        $(location).prop('href', '#nzCreationList');
    }

    Parts.nzdelete(options, callbackParts);
    Creation.nzdelete(options, callback);
}


function brickList_loadQuantityFromId(){

    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];
        
        $("#quantityCount_blue").html(row['blue']);
        $("#quantityCount_yellow").html(row['yellow']);
        $("#quantityCount_red").html(row['red']);
        $("#quantityCount_black").html(row['black']);
        $("#quantityCount_grey").html(row['grey']);
        $("#quantityCount_white").html(row['white']);

        console.info("parts loaded");

    }

    Parts.nzselect(options, callback);
    
    
}

function nzGetNewestInsert() {
    
    var options = [];
    function callback(tx, results) {
        var row = results.rows[0];
        var newId = row['id'];
        localStorage.setItem("id", newId);
        console.info("the thing success is yeah");

    }

    Parts.nzselectnewest(options, callback);
    
}