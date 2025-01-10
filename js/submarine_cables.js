import Globe from 'globe.gl';
import customMaterial from './customShaderMaterial.js';

const globeContainer = document.getElementById("globeViz");

function initGlobe() {
    const globe = Globe()
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg") // texture image de la Terre
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png') // texture de relief
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png");

    globe(globeContainer)

    /*
    const controls = globe.controls();
    controls.autoRotate = true; // Activer l'auto-rotation
    controls.autoRotateSpeed = 1; // Vitesse de rotation (valeur positive pour sens horaire)
    */

    return globe;
}

export function initGlobe2() {
    const globe = Globe()
        .globeMaterial(customMaterial) // on injecte le customMaterial
        .showAtmosphere(false)
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png");

    // Lancement du rendu
    globe(globeContainer);

    return globe;
}

// v1 : simple affichage des câbles
function loadData2(globe) {
    fetch('data/submarine_cables.geojson')
        .then(response => response.json()) // Parse les données en JSON
        .then(data => {
            console.log('Données GeoJSON récupérées :', data);

            // flatMap: Transforme chaque élément d'un tableau en un nouvel élément ou un tableau.
            // Puis aplatit automatiquement les sous-tableaux en un tableau unique.
            const cables = data.features.flatMap(feature => {
                const coordinates = feature.geometry.coordinates;
                const properties = feature.properties;

                const segments = [];
                for(let i = 0; i < coordinates.length - 1; i++) {
                    const startPoints = coordinates[i];
                    const endPoints = coordinates[i + 1];

                    segments.push({
                        startLat: startPoints[1], // start latitude
                        startLng: startPoints[0], // start longitude
                        endLat: endPoints[1], // end latitude
                        endLng: endPoints[0], // end longitude
                        name: properties.name,
                        color: properties.color
                    });
                }

                return segments
            });

            globe.arcsData(cables) // Charger les arcs
                .arcColor(d => d.color) // Utiliser les couleurs des arcs
                .arcLabel(d => `${d.name}`) // Ajouter les noms comme infobulles
                .arcAltitude(0); // Altitude des arcs
        })
        .catch(error => console.error('Erreur lors de la récupération du fichier GeoJSON : :', error));
}

// v2 : hover sur les câbles
let cables = [];
let displayedCables = [];
export function loadData(globe) {
    fetch('data/submarine_cables.geojson')
        .then(response => response.json())
        .then(data => {
            console.log('Données GeoJSON récupérées :', data);

            // Transformer les données en segments
            cables = data.features.flatMap(feature => {
                const coordinates = feature.geometry.coordinates;
                const properties = feature.properties;

                const segments = [];
                for (let i = 0; i < coordinates.length - 1; i++) {
                    const startPoints = coordinates[i];
                    const endPoints = coordinates[i + 1];

                    segments.push({
                        startLat: startPoints[1], // Latitude de départ
                        startLng: startPoints[0], // Longitude de départ
                        endLat: endPoints[1], // Latitude d'arrivée
                        endLng: endPoints[0], // Longitude d'arrivée
                        name: properties.name,
                        rfs: properties.rfs,
                        rfsYear: parseYearFromRFS(""+properties.rfs),
                        color: properties.color,
                        originalColor: properties.color // Sauvegarde de la couleur initiale
                    });
                }

                return segments;
            });

            // Ajouter les arcs au globe
            displayedCables = cables;

            globe.arcsData(displayedCables)
                .arcColor(d => d.color) // Couleur dynamique
                .arcLabel(d => `${d.name} (RFS: ${d.rfsYear || '??'})`) // Nom en infobulle
                .arcAltitude(0) // Les arcs sont plats
                .onArcHover(arc => {
                    // Réinitialiser les couleurs
                    displayedCables.forEach(d => (d.color = d.originalColor));

                    if (arc) {
                        // Modifier la couleur et/ou l'épaisseur de l'arc survolé
                        arc.color = 'yellow'; // Couleur surlignée
                    }

                    // Mettre à jour le globe pour refléter les changements
                    globe.arcsData(displayedCables);
                });
        })
        .catch(error => console.error('Erreur lors de la récupération des données GeoJSON :', error));
}

function parseYearFromRFS(rfsString) {
    if (!rfsString) return null;

    // "April 2009", on veut récupérer "2009"
    // regex qui cherche un 4 chiffres
    const match = rfsString.match(/(\d{4})/);
    if (match) {
        return parseInt(match[1]); // ex : 2009
    }
    return null; // pas trouvé
}

function filterCablesUpToYear(globe, year) {
    const filtered = cables.filter(d => {
        return (d.rfsYear !== null && d.rfsYear < year);
    });
    displayedCables = filtered;
    globe.arcsData(filtered);
}

export function activateFilter(globe) {
    const yearSlider = document.getElementById('year-slider');
    const yearSliderValue = document.getElementById('year-slider-value');

    // Maj valeur
    yearSliderValue.textContent = yearSlider.value;

    yearSlider.addEventListener('input', () => {
        const val = parseInt(yearSlider.value);
        yearSliderValue.textContent = val;
        filterCablesUpToYear(globe, val);
    });

    document.getElementById('show-all-cables').addEventListener('click', () => {
        yearSlider.value = yearSlider.max;
        yearSliderValue.textContent = yearSlider.value;
        displayedCables = cables;
        globe.arcsData(cables);
    });
}

// v3 : hover sur les câbles avec effet de survol de zinzin
function loadData3(globe) {
    fetch('data/submarine_cables.geojson')
        .then(response => response.json())
        .then(data => {
            console.log('Données GeoJSON récupérées :', data);

            // Transformer les données en segments
            const cables = data.features.flatMap(feature => {
                const coordinates = feature.geometry.coordinates;
                const properties = feature.properties;

                const segments = [];
                for (let i = 0; i < coordinates.length - 1; i++) {
                    const startPoints = coordinates[i];
                    const endPoints = coordinates[i + 1];

                    segments.push({
                        startLat: startPoints[1], // Latitude de départ
                        startLng: startPoints[0], // Longitude de départ
                        endLat: endPoints[1], // Latitude d'arrivée
                        endLng: endPoints[0], // Longitude d'arrivée
                        name: properties.name,
                        color: properties.color,
                        originalColor: properties.color, // Sauvegarde de la couleur initiale
                        stroke: 0.5 // Épaisseur initiale de l'arc
                    });
                }

                return segments;
            });

            let hoveredArc = null; // Suivre l'arc survolé

            // Ajouter les arcs au globe
            globe.arcsData(cables)
                .arcColor(d => d.color) // Couleur dynamique
                .arcLabel(d => `${d.name}`) // Nom en infobulle
                .arcStroke(d => d.stroke) // Épaisseur dynamique
                .arcAltitude(0) // Les arcs sont plats
                .onArcHover(arc => {
                    // Réinitialiser l'arc précédent
                    if (hoveredArc) {
                        hoveredArc.color = hoveredArc.originalColor; // Restaurer la couleur d'origine
                        hoveredArc.stroke = 0.5; // Restaurer l'épaisseur d'origine
                    }

                    // Mettre en évidence l'arc survolé
                    if (arc) {
                        arc.color = 'yellow'; // Couleur surlignée
                        arc.stroke = 1.5; // Augmenter l'épaisseur
                        hoveredArc = arc; // Suivre l'arc actuel
                    } else {
                        hoveredArc = null; // Aucun arc survolé
                    }

                    // Mettre à jour le globe
                    globe.arcsData(cables);
                });
        })
        .catch(error => console.error('Erreur lors de la récupération des données GeoJSON :', error));
}

// rotateGlobe: fonction pour faire tourner le globe automatiquement utilisant Three.js
function rotateGlobe(globe) {
    const scene = globe.scene();
    const camera = globe.camera();

    function animate() {
        // Rotation automatique
        scene.rotation.y += 0.001;

        // Rendu avec Three.js
        globe.renderer().render(scene, camera);

        requestAnimationFrame(animate);
    }

    animate();
}

function addTextureControls(globe) {
    document.getElementById('dark-mode').addEventListener('click', () => {
        globe.globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg");
    });

    document.getElementById('day-mode').addEventListener('click', () => {
        globe.globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg");
    });
}

export function addTextureControls2(globe, material) {
    const slider = document.getElementById('mix-slider');
    const sliderValue = document.getElementById('mix-slider-value');

    document.getElementById('dark-mode').addEventListener('click', () => {
        // 0 -> privilégie la texture de nuit
        material.uniforms.mixFactor.value = 0.0;
        slider.value = material.uniforms.mixFactor.value;
        sliderValue.textContent = slider.value;
        console.log("valeur minFactor : " + material.uniforms.mixFactor.value);
    });

    document.getElementById('day-mode').addEventListener('click', () => {
        // 1 -> privilégie la texture de jour
        material.uniforms.mixFactor.value = 1.0;
        slider.value = material.uniforms.mixFactor.value;
        sliderValue.textContent = slider.value;
        console.log("valeur minFactor : " + material.uniforms.mixFactor.value);
    });

    // slider mis a la valeur actuel du mixFactor
    slider.value = material.uniforms.mixFactor.value;
    sliderValue.textContent = slider.value;

    slider.addEventListener('input', () => {
        const val = parseFloat(slider.value);
        material.uniforms.mixFactor.value = val;
        sliderValue.textContent = val.toFixed(1);
    });
}
