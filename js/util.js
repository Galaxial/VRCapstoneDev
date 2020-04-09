

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

function updateImagesDropdown() {
    
    var options = [];
    function callback(tx, results) {
        var options = [];
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];
            if (row['id'] == "4"){
                htmlCode += "<li><option value='" + row['id'] + 
            "'>" + row['name'] + "</option></li>";
            } else {

            htmlCode += "<li><option value='" + row['id'] + 
            "'>" + row['name'] + "</option></li>";
            }
        }
        var dropListType = $("#comboboxImage");
        dropListType = dropListType.html(htmlCode);
        dropListType.listview("refresh"); 
    }

    Imagepath.selectAll(options, callback);
}

function updateAudioDropdown() {
    
    var options = [];
    function callback(tx, results) {
        var options = [];
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];
            if (row['id'] == "4"){
                htmlCode += "<li><option value='" + row['id'] + 
            "'>" + row['name'] + "</option></li>";
            } else {

            htmlCode += "<li><option value='" + row['id'] + 
            "'>" + row['name'] + "</option></li>";
            }
        }
        var dropListType = $("#comboboxAudio");
        dropListType = dropListType.html(htmlCode);
        dropListType.listview("refresh"); 
    }

    Audiopath.selectAll(options, callback);
}





//Save new record (insert)
function addEnvironment() {
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var getDate = today;
    var name = $("#addEnvironmentName").val();
    if (name ==""){
        name = "My Environment";
    }
    var updated = getDate;
    var description = $("#addEnvironmentDescription").val();
    var imagepathId = $("#comboboxImage").val();
    var audiopathId = $("#comboboxAudio").val();
    
    options = [name, updated, description, imagepathId, audiopathId];
    
    function callback() {
        console.info("Success: creation records inserted successfully");
        
    }
    
    Environment.insert(options, callback);
        
}
//List all Environments
function getEnvironments() {
    
    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];
            htmlCode += "<li><a data-role='button' class='generatedM2' data-row-id='" + row['id'] + "' href='#'" +
                " data-row-imageid='" + row['imagepathId'] + "' data-row-audioid='" + row['audiopathId'] + "'>" +
                "<h2>" + row['name'] + "</h2>" +
                "<p>Description: " + row['description'] + "</p>" +
                "<p>Last Edited: " + row['updated'] + "</p></a></li>";
                
        }
        var ls = $("#environmentLinks");
        ls = ls.html(htmlCode);
        ls.listview("refresh"); 
        $("#environmentsListPage a.generatedM2").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            localStorage.setItem("audioid", $(this).attr("data-row-audioid"));
            localStorage.setItem("imageid", $(this).attr("data-row-imageid"));
            $(location).prop('href', '#environmentDetailsPage');
            
        }

    }

    Environment.selectAll(options, callback);
    
}
//Show current Environment
function showCurrentEnvironment() {

    var id = localStorage.getItem("id");
    var options = [id];
    
    
    function callback(tx, results) {
        var row = results.rows[0];
        var htmlCode ="";
        htmlCode += 
                "<h1>" + row['name'] + "</h1>" +
                "<p>Last Edited: " + row['updated'] + "</p><br/>" +
                "<h4>Description: </h4>" +
                "<p data-inset='true'>" + row['description'] + "</p>";
                
        var ls = $("#detailsDisp");
        ls = ls.html(htmlCode);
    }
    Environment.select(options, callback);
    
}

//Retrieve audio record from db
function getAudio() {
    var id = localStorage.getItem("audioid");
    var options = [id];
    var returnName;
    function callback(tx, results) {
        var row = results.rows[0];
        var retrievedNamne = row['name'];
        console.log("B: " + retrievedNamne);
        setEnvironmentAudioParams(retrievedNamne);

    }
    Audiopath.select(options, callback);
}

//Retrieve image record from db
function getImage() {
    var id = localStorage.getItem("imageid");
    var options = [id];
    var returnName;
    function callback(tx, results) {
        var row = results.rows[0];
        var retrievedNamne = row['name'];
        console.log("Retrieved: " + retrievedNamne);
        setEnvironmentImageParams(retrievedNamne);

    }
    Imagepath.select(options, callback);
}
