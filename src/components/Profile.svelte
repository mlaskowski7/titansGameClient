<script lang="ts">
    import type { User } from "$lib";
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  
    export let currentUser: User | null;
  
    let container: HTMLDivElement;
  
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let model: THREE.Group;
  
    onMount(() => {
      // Set up the scene
      scene = new THREE.Scene();
  
      // Set up the camera
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  
      // Set up the renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
  
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);
  
      // Load the 3D model
      const loader = new GLTFLoader();
  
      loader.load(
        '/models/character1/scene.gltf', // Adjust the path to your model file
        (gltf: any) => {
          model = gltf.scene;
          scene.add(model);
          model.position.set(0, 0, 0);
          model.scale.set(1, 1, 1);
        },
        undefined,
        (error: any) => {
          console.error('An error occurred while loading the model', error);
        }
      );
  
      camera.position.z = 5;
  
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
  
        if (model) {
          // Rotate the model
          model.rotation.y += 0.01;
        }
  
        renderer.render(scene, camera);
      }
  
      animate();
  
      // Handle resizing
      const resizeObserver = new ResizeObserver(() => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      });
  
      resizeObserver.observe(container);
  
      // Cleanup when the component is destroyed
      return () => {
        resizeObserver.unobserve(container);
        renderer.dispose();
      };
    });
  </script>
  
  <style>
    .three-container {
      width: 700px; /* Adjust as needed */
      height: 700px; /* Adjust as needed */
    }
  </style>
  
  <div class="flex flex-row justify-center items-center text-[24px] font-lido">
    <div>
      <div bind:this={container} class="three-container"></div>
    </div>
    <div class="flex flex-col items-start justify-center gap-2 p-5 mb-[100px]">
        <div class="text-accent uppercase font-mono">{currentUser?.username}</div>
        <div class="text-[16px]">Character: 1</div>
        <div class="text-[16px]">Account created at: {currentUser?.created_at.split('T')[0]}</div>
        <div class="text-[16px]">Player number: {currentUser?.id}</div>
        <div class="text-[16px]">Times logged in: 10</div>
    </div>
    
  </div>
  