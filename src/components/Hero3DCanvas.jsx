import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Eye, Sparkles, Volume2, VolumeX, Sun, Sunset, Sunrise } from 'lucide-react';

export default function Hero3DCanvas({ onExploreClick, onCustomPlanClick }) {
  const mountRef = useRef(null);
  const [activePreset, setActivePreset] = useState('sunset'); // 'sunset', 'noon', 'dawn'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const audioNodesRef = useRef([]);

  const sceneStateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    sunLight: null,
    ambientLight: null,
    sunMesh: null,
    sunGlow: null,
    birds: [],
    palms: [],
    sandMesh: null,
    particles: null,
    targetRotation: { x: 0, y: 0 },
    currentRotation: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 }
  });

  // Synthesized Ambient Sound (Desert Breeze & Mystical Oud drone) using Web Audio API
  const toggleSound = () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsAudioPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.07, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // Brown noise for soft desert wind
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const windFilter = ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(320, ctx.currentTime);

        whiteNoise.connect(windFilter);
        windFilter.connect(masterGain);
        whiteNoise.start();

        // Egyptian harmonic chords
        const freqList = [146.83, 220.00, 293.66, 440.00];
        freqList.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.015 / (idx + 1), ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          audioNodesRef.current.push(osc, lfo);
        });

        audioNodesRef.current.push(whiteNoise);
      } else {
        audioCtxRef.current.resume();
      }
      setIsAudioPlaying(true);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene with Light Theme Sky Tone (Warm golden sand & azure mist)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5efe6, 0.011);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 14, 46);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    const state = sceneStateRef.current;
    state.scene = scene;
    state.camera = camera;
    state.renderer = renderer;

    // Lighting (Luminous Golden Hour for Light Theme)
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.4);
    scene.add(ambientLight);
    state.ambientLight = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xf59e0b, 2.6);
    sunLight.position.set(-20, 26, -20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);
    state.sunLight = sunLight;

    // Azure Mediterranean / Red Sea fill light
    const azureLight = new THREE.DirectionalLight(0x0284c7, 1.2);
    azureLight.position.set(25, 15, 20);
    scene.add(azureLight);

    // 1. THE GOLDEN SUN ORB (Directly from Logo)
    const sunGeom = new THREE.SphereGeometry(6.8, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.98
    });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    sunMesh.position.set(-18, 16, -42);
    scene.add(sunMesh);
    state.sunMesh = sunMesh;

    // Sun Glow Sprite
    const canvasGlow = document.createElement('canvas');
    canvasGlow.width = 128;
    canvasGlow.height = 128;
    const ctx = canvasGlow.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(251, 191, 36, 0.95)');
    grad.addColorStop(0.35, 'rgba(245, 158, 11, 0.45)');
    grad.addColorStop(0.7, 'rgba(217, 119, 6, 0.12)');
    grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const glowTexture = new THREE.CanvasTexture(canvasGlow);
    const glowMat = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8
    });
    const sunGlow = new THREE.Sprite(glowMat);
    sunGlow.scale.set(34, 34, 1);
    sunGlow.position.copy(sunMesh.position);
    scene.add(sunGlow);
    state.sunGlow = sunGlow;

    // 2. THE 3D PYRAMIDS OF GIZA
    const createPyramid = (baseSize, height, position, rotationY = 0) => {
      const group = new THREE.Group();
      
      const bodyHeight = height * 0.82;
      const bodyGeom = new THREE.ConeGeometry(baseSize / Math.SQRT2, bodyHeight, 4, 16);
      
      // Warm desert sandstone
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xdfb776,
        roughness: 0.8,
        metalness: 0.08,
        flatShading: true
      });
      const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
      bodyMesh.position.y = bodyHeight / 2;
      bodyMesh.rotation.y = Math.PI / 4;
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      group.add(bodyMesh);

      // Golden Apex Cap (Pyramidion)
      const capHeight = height * 0.18;
      const capBase = baseSize * 0.22;
      const capGeom = new THREE.ConeGeometry(capBase / Math.SQRT2, capHeight, 4, 1);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xd97706,
        emissiveIntensity: 0.35,
        roughness: 0.18,
        metalness: 0.85,
        flatShading: true
      });
      const capMesh = new THREE.Mesh(capGeom, capMat);
      capMesh.position.y = bodyHeight + (capHeight / 2) - 0.2;
      capMesh.rotation.y = Math.PI / 4;
      capMesh.castShadow = true;
      group.add(capMesh);

      group.position.copy(position);
      group.rotation.y = rotationY;
      return group;
    };

    const khufu = createPyramid(22, 15, new THREE.Vector3(-4, 0, -10), 0.1);
    scene.add(khufu);

    const khafre = createPyramid(19, 13.5, new THREE.Vector3(14, 0, -20), -0.15);
    scene.add(khafre);

    const menkaure = createPyramid(11, 7.5, new THREE.Vector3(-22, 0, -22), 0.2);
    scene.add(menkaure);

    // 3. UNDULATING DESERT DUNES & WAVE CURVES (Logo Motifs)
    const sandGeom = new THREE.PlaneGeometry(120, 100, 64, 64);
    sandGeom.rotateX(-Math.PI / 2);
    
    const pos = sandGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const d1 = Math.sin(x * 0.05 + z * 0.03) * 2.8;
      const d2 = Math.cos(x * 0.08 - z * 0.04) * 1.5;
      const d3 = Math.sin(Math.sqrt(x * x + z * z) * 0.04) * 1.2;
      const distFromCenter = Math.hypot(x - 6, z - 12);
      let y = d1 + d2 + d3 - 1.0;
      if (distFromCenter < 18) {
        y -= Math.cos((distFromCenter / 18) * Math.PI) * 2.5;
      }
      pos.setY(i, y);
    }
    sandGeom.computeVertexNormals();

    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xdfb776,
      roughness: 0.88,
      metalness: 0.06,
      flatShading: true
    });
    const sandMesh = new THREE.Mesh(sandGeom, sandMat);
    sandMesh.position.set(0, -0.5, 0);
    sandMesh.receiveShadow = true;
    scene.add(sandMesh);
    state.sandMesh = sandMesh;

    // 4. AZURE OASIS POOL (Logo Sea Azure)
    const waterGeom = new THREE.CircleGeometry(11, 48);
    waterGeom.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.12,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });
    const waterMesh = new THREE.Mesh(waterGeom, waterMat);
    waterMesh.position.set(6, -1.9, 11);
    scene.add(waterMesh);

    // 5. 3D PALM TREES (Matching Palm Tree in Logo)
    const createPalmTree = (scale = 1, posX = 0, posZ = 0, rotY = 0) => {
      const palmGroup = new THREE.Group();

      const curvePoints = [];
      const numPts = 10;
      for (let i = 0; i <= numPts; i++) {
        const t = i / numPts;
        const x = Math.sin(t * 1.2) * 1.8 * scale;
        const y = t * 9.5 * scale;
        const z = (t * 0.8) * scale;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const trunkGeom = new THREE.TubeGeometry(curve, 20, 0.45 * scale, 8, false);
      const trunkMat = new THREE.MeshStandardMaterial({
        color: 0x07314d, // Deep navy bark matching logo
        roughness: 0.85
      });
      const trunkMesh = new THREE.Mesh(trunkGeom, trunkMat);
      trunkMesh.castShadow = true;
      palmGroup.add(trunkMesh);

      const topPt = curvePoints[curvePoints.length - 1];
      const leafCount = 9;
      const frondsGroup = new THREE.Group();
      frondsGroup.position.copy(topPt);

      for (let i = 0; i < leafCount; i++) {
        const leafAngle = (i / leafCount) * Math.PI * 2;
        const leafCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(
            Math.cos(leafAngle) * 3.5 * scale,
            1.2 * scale,
            Math.sin(leafAngle) * 3.5 * scale
          ),
          new THREE.Vector3(
            Math.cos(leafAngle) * 5.8 * scale,
            -1.6 * scale,
            Math.sin(leafAngle) * 5.8 * scale
          )
        );
        const leafGeom = new THREE.TubeGeometry(leafCurve, 12, 0.28 * scale, 5, false);
        const leafMat = new THREE.MeshStandardMaterial({
          color: 0x053f63, // Deep vibrant navy-teal
          roughness: 0.7,
          metalness: 0.15
        });
        const leafMesh = new THREE.Mesh(leafGeom, leafMat);
        leafMesh.castShadow = true;
        frondsGroup.add(leafMesh);
      }
      palmGroup.add(frondsGroup);

      palmGroup.position.set(posX, 0, posZ);
      palmGroup.rotation.y = rotY;
      return { group: palmGroup, fronds: frondsGroup };
    };

    const mainPalm = createPalmTree(1.25, -14, 18, 0.3);
    scene.add(mainPalm.group);
    state.palms.push(mainPalm);

    const secondPalm = createPalmTree(0.9, -17, 16, 1.2);
    scene.add(secondPalm.group);
    state.palms.push(secondPalm);

    const oasisPalm = createPalmTree(0.85, 14, 8, -0.8);
    scene.add(oasisPalm.group);
    state.palms.push(oasisPalm);

    // 6. SOARING 3D BIRDS (Matching Logo Seagulls)
    const birds = [];
    const createBird = () => {
      const birdGroup = new THREE.Group();
      
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.lineTo(-1.2, 0.4);
      wingShape.lineTo(-0.9, 0.05);
      wingShape.lineTo(0, -0.15);
      wingShape.lineTo(0.9, 0.05);
      wingShape.lineTo(1.2, 0.4);
      wingShape.closePath();

      const geom = new THREE.ShapeGeometry(wingShape);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x052e4f, // Deep navy silhouette
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geom, mat);
      birdGroup.add(mesh);

      return {
        group: birdGroup,
        mesh,
        angle: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.006,
        radius: 20 + Math.random() * 15,
        height: 18 + Math.random() * 8,
        flapSpeed: 0.12 + Math.random() * 0.05,
        time: Math.random() * 10
      };
    };

    for (let i = 0; i < 4; i++) {
      const bird = createBird();
      scene.add(bird.group);
      birds.push(bird);
    }
    state.birds = birds;

    // 7. GOLDEN DUST PARTICLES
    const particleCount = 1000;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = Math.random() * 30 - 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02 + 0.015,
        y: Math.sin(Math.random() * Math.PI) * 0.008,
        z: (Math.random() - 0.5) * 0.015
      });
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd97706,
      size: 0.32,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);
    state.particles = { system: particleSystem, velocities: particleVelocities, geom: particleGeom };

    // Mouse Interaction
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      state.mouse.x = x;
      state.mouse.y = y;

      if (!state.isDragging) {
        state.targetRotation.y = x * 0.14;
        state.targetRotation.x = y * 0.07;
      } else {
        const deltaX = (e.clientX - state.dragStart.x) * 0.005;
        const deltaY = (e.clientY - state.dragStart.y) * 0.005;
        state.targetRotation.y += deltaX;
        state.targetRotation.x = Math.max(-0.25, Math.min(0.3, state.targetRotation.x + deltaY));
        state.dragStart = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      state.isDragging = true;
      state.dragStart = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      state.isDragging = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      state.currentRotation.x += (state.targetRotation.x - state.currentRotation.x) * 0.05;
      state.currentRotation.y += (state.targetRotation.y - state.currentRotation.y) * 0.05;

      camera.position.x = Math.sin(state.currentRotation.y) * 46;
      camera.position.z = Math.cos(state.currentRotation.y) * 46;
      camera.position.y = 14 + state.currentRotation.x * 12;
      camera.lookAt(0, 4, 0);

      // Fronds sway
      state.palms.forEach((p, idx) => {
        if (p.fronds) {
          p.fronds.rotation.z = Math.sin(elapsedTime * 1.5 + idx) * 0.04;
          p.fronds.rotation.x = Math.cos(elapsedTime * 1.2 + idx) * 0.03;
        }
      });

      // Birds flight
      state.birds.forEach((b) => {
        b.angle += b.speed;
        b.time += b.flapSpeed;
        b.group.position.x = Math.cos(b.angle) * b.radius - 6;
        b.group.position.z = Math.sin(b.angle) * (b.radius * 0.8) - 15;
        b.group.position.y = b.height + Math.sin(b.time * 0.4) * 1.5;
        b.group.rotation.y = -b.angle - Math.PI / 2;
        b.mesh.rotation.x = Math.sin(b.time * 2.5) * 0.25;
      });

      // Sun glow pulse
      if (state.sunGlow) {
        const pulse = 1 + Math.sin(elapsedTime * 1.8) * 0.05;
        state.sunGlow.scale.set(34 * pulse, 34 * pulse, 1);
      }

      // Particles
      if (state.particles) {
        const pPositions = state.particles.geom.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          pPositions[i * 3] += state.particles.velocities[i].x;
          pPositions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.005;
          pPositions[i * 3 + 2] += state.particles.velocities[i].z;

          if (pPositions[i * 3] > 40) pPositions[i * 3] = -40;
          if (pPositions[i * 3 + 1] > 28) pPositions[i * 3 + 1] = 0;
          if (pPositions[i * 3 + 2] > 30) pPositions[i * 3 + 2] = -30;
        }
        state.particles.geom.attributes.position.needsUpdate = true;
      }

      waterMesh.rotation.z = Math.sin(elapsedTime * 0.8) * 0.02;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const applyPreset = (preset) => {
    setActivePreset(preset);
    const state = sceneStateRef.current;
    if (!state.scene) return;

    if (preset === 'sunset') {
      // Golden Hour Light Palette
      state.scene.fog.color.setHex(0xf5efe6);
      state.ambientLight.color.setHex(0xfff6ea);
      state.ambientLight.intensity = 1.4;
      state.sunLight.color.setHex(0xf59e0b);
      state.sunLight.intensity = 2.6;
      state.sunLight.position.set(-20, 26, -20);
      if (state.sunMesh) {
        state.sunMesh.material.color.setHex(0xf59e0b);
        state.sunMesh.visible = true;
      }
      if (state.sunGlow) state.sunGlow.visible = true;
    } else if (preset === 'noon') {
      // Bright Oasis Noon (Crisp Azure Sky)
      state.scene.fog.color.setHex(0xe4f2fb);
      state.ambientLight.color.setHex(0xffffff);
      state.ambientLight.intensity = 1.7;
      state.sunLight.color.setHex(0xfffaed);
      state.sunLight.intensity = 3.2;
      state.sunLight.position.set(0, 45, 0);
      if (state.sunMesh) {
        state.sunMesh.material.color.setHex(0xfcd34d);
        state.sunMesh.visible = true;
      }
      if (state.sunGlow) state.sunGlow.visible = true;
    } else if (preset === 'dawn') {
      // Rose-Gold Nile Dawn
      state.scene.fog.color.setHex(0xfceede);
      state.ambientLight.color.setHex(0xffedd5);
      state.ambientLight.intensity = 1.3;
      state.sunLight.color.setHex(0xfb923c);
      state.sunLight.intensity = 2.4;
      state.sunLight.position.set(-25, 18, -25);
      if (state.sunMesh) {
        state.sunMesh.material.color.setHex(0xf97316);
        state.sunMesh.visible = true;
      }
      if (state.sunGlow) state.sunGlow.visible = true;
    }
  };

  const hotspots = [
    {
      id: 'khufu',
      title: 'The Great Pyramid of Khufu',
      badge: 'Wonder of the World',
      left: '46%',
      top: '46%',
      desc: 'The only surviving wonder of the ancient world. Built with 2.3 million stone blocks, aligned precisely with true north.',
      altitude: '146.6m Original Height'
    },
    {
      id: 'khafre',
      title: 'Khafre & The Royal Mortuary',
      badge: 'Original Casing Stones',
      left: '68%',
      top: '52%',
      desc: 'Retaining its original polished limestone casing at the crown, guarded by the Great Sphinx.',
      altitude: '136.4m Height'
    },
    {
      id: 'oasis',
      title: 'Nile Palm & Desert Oasis',
      badge: 'Traverse Signature Camp',
      left: '26%',
      top: '68%',
      desc: 'Private sunset hospitality camp with chilled hibiscus karkadeh, fresh dates, and traditional oud music.',
      altitude: 'Exclusive Access'
    }
  ];

  return (
    <div className="relative w-full h-[90vh] min-h-[640px] max-h-[920px] overflow-hidden select-none bg-gradient-to-b from-[#e8f3fa] via-[#f7f3eb] to-[#fbf9f5]">
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        title="Click and drag to explore the 3D Giza Plateau & Saharan Dunes"
      />

      {/* Gentle Light Theme Gradients for Seamless Blending */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#fbf9f5] via-transparent to-white/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/70 via-transparent to-white/30" />

      {/* Floating 3D Hotspot Pins */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          style={{ left: spot.left, top: spot.top }}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative group">
            <button
              onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              aria-label={spot.title}
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/40 hover:scale-110 transition-transform focus:outline-none"
            >
              <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
              <Eye className="w-4 h-4 relative z-10 text-slate-950" />
            </button>

            {/* Hotspot Card Popover (Light Theme) */}
            {activeHotspot === spot.id && (
              <div className="absolute left-10 -top-12 w-72 p-4 rounded-xl bg-white/95 border border-amber-400/50 text-slate-800 shadow-2xl z-30 animate-fadeIn backdrop-blur-md">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    {spot.badge}
                  </span>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-xs text-slate-400 hover:text-slate-800"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="font-display font-bold text-sm text-[#05233e]">{spot.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{spot.desc}</p>
                <div className="mt-2.5 pt-2 border-t border-amber-200 flex items-center justify-between text-[11px]">
                  <span className="text-amber-700 font-bold">{spot.altitude}</span>
                  <button 
                    onClick={onExploreClick}
                    className="text-sky-600 hover:text-sky-800 font-bold underline underline-offset-2"
                  >
                    View Expeditions →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Floating 3D Controls Bar (Top Right) */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <div className="flex items-center p-1 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md shadow-lg">
          <button
            onClick={() => applyPreset('sunset')}
            title="Golden Sunset (Traverse Logo Palette)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activePreset === 'sunset'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-600 hover:text-amber-600'
            }`}
          >
            <Sunrise className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Golden Hour</span>
          </button>
          <button
            onClick={() => applyPreset('noon')}
            title="Bright Oasis Noon"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activePreset === 'noon'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Oasis Noon</span>
          </button>
          <button
            onClick={() => applyPreset('dawn')}
            title="Rose-Gold Nile Dawn"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activePreset === 'dawn'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-orange-600'
            }`}
          >
            <Sunset className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nile Dawn</span>
          </button>
        </div>

        {/* Ambient Desert Audio Toggle */}
        <button
          onClick={toggleSound}
          title={isAudioPlaying ? "Mute Desert Ambience" : "Play Desert Breeze & Oud Ambience"}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-md transition-all shadow-lg text-xs font-semibold ${
            isAudioPlaying
              ? 'bg-amber-100 border-amber-400 text-amber-800 shadow-amber-500/20'
              : 'bg-white/90 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-amber-400'
          }`}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline text-amber-900 font-bold">Sound: Active</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Desert Sound</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Superimposed Content (Light Theme Typography) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-amber-400/50 backdrop-blur-md text-amber-800 text-xs font-bold tracking-wide uppercase mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Curated Journeys • Ministry of Tourism Certified</span>
          </div>

          {/* Majestic Hero Headline in Rich Egyptian Navy */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#05233e] leading-[1.12] mb-4">
            Traverse Egypt <br />
            <span className="text-gold-gradient">Beyond the Horizon</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-xl">
            Immerse yourself in timeless Pharaonic heritage, silent wind-powered Nile Dahabiya cruises, and private desert starlight camps designed for discerning explorers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Explore Curated Journeys</span>
              <span className="text-lg">→</span>
            </button>

            <button
              onClick={onCustomPlanClick}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#05233e] font-bold text-sm border border-slate-200 hover:border-sky-500 shadow-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Tailor-Made Expedition</span>
            </button>
          </div>

          {/* Interactive 3D Hint */}
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Interactive 3D Plateau: Drag to rotate view • Click golden pins to inspect monuments</span>
          </div>

        </div>
      </div>
    </div>
  );
}
