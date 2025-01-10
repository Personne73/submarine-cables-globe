import customMaterial from './customShaderMaterial.js';
import {initGlobe2, addTextureControls2, loadData, activateFilter} from './submarine_cables.js';

function main() {
    const globe = initGlobe2()
    addTextureControls2(globe, customMaterial);
    loadData(globe);
    activateFilter(globe);
}

main();
