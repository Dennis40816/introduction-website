// by importmap
import * as THREE from 'three';
import { GLTFLoader } from 'three/gltfLoader';

function resizeRenderer(renderer, camera, containerId) {
    const pcbModel = document.getElementById(containerId);
    if (!pcbModel) { 
        console.log(containerId, 'not found!');
        return;
    }

    const rect = pcbModel.getBoundingClientRect();

    console.log(rect.width, rect.height);

    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
}

function initThreeScene(element_id)
{
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true});
    resizeRenderer(renderer, camera, element_id);
    document.getElementById(element_id).appendChild(renderer.domElement);

    return { scene, camera, renderer };
}

function loadPcbModel(scene, camera, renderer)
{
    const loader = new GLTFLoader();
    loader.load('assets/gltf/pcb.gltf', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // add light
        const LightColor = 0xffffff;
        const ambientLight = new THREE.AmbientLight(LightColor, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(LightColor);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.target = model;
        directionalLight.intensity = 3.0;
        directionalLight.distance = 0;
        directionalLight.shadow.camera.left = -25;
        directionalLight.shadow.camera.right = 25;
        directionalLight.shadow.camera.top = 25;
        directionalLight.shadow.camera.bottom = -25;
        scene.add(directionalLight);

        // Rotation and animation setup
        setupAnimation(model, renderer, scene, camera);
    });
}

function setupAnimation(model, renderer, scene, camera) {
    const initialSpeedX = 0.08;
    const initialSpeedY = 0.16;
    const maxRotation = Math.PI / 8;
    const minRotation = -Math.PI / 8;
    let rotateDirectionX = 1;
    let rotateDirectionY = 1;
    const dampingFactor = 0.05;
    const minSpeed = 0.001; // 旋轉速度的最小值

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
    
        const dampingX = 1 - (Math.abs(model.rotation.x) / maxRotation) * (1 - dampingFactor);
        const dampingY = 1 - (Math.abs(model.rotation.y) / maxRotation) * (1 - dampingFactor);

        const currentSpeedY = Math.max(initialSpeedY * dampingY, minSpeed);
        const currentSpeedX = Math.max(initialSpeedX * dampingX, minSpeed);
    
        model.rotation.y += currentSpeedY * delta * rotateDirectionY;
        model.rotation.x += currentSpeedX * delta * rotateDirectionX;
    
        if (model.rotation.y > maxRotation || model.rotation.y < minRotation) {
            rotateDirectionY *= -1;
        }
    
        if (model.rotation.x > maxRotation || model.rotation.x < minRotation) {
            rotateDirectionX *= -1;
        }
    
        renderer.render(scene, camera);
    }
    animate();
}

export { initThreeScene, loadPcbModel, resizeRenderer };