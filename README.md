# Submarine Cables Visualization
Demo : https://youtu.be/98CntlCywEg

## Overview
WebGL-based geospatial data visualization project, enabling users to explore submarine cables on a 3D globe 
with some interactions. The project is based on the [Globe.GL](https://globe.gl/) and Three.js to visualize data.

## Project Structure
```
submarine-cables-visualization/
│
├── data/                   # Data files
│   └──submarine-cables.json
├── js/                    
│   ├── main.js             # Main JavaScript file
│   ├── submarineCables.js  # Submarine cables visualization
│   └── customShaderMaterial.js # Custom shader material
├── index.html              # Main HTML file
├── style.css               # Main CSS file
├── package.json            # Node.js package file
├── package-lock.json       # Node.js package lock file
├── .gitignore              # Git ignore file
└── README.md               # Project README
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
The data used in this project comes from the public GitHub repository 
[submarine-cable-taps](https://github.com/lifewinning/submarine-cable-taps/blob/master/data/submarine_cables.geojson?short_path=0cdada6)

## Author
Joël MBIAPA
