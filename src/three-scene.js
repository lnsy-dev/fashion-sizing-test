import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class ThreeScene extends HTMLElement {
  constructor() {
    super();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mannequin = null;
    this.toteBag = null;
    this.controls = null;
    this.waypoint1 = null;
    this.waypoint2 = null;
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-progress">
          <div class="progress-bar"></div>
          <p>Loading 3D Models...</p>
        </div>
      </div>
      <div class="control-panels">
        <details>
          <summary>Mannequin Controls</summary>
          <div class="control-panel mannequin-controls">
            <div class="control-group">
              <label>Scale:</label>
              <div class="slider-container">
                <input type="range" class="scale" min="0" max="10" step="0.1" value="3.5">
                <input type="number" class="scale-value" min="0" max="10" step="0.1" value="3.5">
              </div>
            </div>
            <div class="control-group">
              <label>Rotation (degrees):</label>
              <div class="slider-container">
                <input type="range" class="rotation-x" min="-180" max="180" step="1" value="0">
                <input type="number" class="rotation-x-value" min="-180" max="180" step="1" value="0">
              </div>
              <div class="slider-container">
                <input type="range" class="rotation-y" min="-180" max="180" step="1" value="0">
                <input type="number" class="rotation-y-value" min="-180" max="180" step="1" value="0">
              </div>
              <div class="slider-container">
                <input type="range" class="rotation-z" min="-180" max="180" step="1" value="0">
                <input type="number" class="rotation-z-value" min="-180" max="180" step="1" value="0">
              </div>
            </div>
            <div class="control-group">
              <label>Position:</label>
              <div class="slider-container">
                <input type="range" class="position-x" min="-10" max="10" step="0.1" value="-0.1">
                <input type="number" class="position-x-value" min="-10" max="10" step="0.1" value="-0.1">
              </div>
              <div class="slider-container">
                <input type="range" class="position-y" min="-10" max="10" step="0.1" value="-3">
                <input type="number" class="position-y-value" min="-10" max="10" step="0.1" value="-3">
              </div>
              <div class="slider-container">
                <input type="range" class="position-z" min="-10" max="10" step="0.1" value="0">
                <input type="number" class="position-z-value" min="-10" max="10" step="0.1" value="0">
              </div>
            </div>
          </div>
        </details>
        <details>
          <summary>Tote Bag Controls</summary>
          <div class="control-panel tote-bag-controls">
            <div class="control-group">
              <label>Scale:</label>
              <div class="slider-container">
                <input type="range" class="scale" min="0.001" max="0.1" step="0.001" value="0.004">
                <input type="number" class="scale-value" min="0.001" max="0.1" step="0.001" value="0.004">
              </div>
            </div>
            <div class="control-group">
              <label>Rotation (degrees):</label>
              <div class="slider-container">
                <input type="range" class="rotation-x" min="-180" max="180" step="1" value="-105">
                <input type="number" class="rotation-x-value" min="-180" max="180" step="1" value="-105">
              </div>
              <div class="slider-container">
                <input type="range" class="rotation-y" min="-180" max="180" step="1" value="0">
                <input type="number" class="rotation-y-value" min="-180" max="180" step="1" value="0">
              </div>
              <div class="slider-container">
                <input type="range" class="rotation-z" min="-180" max="180" step="1" value="97">
                <input type="number" class="rotation-z-value" min="-180" max="180" step="1" value="97">
              </div>
            </div>
            <div class="control-group">
              <label>Position:</label>
              <div class="slider-container">
                <input type="range" class="position-x" min="-5" max="5" step="0.1" value="2.4">
                <input type="number" class="position-x-value" min="-5" max="5" step="0.1" value="2.4">
              </div>
              <div class="slider-container">
                <input type="range" class="position-y" min="-5" max="5" step="0.1" value="0.7">
                <input type="number" class="position-y-value" min="-5" max="5" step="0.1" value="0.7">
              </div>
              <div class="slider-container">
                <input type="range" class="position-z" min="-5" max="5" step="0.1" value="0.5">
                <input type="number" class="position-z-value" min="-5" max="5" step="0.1" value="0.5">
              </div>
            </div>
          </div>
        </details>
        <details>
          <summary>Waypoint 1 Controls</summary>
          <div class="control-panel waypoint1-controls">
            <div class="control-group">
              <label>Scale:</label>
              <div class="slider-container">
                <input type="range" class="scale" min="0.1" max="1" step="0.1" value="0.6">
                <input type="number" class="scale-value" min="0.1" max="1" step="0.1" value="0.6">
              </div>
            </div>
            <div class="control-group">
              <label>Position:</label>
              <div class="slider-container">
                <input type="range" class="position-x" min="-5" max="5" step="0.1" value="-1.6">
                <input type="number" class="position-x-value" min="-5" max="5" step="0.1" value="-1.6">
              </div>
              <div class="slider-container">
                <input type="range" class="position-y" min="-5" max="5" step="0.1" value="1.3">
                <input type="number" class="position-y-value" min="-5" max="5" step="0.1" value="1.3">
              </div>
              <div class="slider-container">
                <input type="range" class="position-z" min="-5" max="5" step="0.1" value="0.2">
                <input type="number" class="position-z-value" min="-5" max="5" step="0.1" value="0.2">
              </div>
            </div>
          </div>
        </details>
        <details>
          <summary>Waypoint 2 Controls</summary>
          <div class="control-panel waypoint2-controls">
            <div class="control-group">
              <label>Scale:</label>
              <div class="slider-container">
                <input type="range" class="scale" min="0.1" max="1" step="0.1" value="0.6">
                <input type="number" class="scale-value" min="0.1" max="1" step="0.1" value="0.6">
              </div>
            </div>
            <div class="control-group">
              <label>Position:</label>
              <div class="slider-container">
                <input type="range" class="position-x" min="-5" max="5" step="0.1" value="1.7">
                <input type="number" class="position-x-value" min="-5" max="5" step="0.1" value="1.7">
              </div>
              <div class="slider-container">
                <input type="range" class="position-y" min="-5" max="5" step="0.1" value="1.3">
                <input type="number" class="position-y-value" min="-5" max="5" step="0.1" value="1.3">
              </div>
              <div class="slider-container">
                <input type="range" class="position-z" min="-5" max="5" step="0.1" value="0.3">
                <input type="number" class="position-z-value" min="-5" max="5" step="0.1" value="0.3">
              </div>
            </div>
          </div>
        </details>
      </div>
      <div class="model-values">
        <div class="model-values-container">
          <h3>Mannequin Values</h3>
          <span id="mannequin-values"></span>
        </div>
        <div class="model-values-container">
          <h3>Tote Bag Values</h3>
          <span id="tote-bag-values"></span>
        </div>
        <div class="model-values-container">
          <h3>Waypoint 1 Values</h3>
          <span id="waypoint1-values"></span>
        </div>
        <div class="model-values-container">
          <h3>Waypoint 2 Values</h3>
          <span id="waypoint2-values"></span>
        </div>
      </div>
      <canvas class="three-canvas"></canvas>
    `;

    this.init();
  }

  init() {
    // Create scene
    this.scene = new THREE.Scene();
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 5);
    this.camera.lookAt(0, 0, 0);
    
    // Create renderer
    const canvas = this.querySelector('.three-canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xf0f0f0);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
    
    // Setup OrbitControls
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI / 2;
    
    // Add waypoints
    this.addWaypoints();
    
    // Load models
    this.loadModels();
    
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize);
    
    // Start render loop
    this.render();
  }

  setupControls() {
    // Setup controls for all models and waypoints
    const controlPanels = [
      { name: 'mannequin', panel: '.mannequin-controls' },
      { name: 'toteBag', panel: '.tote-bag-controls' },
      { name: 'waypoint1', panel: '.waypoint1-controls' },
      { name: 'waypoint2', panel: '.waypoint2-controls' }
    ];

    controlPanels.forEach(({ name, panel }) => {
      const controlPanel = this.querySelector(panel);
      if (controlPanel) {
        controlPanel.querySelectorAll('.slider-container').forEach(container => {
          const slider = container.querySelector('input[type="range"]');
          const numberInput = container.querySelector('input[type="number"]');
          
          // Update number input when slider changes
          slider.addEventListener('input', (e) => {
            e.preventDefault();
            numberInput.value = slider.value;
            this.updateModelTransform(name);
          });
          
          // Update slider when number input changes
          numberInput.addEventListener('input', (e) => {
            e.preventDefault();
            slider.value = numberInput.value;
            this.updateModelTransform(name);
          });
        });
      }
    });
  }

  updateModelTransform(modelName) {
    const model = this[modelName];
    if (!model) {
      console.warn(`Model ${modelName} not found`);
      return;
    }

    // Convert camelCase to kebab-case for class names
    const panelClass = modelName === 'toteBag' ? 'tote-bag-controls' : 
                      modelName === 'waypoint1' ? 'waypoint1-controls' :
                      modelName === 'waypoint2' ? 'waypoint2-controls' :
                      'mannequin-controls';
    
    const panel = this.querySelector(`.${panelClass}`);
    if (!panel) {
      console.warn(`Control panel for ${modelName} not found`);
      return;
    }

    const values = {
      scale: parseFloat(panel.querySelector('.scale').value),
      position: {
        x: parseFloat(panel.querySelector('.position-x').value),
        y: parseFloat(panel.querySelector('.position-y').value),
        z: parseFloat(panel.querySelector('.position-z').value)
      }
    };

    // Only include rotation for mannequin and tote bag
    if (modelName === 'mannequin' || modelName === 'toteBag') {
      values.rotation = {
        x: parseFloat(panel.querySelector('.rotation-x').value),
        y: parseFloat(panel.querySelector('.rotation-y').value),
        z: parseFloat(panel.querySelector('.rotation-z').value)
      };
    }

    console.log(`Updating ${modelName} with values:`, values);

    // Apply transforms
    model.scale.set(values.scale, values.scale, values.scale);
    model.position.set(values.position.x, values.position.y, values.position.z);
    
    // Apply rotation only for mannequin and tote bag
    if (values.rotation) {
      model.rotation.set(
        THREE.MathUtils.degToRad(values.rotation.x),
        THREE.MathUtils.degToRad(values.rotation.y),
        THREE.MathUtils.degToRad(values.rotation.z)
      );
    }

    // Update text output
    this.updateModelValues(modelName, values);
  }

  updateModelValues(modelName, values) {
    // Convert camelCase to kebab-case for the element ID
    const elementId = modelName === 'toteBag' ? 'tote-bag-values' : 
                     modelName === 'waypoint1' ? 'waypoint1-values' :
                     modelName === 'waypoint2' ? 'waypoint2-values' :
                     `${modelName}-values`;
    
    const output = this.querySelector(`#${elementId}`);
    if (output) {
      output.textContent = JSON.stringify(values);
    }
  }

  loadModels() {
    const objLoader = new OBJLoader();
    const gltfLoader = new GLTFLoader();
    const progressBar = this.querySelector('.progress-bar');
    const loadingText = this.querySelector('.loading-progress p');
    let loadedCount = 0;
    const totalModels = 2;

    const updateProgress = (progress) => {
      progressBar.style.width = `${progress * 100}%`;
      loadingText.textContent = `Loading 3D Models... ${Math.round(progress * 100)}%`;
    };

    // Load mannequin
    gltfLoader.load(
      '/assets/mannequin.gltf',
      (gltf) => {
        this.mannequin = gltf.scene;
        this.mannequin.scale.set(3.5, 3.5, 3.5);
        this.mannequin.position.set(-0.1, -3, 0);
        this.scene.add(this.mannequin);
        loadedCount++;
        updateProgress(loadedCount / totalModels);
      },
      (xhr) => {
        const progress = (loadedCount + (xhr.loaded / xhr.total)) / totalModels;
        updateProgress(progress);
      },
      (error) => {
        console.error('Error loading mannequin:', error);
      }
    );

    // Load tote bag
    objLoader.load(
      '/assets/tote-bag.obj',
      (object) => {
        this.toteBag = object;
        this.toteBag.scale.set(0.004, 0.004, 0.004);
        this.toteBag.position.set(2.4, 0.7, 0.5);
        this.toteBag.rotation.set(
          THREE.MathUtils.degToRad(-105),
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(97)
        );
        this.scene.add(this.toteBag);
        loadedCount++;
        updateProgress(loadedCount / totalModels);
        
        // Hide loading overlay when all models are loaded
        if (loadedCount === totalModels) {
          setTimeout(() => {
            this.querySelector('.loading-overlay').style.display = 'none';
            // Setup controls and initialize transforms after DOM is ready
            this.setupControls();
            this.updateModelTransform('mannequin');
            this.updateModelTransform('toteBag');
          }, 500);
        }
      },
      (xhr) => {
        const progress = (loadedCount + (xhr.loaded / xhr.total)) / totalModels;
        updateProgress(progress);
      },
      (error) => {
        console.error('Error loading tote bag:', error);
      }
    );
  }

  addWaypoints() {
    // Create diamond geometry
    const geometry = new THREE.OctahedronGeometry(0.2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x808080,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });

    // Create waypoint 1
    this.waypoint1 = new THREE.Mesh(geometry, material);
    this.waypoint1.position.set(-1.6, 1.3, 0.2);
    this.scene.add(this.waypoint1);

    // Create waypoint 2
    this.waypoint2 = new THREE.Mesh(geometry, material);
    this.waypoint2.position.set(1.7, 1.3, 0.3);
    this.scene.add(this.waypoint2);
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    
    // Update controls
    this.controls.update();
    
    // Animate waypoints
    if (this.waypoint1 && this.waypoint2) {
      this.waypoint1.rotation.y += 0.02;
      this.waypoint2.rotation.y -= 0.02;
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.onWindowResize);
    this.controls.dispose();
    this.renderer.dispose();
    if (this.mannequin) {
      this.mannequin.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    }
    if (this.toteBag) {
      this.toteBag.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    }
    if (this.waypoint1) {
      this.waypoint1.geometry.dispose();
      this.waypoint1.material.dispose();
    }
    if (this.waypoint2) {
      this.waypoint2.geometry.dispose();
      this.waypoint2.material.dispose();
    }
  }
}

customElements.define('three-scene', ThreeScene); 