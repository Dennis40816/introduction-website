import  { initThreeScene , loadPcbModel } from './load_pcb.js';

const { scene, camera, renderer } = initThreeScene('pcb-gltf-model');
loadPcbModel(scene, camera, renderer);