let scene, camera, brush, renderer;
var b = 0;

        function init(){
            scene = new THREE.Scene();
            // scene.background = new THREE.Color(0xFFccFF);
            scene.background = null;

            camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 1, 5000);
            camera.position.set(-2.22, 2.1, -12);
            camera.rotateY(3.24);

            var light = new THREE.PointLight( 0xFFFFFF, 0.5, 0 );
            light.position.set( 4, 30, -20 );
            scene.add( light );

            var light2 = new THREE.AmbientLight( 0xFFFFFF, 010, 0 );
            light2.position.set( 30, 10, 30 );
            scene.add( light2 );

            renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
            renderer.setClearColor( 0x000000, 0 ); // the default
            document.body.appendChild(renderer.domElement);
            window.addEventListener("resize", ()=>{
            renderer.setSize(window.innerWidth, window.innerHeight);

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        })
            renderer.setSize(window.innerWidth, window.innerHeight)
            // renderer.setClearColor("#C9F6FF");

            var render = function(){
            requestAnimationFrame(render);
             b = b+0.1;
            renderer.render(scene, camera);
        }
        render();

const ithaca_shotgun = 'window.glb'
const loader = new THREE.GLTFLoader();

loader.load( ithaca_shotgun, function ( gltf ) {

    win = gltf.scene
	scene.add(win);
    win.position.y = 0.3;
    win.position.x = -1.3;
    win.rotation.y = 0.1;
    win.rotation.x = 0;



}, undefined, function ( error ) {

	console.error( error );

} );

const squeege = 'squeegee.glb'
loader.load( squeege, function ( gltf ) {

    brush = gltf.scene
	scene.add(brush);
    brush.position.y = 2;
    brush.position.x = .4;
    brush.rotation.y = 0.1;
    brush.rotation.x = 0;

    const tl = gsap.timeline({delay: 0.5, repeat: -1, yoyo: true, onRepeat: () => {tl.invalidate()}});

        tl.to(brush.position, {y: -4 , duration: 1, ease: "none"})
        tl.to(brush.position, {y: 2 , duration: 1, ease: "none"})
        tl.to(brush.position, {x: -1.3 , duration: 0.25, ease: "none"})

        tl.to(brush.position, {y: -4 , duration: 1, ease: "none"})
        tl.to(brush.position, {y: 2 , duration: 1, ease: "none"})
        tl.to(brush.position, {x: -2.8 , duration: 0.25, ease: "none"})

        tl.to(brush.position, {y: -4 , duration: 1, ease: "none"})
        tl.to(brush.position, {y: 2 , duration: 1, ease: "none"})
        tl.to(brush.position, {x: -3.8 , duration: 0.25, ease: "none"})



        // tl.to(brush.position, {y: -4 , duration: 1, ease: "none"})

        // tl.to(brush.position, {y: 2 , duration: 1, ease: "none"})
        // tl.to(brush.position, {x: -4 , duration: 0.25, ease: "none"})


    // gsap.from(brush.position, 3, {y: -1, ease: Linear.easeNone, repeat:-2});
   

}, undefined, function ( error ) {

	console.error( error );

} );



function updateM(){

}
console.log(gsap)

render();
        }
init()

