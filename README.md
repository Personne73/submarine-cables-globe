# Submarine Cables Visualization
Demo : [Watch Demo](https://youtu.be/98CntlCywEg)

Visualization accessible [here](https://personne73.github.io/submarine-cables-globe/)

## Overview
This project visualizes geospatial data on submarine cables using WebGL and Globe.GL. 
It allows users to explore and interact with a 3D globe displaying these critical infrastructures 
that connect the world. With features like interactive filtering and shader-based rendering, 
this project provides a visually engaging and informative experience.

## Features
- **3D Globe Visualization** : Visualize submarine cables on a 3D globe
- **Interactive Filtering** : Users can filter the submarine cables by year of installation
- **Custom Shader Rendering** : Custom shader rendering for day and night modes with adjustable blending
- **Tooltip** : Hover interactions to display information about the selected submarine cable.
- **Responsive Design** : The visualization is responsive and adapts to different screen sizes.

## Project Structure
```
submarine-cables-visualization/
├── data/                   # Data files
│   └──submarine-cables.geojson
├── js/                    
│   ├── main.js             # Main JavaScript file
│   ├── submarineCables.js  # Submarine cables visualization
│   └── customShaderMaterial.js # Custom shader material
├── index.html              # Main HTML file
├── style.css               # Main CSS file
├── package.json            # Node.js package file
├── package-lock.json       # Node.js package lock file
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Requirements
Ensure the following dependencies are installed :

- [Node.js](https://nodejs.org/) version 16+
- [npm](https://www.npmjs.com/) version 7+

## Installation and Execution
Once the dependencies are installed, recover the project and navigate to the project directory in the terminal.
Then, follow the steps below to run the installation of the project dependencies and run the application :

1. Install the project dependencies :
```bash
npm install
```
2. Run the application :
```bash
npm run dev
```
3. Open a web browser and navigate to the following URL : http://localhost:5173/

## Credits
- **Data source** : The data used in this project comes from the public GitHub repository 
[submarine-cable-taps](https://github.com/lifewinning/submarine-cable-taps/blob/master/data/submarine_cables.geojson?short_path=0cdada6)
- Libraries : [Globe.GL](https://globe.gl/) and [Three.js](https://threejs.org/)

## Author
Joël MBIAPA
