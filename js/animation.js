// import './style.css'

// import * as THREE from 'three';
// import * as BAS from 'three-bas';



function threeAnimate(pos1, pos2, pos3, pos4){

  let animation;
  let animationImages = [];
  let animationImagesData = [];
  
  
  let containerImages = document.querySelectorAll("#three-container > img");
  console.log(containerImages);
  for(let i = 0; i < containerImages.length; i++){
    animationImages[i] = containerImages[i];
  
    if(animationImages.length == containerImages.length){
      init();
    }
  }
  
  
  function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 5000 );
    camera.position.set(0, 0, 680);
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize( window.innerWidth, window.innerHeight );
  
    const container = document.getElementById("three-container");
    container.appendChild( renderer.domElement );
  
    const light = new THREE.AmbientLight('rgb(255,255,255)');
    scene.add( light );
  
    animation = new Animation();
    scene.add(animation.mesh);
  
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
  
    window.addEventListener("mousemove", (event) => {
      mouse.x = ( event.clientX - (windowHalf.x) );
      mouse.y = ( event.clientY - (windowHalf.y) );
    });
  
  
    window.addEventListener( 'resize', onWindowResize, false );
        
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
  
    let wiggleAnimation = 0;
    function animate() {
      wiggleAnimation++;
      let wiggle = Math.sin(wiggleAnimation/200);
      wiggle = map_range(wiggle, -1, 1, -0.15, 0.15);
      animation.mesh.rotation.y = wiggle;
  
      target.x = ( 1 - mouse.x ) * 0.0004;
      target.y = ( 1 - mouse.y ) * 0.0004;
      
      animation.mesh.rotation.x += 0.005 * ( target.y - animation.mesh.rotation.x );
      animation.mesh.rotation.y += 0.005 * ( target.y - animation.mesh.rotation.y );
  
      requestAnimationFrame(animate);
      renderer.render( scene, camera );
    };
    animate();
  
  
  
    // animate on scroll
    window.addEventListener("scroll", (event) => {
      morphShapes(window.scrollY);
      // console.log(window.scrollY);
    });
  
    morphShapes(window.pageYOffset);
  
    function morphShapes(scroll){
      if(scroll > pos1 && scroll < pos2){
        animation.mesh.material.uniforms['curTime'].value = 0.0;
        let ani = map_range(scroll, pos1, pos2, 0, 1);
        if(ani > 0 && ani < 1){
          animation.mesh.material.uniforms['uTime'].value = ani;
        }
      } else if(scroll > pos2 && scroll < pos3){
        animation.mesh.material.uniforms['curTime'].value = 1.0;
        let ani = map_range(scroll, pos2, pos3, 1, 0);
        if(ani > 0 && ani < 1){
          animation.mesh.material.uniforms['uTime'].value = ani;
        }
      } else if(scroll > pos3 && scroll < pos4){
        animation.mesh.material.uniforms['curTime'].value = 2.0;
        let ani = map_range(scroll, pos3, pos4, 0, 1);
        if(ani > 0 && ani < 1){
          animation.mesh.material.uniforms['uTime'].value = ani;
        }
      }
    }
  }
  
  
  function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }
  
  
  function Animation() {
  
    let prefabGeometry = new THREE.TetrahedronGeometry(1);
    let prefabCount = 200000;
    let geometry = new BAS.PrefabBufferGeometry(prefabGeometry, prefabCount);
    let s, j, offset;
  
    let aDelayDuration = geometry.createAttribute('aDelayDuration', 2);
    let duration = 1.0;
    let maxPrefabDelay = 0.3;
    this.totalDuration = duration + maxPrefabDelay;
  
    for (s = 0, offset = 0; s < prefabCount; s++) {
      let delay = Math.random() * maxPrefabDelay;
      for (j = 0; j < prefabGeometry.attributes.position.count; j++) {
        aDelayDuration.array[offset] = delay;
        aDelayDuration.array[offset + 1] = duration;
  
        offset += 2;
      }
    }
  
  
    let animationPositions = [];
    let animationPositionsAttribute = [];
  
    for(let i = 0; i < animationImages.length; i++){
      animationPositions[i] = new THREE.Vector3();
      animationPositionsAttribute[i] = geometry.createAttribute('position' + i.toString(), 3)
    }
  
    let prefabData = [];
   
  
    // get data from images
    for(let i = 0; i < animationImages.length; i++){
  
      animationImages[i].style.display = "none";
  
      let width = animationImages[i].width;
      let height = animationImages[i].height;
    
      let canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
      canvas.style.opacity = 0;
    
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d', {willReadFrequently: true});
      ctx.drawImage(animationImages[i], 1, 1, width, height);
  
      let data = ctx.getImageData(1, 1, width, height);
      animationImagesData[i] = { d: data, w: width, h: height };
      console.log(animationImagesData);
    }
  
  
  
    for(let s = 0; s < prefabCount; s++){
      for(let n = 0; n < animationImages.length; n++){
  
        let x;
        let y;
        let i;
        let brightness = 60;
    
        while(brightness > 50){
          x = Math.floor(Math.random() * animationImagesData[n].w);
          y = Math.floor(Math.random() * animationImagesData[n].h);
          i = (y * animationImagesData[n].w + x) * 4;
          brightness = (((animationImagesData[n].d.data[i] / 255) + (animationImagesData[n].d.data[i + 1] / 255) + (animationImagesData[n].d.data[i + 2] / 255)) / 3) * 100;
        }
    
        animationPositions[n].x = x - animationImagesData[n].w / 2 + Math.floor(Math.random() * 20);
        animationPositions[n].y = -(y - animationImagesData[n].h / 2) + Math.floor(Math.random() * 20);
        animationPositions[n].z = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
  
      }
  
  
      // set prefabs
      for(let n = 0; n < animationImages.length; n++){
        geometry.setPrefabData(animationPositionsAttribute[n], s, animationPositions[n].toArray(prefabData));
      }
  
    }
  
  
  
    // shaders
    let material = new BAS.PhongAnimationMaterial({
      vertexColors: true,
      flatShading: true,
  
      uniforms: {
        uTime: {value: 0},
        curTime: {value: 0}
      },
  
      vertexFunctions: [
        BAS.ShaderChunk['ease_cubic_in_out'],
        BAS.ShaderChunk['ease_quad_out']
      ],
  
      vertexParameters: [
        'uniform float uTime;',
        'uniform float curTime;',
        'attribute vec2 aDelayDuration;',
  
        'attribute vec3 position0;',
        'attribute vec3 position1;',
        'attribute vec3 position2;',
        'attribute vec3 position3;',
      ],
  
      vertexInit: [
        'float tProgress = clamp(uTime - aDelayDuration.x, 0.0, aDelayDuration.y) / aDelayDuration.y;',
        'tProgress = easeCubicInOut(tProgress);'
      ],
      vertexNormal: [
      ],
      vertexPosition: [
        'if(curTime == 0.0){',
        'transformed += position0 * (1.0 - tProgress) + position1 * tProgress;',
        '}',
        'else if(curTime == 1.0 ){',
        'transformed += position2 * (1.0 - tProgress) + position1 * tProgress;',
        '}',
        'else if(curTime == 2.0){',
        'transformed += position2 * (1.0 - tProgress) + position3 * tProgress;',
        '}',
  
      ],
      vertexColor: [
        'vColor = vec3(0.756,0.693,0.501);',
      ],
  
    });
  
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.frustumCulled = false;
  
  }
  
  
}
divElement = document.querySelector(".place-animation-in-here");
elemHeight = divElement.offsetHeight;

let pos1 = elemHeight;
let pos2 = elemHeight * 2 * 0.8;
let pos3 = elemHeight * 3 * 0.8;
let pos4 = elemHeight * 4 * 0.8;

threeAnimate(pos1, pos2 ,pos3 ,pos4);

//get div position and height ? 
