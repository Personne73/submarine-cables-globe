import * as THREE from 'three';

// On charge les deux textures
const loader = new THREE.TextureLoader();

const textureNight = loader.load(
    '//unpkg.com/three-globe/example/img/earth-night.jpg',
    (tex) => {
        console.log("Night texture chargée !", tex.image);
        console.log(`Taille : ${tex.image.width}x${tex.image.height}`);
        tex.flipY = true;
        tex.needsUpdate = true;
    },
    undefined,
    (err) => {
        console.error("Erreur chargement nightTexture", err);
    }
);

const textureDay = loader.load(
    '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    (tex) => {
        console.log("Day texture chargée !", tex.image);
        tex.flipY = true;
        tex.needsUpdate = true;
    },
    undefined,
    (err) => {
        console.error("Erreur chargement dayTexture", err);
    }
);

const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
        nightTexture: { value: textureNight },
        dayTexture:   { value: textureDay },
        mixFactor:    { value: 0.5 }  // 0.0 -> affiche la nuit, 1.0 -> affiche le jour
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    fragmentShader: `
    uniform sampler2D nightTexture;
    uniform sampler2D dayTexture;
    uniform float mixFactor;
    varying vec2 vUv;
    void main() {
        vec4 nightColor = texture2D(nightTexture, vUv);
        vec4 dayColor   = texture2D(dayTexture, vUv);
        gl_FragColor = mix(nightColor, dayColor, mixFactor);
        //gl_FragColor = dayColor;
        //gl_FragColor = vec4(vUv, 0.0, 1.0);
        //gl_FragColor = texture2D(nightTexture, vUv);
        //gl_FragColor = texture2D(dayTexture, vUv);
        //gl_FragColor.a = 1.0;
    }
    `,
});

customMaterial.side = THREE.DoubleSide;

export default customMaterial;
