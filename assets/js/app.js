
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 945, window.innerWidth / window.innerHeight, 0.1, 1000 );

var listener = new THREE.AudioListener();

var sound = new THREE.Audio(listener);

let stars, starGeo ;
let cloudParticles = [], flash, rain, rainGeo, rainCount = 15000;

//textures
var textureSky = new THREE.TextureLoader().load('assets/textures/sky.jpg')
var textureLightning = new THREE.TextureLoader().load('assets/textures/lightning.jpg')

//plane
var geometry = new THREE.PlaneGeometry( 500, 500, 500 );
var material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.castShadow = true;
plane.receiveShadow = true;
 
scene.add( plane );

//lighting
const color = 0xFFFFFF;
var Light = new THREE.SpotLight( 0xFFFFFF, 5, 500 );
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5, 500 );
Light.needsUpdate = true;
Light.castShadow = true;


scene.add(Light,Light.target,ambientLight);


var audioLoader = new THREE.AudioLoader();

audioLoader.load('assets/music.mp3', function (buffer) {

  sound.setBuffer(buffer);

  sound.setLoop(true);

  sound.setVolume(0.5);

});

function play() {



  sound.play();



  playing = true;



}

//

//Shapes

//rain


//model load
var loader = new THREE.GLTFLoader();
loader.load( 'assets/models/scene.gltf', function ( gltf ) {
  //manipulate models here
   model = gltf.scene;

   model.rotation.x = 3;
   model.castShadow = true;

  scene.add(model);
  
}, undefined, function ( error ) {
	console.error( error );
} );

loader.load( 'assets/models/zepellin/scene.gltf', function ( gltf ) {
  //manipulate models here
   zepellin = gltf.scene;

   zepellin.rotation.x = 3;
   zepellin.castShadow = true;
   zepellin.position.y = -170;
   zepellin.position.z = 70;

  scene.add(zepellin);
  
}, undefined, function ( error ) {
	console.error( error );
} );

loader.load( 'assets/models/ufo/scene.gltf', function ( gltf ) {
  //manipulate models here
   ufo = gltf.scene;

   ufo.rotation.x = 2.5;
   ufo.castShadow = true;
   ufo.position.y = -170;

  

  scene.add(ufo);
  
}, undefined, function ( error ) {
	console.error( error );
} );

//

let loader2 = new THREE.TextureLoader();
loader2.load("assets/textures/smoke.png", function(texture){

  cloudGeo = new THREE.PlaneBufferGeometry(500,500);
  cloudMaterial = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true
  });

  for(let p=0; p<25; p++) {
    let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
    cloud.position.set(
      Math.random()*300 -150,
      50,
      Math.random()*300 - 150
    );
    cloud.rotation.x = 300;
    cloud.rotation.y = -0.12;
    cloud.position.z = -250;

      cloud.position.y = -250;
    cloud.rotation.z = Math.random()*360;
    cloud.material.opacity = 0.6;
    cloudParticles.push(cloud);
    scene.add(cloud);

  }
});


//

//Backgrounds
scene.background = (textureSky);

// cam position
camera.position.z = 10;
camera.position.x = 5;
camera.position.y = -5;

//essential shits
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
controls = new THREE.OrbitControls( camera,renderer.domElement);

//



//
camera.position.y = -150;




let interval =0;
let interval2 = 0;
let interval3 = 0;
function animate() {

   requestAnimationFrame( animate );

//
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        ufo.position.y += 0.09;
    } else if (keyCode == 83) {
      ufo.position.y -= 0.09;
    } else if (keyCode == 65) {
      ufo.position.x -= 0.09;
    } else if (keyCode == 68) {
      ufo.position.x += 0.09;
    } else if (keyCode == 32) {
      ufo.position.set(0, 0, 0);
    } else if (keyCode == 69) {
      ufo.position.z -= 0.09;
    }else if (keyCode == 81) {
      ufo.position.z += 0.09;
    }
    
};

cloudParticles.forEach(p => {
  p.rotation.z -=0.002;
});


plane.rotation.x = -90;
plane.position.y = -70;
Light.position.y = -350;
Light.position.z = 250;


model.scale.set(-1,1,-1);

ufo.scale.set(5,5,5);
//

//
if (interval2 < 150){
  ufo.position.x += 1;
}else{
  ufo.position.x -= 1;
}

//
if (interval2 < 27){
  ufo.position.y -= 10;
}else{
  ufo.position.y += 1;
}
//

//
interval2 += 1;
interval += 1;
interval3 +=1;

if(interval2 == 300){
  interval2 = 0;
}
if(interval == 50){
  interval = 0;
}
if(interval3 == 2000){
  interval3 = 0;
}
//


if (interval3 < 1000){
  zepellin.position.x -= 0.1;
}else{
  zepellin.position.x += 0.1;
}


   renderer.render( scene, camera );

}



animate();

