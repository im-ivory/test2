import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 50;
// camera.position.set(0,5,15); 
// camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.gammaFactor = 2.2;
//renderer.gammaOutput = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement)

const gltfLoader = new GLTFLoader();
let root = null;
const url = 'data/london_bridge_nancy_steps/scene.gltf';
gltfLoader.load(
    url,
    (gltf) => {
        root = gltf.scene;
        root.rotation.y = Math.PI/2;
        root.position.x = -15;
        scene.add(root);
    }
)

const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.castShadow = true; 
scene.add(light); //scene 객체의 한 요소로 추가


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
function lerp(x, y, a) {
    return (1 - a) * x + a * y
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}


// const animationScripts: { start: number; end: number; func: () => void }[] = []
const animationScripts = [];


// //add an animation that moves the cube through first 40 percent of scroll
animationScripts.push({
    start: 0,
    end: 10,
    func: () => {
        // camera.lookAt(scene.position);
        // camera.position.set(0,20,10);
        // camera.position.x = lerp(0, 20, scalePercent(0, 60))
         camera.position.z = lerp(50, 30, scalePercent(0, 10))
         camera.position.y = lerp(0, -5, scalePercent(0, 10))
        // root.position.z = lerp(4, 10, scalePercent(0, 40))
        // root.rotation.y = lerp(0, Math.PI, scalePercent(0, 40))
        //console.log(cube.position.z)
    },
})

//add an animation that rotates the cube between 40-60 percent of scroll
animationScripts.push({
    start: 10,
    end: 20,
    func: () => {
        // camera.lookAt(scene.position)
        // camera.position.set(0,10,15);
        // camera.position.z = lerp(30, 10, scalePercent(40, 60))
        // camera.position.y = lerp(5, 2, scalePercent(40, 60))
        camera.rotation.y = lerp(0, -Math.PI*0.3, scalePercent(10, 20))
        camera.position.x = lerp(0, -3, scalePercent(10, 20))
        camera.position.z = lerp(30, 15, scalePercent(10, 20))
        camera.position.y = lerp(-5, -3, scalePercent(10, 20))
        //console.log(cube.rotation.z)
    },
})

//add an animation that moves the camera between 60-80 percent of scroll
animationScripts.push({
    start: 20,
    end: 25,
    func: () => {
        camera.rotation.y = lerp(-Math.PI*0.3, 0, scalePercent(20, 25))
        camera.position.x = lerp(-3, 2, scalePercent(20, 25))
        camera.position.z = lerp(15, 13, scalePercent(20, 25))
        camera.position.y = lerp(-3, -5, scalePercent(20, 25))
        // camera.lookAt(scene.position)
        //console.log(camera.position.x + " " + camera.position.y)
    },
})

//add an animation that auto rotates the cube from 80 percent of scroll
animationScripts.push({
    start: 25,
    end: 35,
    func: () => {
        camera.position.z = lerp(13,-8, scalePercent(25, 35))
        camera.position.y = lerp(-5, 5, scalePercent(25, 35))
    },
})

animationScripts.push({
    start: 35,
    end: 40,
    func: () => {
        camera.rotation.y = lerp(0, -Math.PI*0.5, scalePercent(35, 40))
        // camera.position.z = lerp(13,-9, scalePercent(25, 35))
        // camera.position.y = lerp(-5, 5, scalePercent(25, 35))
        // camera.position.x = lerp(2, -5, scalePercent(35, 45))
        camera.position.z = lerp(-8,-12, scalePercent(35, 40))
        camera.position.y = lerp(5, 7, scalePercent(35, 40))
    },
})

animationScripts.push({
    start: 40,
    end: 50,
    func: () => {
        // camera.lookAt(scene.position);
        // camera.rotation.z = lerp(0 , Math.PI/2, scalePercent(40, 50))
        camera.rotation.y = lerp(-Math.PI*0.5,-Math.PI, scalePercent(40, 50))
         camera.position.x = lerp(2, 8, scalePercent(40, 50))
        // camera.position.z = lerp(-8,-12, scalePercent(40, 50))
        camera.position.y = lerp(7, 10, scalePercent(40, 50))
    },
})


animationScripts.push({
    start: 50,
    end: 55,
    func: () => {
        camera.position.z = lerp(-12, -5, scalePercent(50, 55))
       // camera.position.y = lerp(10, 10, scalePercent(40, 50))
    },
})
animationScripts.push({
    start: 55,
    end: 60,
    func: () => {
        camera.position.z = lerp(-5, 0, scalePercent(55, 60))
        camera.rotation.y = lerp(-Math.PI, -Math.PI*1.5, scalePercent(55, 60))
        camera.position.x = lerp(8, 5, scalePercent(55, 60))
       // camera.position.y = lerp(10, 10, scalePercent(40, 50))
    },
})
animationScripts.push({
    start: 60,
    end: 70,
    func: () => {
        camera.position.x = lerp(5, 0, scalePercent(60, 70))
        camera.position.y = lerp(10, 12, scalePercent(60, 70))
        // camera.position.z = lerp(0, -5, scalePercent(65, 75))
    },
})
function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func()
        }
    })
}

let scrollPercent = 0

document.body.onscroll = () => {
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    // ;(document.getElementById('scrollProgress') as HTMLDivElement).innerText =
    //     'Scroll Progress : ' + scrollPercent.toFixed(2)
}

// const stats = Stats()
// document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    playScrollAnimations()

    render()

    // stats.update()
}

function render() {
    renderer.render(scene, camera)
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()