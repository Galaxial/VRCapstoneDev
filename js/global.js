
function tableDropper(){
    clearDatabase();
}

function viewEnvironmentDetailsPageEventHandler(){
    
    showCurrentEnvironment();

}

function buttonNext_click(){
    addEnvironment();
    $(location).prop('href', '#homePage');
}


function enterVR_click(){
    initActiveAudio();
}

function displayPage_PageShow(){
    initActiveAudio();
}

function mainScreenTools_click(){
    getAudio();
    getImage();
    $(location).prop('href', '#displayPage');
    initActiveAudio();
}

function displayPage_PageHide(){
    disableActiveAudio();
}

function addEnvironment_PageShow(){
    
    $('#comboboxAudio').listview().listview('refresh');
    updateAudioDropdown();

    $('#comboboxImage').listview().listview('refresh');
    updateImagesDropdown();
}

function mainScreenEnvironments_click(){
    $(location).prop('href', '#environmentsListPage');
}

function mainScreenAbout_click(){
    $(location).prop('href', '#AboutPage');
}

function environmentsListEventHandler(){
    $('#environmentLinks').listview().listview('refresh');
    getEnvironments();
    $('#environmentLinks').listview().listview('refresh');
}


function init() {

    
    //Pageshow Event Handlers
    $("#displayPage").on("pageShow", displayPage_PageShow);
    $("#addEnvironmentPage").on("pageshow", addEnvironment_PageShow);
    $("#displayPage").on( "pagehide", displayPage_PageHide);
    $("#environmentDetailsPage").on("pageshow", viewEnvironmentDetailsPageEventHandler);
    $("#environmentsListPage").on("pageshow", environmentsListEventHandler);

    //Button Clickhandler Bindings
    $("#addEnvironmentNext").on("click", buttonNext_click);
    $("#viewVR").on("click", mainScreenTools_click);
    $("#enterVR").on("click", enterVR_click);
    $("#mainScreenEnvironments").on("click", mainScreenEnvironments_click);
    $("#mainScreenAbout").on("click", mainScreenAbout_click);
    $("#mainScreenTools").on("click", mainScreenTools_click);
    
    
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