import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
// import Stats from '../examples/jsm/libs/stats.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene()

// const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
// scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0,5,15); 
camera.lookAt(scene.position);
const mainContainer = document.querySelector(".main-container");
const renderer = new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth, window.innerHeight)
mainContainer.appendChild(renderer.domElement)
window.renderer = renderer;

const gltfLoader = new GLTFLoader();
let root = null;
const url = 'data/historical_marble_fountain/scene.gltf';
gltfLoader.load(
    url,
    (gltf) => {
        root = gltf.scene;
        root.position.set(0,-13,4);
        scene.add(root);
    }
)


// const geometry = new THREE.SphereGeometry()
// const material = new THREE.MeshPhongMaterial({
//     color: 0x00ff00
// })

const color = 0xffffff;
const intensity = 1; //세기
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1,2,4);
scene.add(light); //scene 객체의 한 요소로 추가

// const gltfLoader = new GLTFLoader();
// const url = 'data/adamHead/scene.gltf';
// gltfLoader.load(
//     url,
//     (gltf) => {
//         const root = gltf.scene;
//         root.position.set(0,0.5,-10)
//         scene.add(root);
//     }
// )

// const cube = new THREE.Mesh(geometry, material)
// cube.position.set(0, 0.5, -10)
// scene.add(cube)

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


//add an animation that flashes the cube through 100 percent of scroll
// animationScripts.push({
//     start: 0,
//     end: 101,
//     func: () => {
//         let g = material.color.g
//         g -= 0.05
//         if (g <= 0) {
//             g = 1.0
//         }
//         material.color.g = g
//     },
// })

// //add an animation that moves the cube through first 40 percent of scroll
animationScripts.push({
    start: 0,
    end: 40,
    func: () => {
        camera.lookAt(scene.position);
        // camera.position.set(0,20,10);
        // camera.position.x = lerp(0, 20, scalePercent(0, 60))
        //  camera.position.z = lerp(15, -10, scalePercent(0, 60))
        //  camera.position.y = lerp(5, 7, scalePercent(0, 60))
        // root.position.z = lerp(4, 10, scalePercent(0, 40))
        if(root){
            root.rotation.y = lerp(0, Math.PI, scalePercent(0, 40))
        }
        //console.log(cube.position.z)
    },
})

//add an animation that rotates the cube between 40-60 percent of scroll
animationScripts.push({
    start: 40,
    end: 60,
    func: () => {
        camera.lookAt(scene.position)
        // camera.position.set(0,10,15);
        camera.position.z = lerp(15, 10, scalePercent(40, 60))
        camera.position.y = lerp(5, 2, scalePercent(40, 60))
        //console.log(cube.rotation.z)
    },
})

//add an animation that moves the camera between 60-80 percent of scroll
animationScripts.push({
    start: 60,
    end: 80,
    func: () => {
        camera.position.y = lerp(2, 10, scalePercent(60, 80))
        camera.lookAt(scene.position)
        //console.log(camera.position.x + " " + camera.position.y)
    },
})

//add an animation that auto rotates the cube from 80 percent of scroll
animationScripts.push({
    start: 80,
    end: 101,
    func: () => {
        //auto rotate
        camera.position.z = lerp(10, 15, scalePercent(80, 100))
        // root.rotation.x += 0.01
        if(root){
            root.rotation.y += 0.01
           }
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