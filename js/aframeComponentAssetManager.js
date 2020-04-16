


//Register sceneassethandler component to scene data
//Called on pageload
AFRAME.registerComponent('sceneassethandler', {

  //init function
  //on creation, log successful component registration
  init: function () {
    var initiated;
    this.initiated = "scenassethandler component registered";
    console.log(initiated);

  },
  //reloadEnvironmentImageEntity function
  //modify skybox entity image source to passed argument
  reloadEnvironmentImageEntity: function (image) {
    var skyBoxEntity = this.el.sceneEl.querySelector('#background');
    skyBoxEntity.setAttribute('src', '#' + image + 'BackgroundTexture');

  },
  //reloadEnvironmentAudioEntity function
  //modify audio source entity audio source to passed argument
  reloadEnvironmentAudioEntity: function (audio) {
    var audioEngineEntity = this.el.sceneEl.querySelector('#soundengine');
    audioEngineEntity.setAttribute('src', '#' + audio + 'Ambience');

  },
  //update function
  //Event function included in AFRAME library for scene entities
  //Event triggers scene reload to ensure correct assets are loaded
  update: function () {
    this.initiated = "COMPONENT: update successful"
  }

});


//setEnvironmentImageParams function
//get current sceneassethandler entity and call it's image assignment function, passing recieved arguments
function setEnvironmentImageParams(image) {
  var skyBoxComponent = document.querySelector('[sceneassethandler]').components.sceneassethandler;
  skyBoxComponent.reloadEnvironmentImageEntity(image);
  skyBoxComponent.update();

}

//setEnvironmentAudioParams function
//get current sceneassethandler entity and call it's audio assignment function, passing recieved arguments
function setEnvironmentAudioParams(audio) {
  var audioComponent = document.querySelector('[sceneassethandler]').components.sceneassethandler;
  audioComponent.reloadEnvironmentAudioEntity(audio);
  audioComponent.update();
  
}

//initActiveAudio function
//get current audio emitting entity and trigger it's play event
//when 3d scene is loaded on init, an invisible entity is placed at user coordinates to generate audio
function initActiveAudio(){
  audio3dEntity = document.querySelector('[soundengine]');
  audio3dEntity.components.sound.playSound();
}

//disableActiveAudio function
//get current audio emitting entity and trigger it's stop sound event to stop audio
function disableActiveAudio() {
  var audio3dEntity = document.querySelector('[soundengine]');
  audio3dEntity.components.sound.stopSound();
}


