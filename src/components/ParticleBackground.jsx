import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ParticleBackground.css';

export default function ParticleBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    mount.appendChild(renderer.domElement);

    // Particles
    const PARTICLE_COUNT = 120;
    const positions = [];
    const velocities = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 40
      );
      velocities.push(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.01
      );
    }

    const geo = new THREE.BufferGeometry();
    const posArray = new Float32Array(positions);
    geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xbbbbbb,
      size: 0.7,
      transparent: true,
      opacity: 0.7,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.35 });
    let linesMesh = null;

    const updateLines = () => {
      if (linesMesh) scene.remove(linesMesh);
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = [];
      const pos = geo.attributes.position.array;
      const THRESHOLD = 22;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < THRESHOLD) {
            linePositions.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
            linePositions.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
          }
        }
      }
      lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      linesMesh = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(linesMesh);
    };

    // Mouse
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let frame;
    let frameCount = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const pos = geo.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];
        if (Math.abs(pos[i * 3]) > 70) velocities[i * 3] *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 45) velocities[i * 3 + 1] *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 20) velocities[i * 3 + 2] *= -1;
      }
      geo.attributes.position.needsUpdate = true;
      frameCount++;
      if (frameCount % 3 === 0) updateLines();
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="particle-bg" ref={mountRef}></div>;
}
