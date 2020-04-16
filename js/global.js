

//Table Dropper 
//Drops tables in database
function tableDropper() {
    clearDatabase();
}

//PageShow event handler for environment details page
//populate page with stored data for chosen environment
function viewEnvironmentDetailsPage_PageShow() {

    showCurrentEnvironment();

}

//Next button click handler
//add new environment entry to database
//return to environments list page
function buttonNext_click() {
    addEnvironment();
    $(location).prop('href', '#homePage');
    setTimeout(function(){
        window.location.reload();
      });
    return false; //onclick response for page reload
}

//Enter VR button click handler
//Play ambient audio on enter
//VR launch handled through AFRAME attribution
//Chrome webplayer requires user interaction to begin audio, this allows for audio use through both preview and native VR mode without interruption
function enterVR_click() {
    initActiveAudio();
}

//PageShow event handler for displayPage 
//Play ambient audio from scene when page is loaded 
function displayPage_PageShow() {
    initActiveAudio();
}

//View in VR button click handler
//Get selected audio and images to load to scene
//forward to displayPage with selected parameters
//begin audio playback in preview scene render
//refresh page to reload scene
function viewVR_click() {
    getAudio();
    getImage();
    initActiveAudio();
    $(location).prop('href', '#displayPage');
    
    initActiveAudio();
}

//PageHide event handler for VR display page
//disable audio on leaving page
function displayPage_PageHide() {
    disableActiveAudio();
}


//PageShow event handler for add environment form page
//clear inputs
//populate dropdown lists in form from db tables
function addEnvironment_PageShow() {

    document.getElementById("addEnvironmentName").value = "";
    document.getElementById("addEnvironmentDescription").value = "";

    //populate audio dropdown from db
    $('#comboboxAudio').listview().listview('refresh');
    updateAudioDropdown();

    //populate image dropdown from db
    $('#comboboxImage').listview().listview('refresh');
    updateImagesDropdown();
}

//Environments button click handler
//Forward to environments list page
function mainScreenEnvironments_click() {
    $(location).prop('href', '#environmentsListPage');
}

//About button click handler
//Forward to about page
function mainScreenAbout_click() {
    $(location).prop('href', '#AboutPage');
}


//PageShow event handler for environments list page
//Populate list from stored environment entries in db 
function environmentsListPage_PageShow() {
    $('#environmentLinks').listview().listview('refresh');
    getEnvironments();
    $('#environmentLinks').listview().listview('refresh');
}

//Init
//Bind Event handlers to events
function init() {

    //Pageshow Event Handlers
    $("#displayPage").on("pageShow", displayPage_PageShow);
    $("#addEnvironmentPage").on("pageshow", addEnvironment_PageShow);
    $("#environmentDetailsPage").on("pageshow", viewEnvironmentDetailsPage_PageShow);
    $("#environmentsListPage").on("pageshow", environmentsListPage_PageShow);

    //PageHide Event Handlers
    $("#displayPage").on("pagehide", displayPage_PageHide);

    //Button Clickhandler Bindings
    $("#addEnvironmentNext").on("click", buttonNext_click);
    $("#viewVR").on("click", viewVR_click);
    $("#enterVR").on("click", enterVR_click);
    $("#mainScreenEnvironments").on("click", mainScreenEnvironments_click);
    $("#mainScreenAbout").on("click", mainScreenAbout_click);

}


//InitDB
//Create database, tables, and populate them with needed data
function initDB() {
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.createTables();
        }
        else {
            console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}


//Entry point for application
//Build db and bind eventhandlers
$(document).ready(function () {

    init();
    initDB();

});