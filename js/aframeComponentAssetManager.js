

AFRAME.registerComponent('sceneassethandler', {

  init: function () {
    var initiated;
    this.initiated = "scenassethandler component registered";
    console.log(initiated);

  },
  reloadEnvironmentImageEntity: function (image) {
    var skyBoxEntity = this.el.sceneEl.querySelector('#background');

    skyBoxEntity.setAttribute('src', '#' + image + 'BackgroundTexture');


  },

  reloadEnvironmentAudioEntity: function (audio) {


    var audioEngineEntity = this.el.sceneEl.querySelector('#soundengine');
    audioEngineEntity.setAttribute('src', '#' + audio + 'Ambience');


  },
  update: function () {
    this.initiated = "COMPONENT: update successful"
  }

});

function setEnvironmentImageParams(image) {
  var skyBoxComponent = document.querySelector('[sceneassethandler]').components.sceneassethandler;

  skyBoxComponent.reloadEnvironmentImageEntity(image);
  skyBoxComponent.update();

}

function setEnvironmentAudioParams(audio) {
  var audioComponent = document.querySelector('[sceneassethandler]').components.sceneassethandler;

  audioComponent.reloadEnvironmentAudioEntity(audio);
  audioComponent.update();
  
}

function initActiveAudio(){
  audio3dEntity = document.querySelector('[soundengine]');
  audio3dEntity.components.sound.playSound();
}

function disableActiveAudio() {
  var audio3dEntity = document.querySelector('[soundengine]');
  audio3dEntity.components.sound.stopSound();
}


