import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { CCDIKSolver, CCDIKHelper } from "three/examples/jsm/animation/CCDIKSolver";
import Stats from "stats.js";
import { GUI } from "lil-gui";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let orbitControls: OrbitControls, transformControls: TransformControls;
    let stats: Stats, gui: GUI;
    let IKSolver: CCDIKSolver;
    const OOI: Record<string, any> = {};
    const v0 = new THREE.Vector3();
      
    const updateIK = () => {
      IKSolver?.update?.();
    };

    const conf = {
      followSphere: false,
      turnHead: true,
      ik_solver: true,
      update: updateIK,
    };

    const init = async () => {

      // Scene Setup
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xffffff, 0.17);
      scene.background = new THREE.Color(0xffffff);

      // Camera
      camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.001, 5000);
      camera.position.set(0.97, 1.1, 0.73);
      camera.lookAt(scene.position);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 8);
      scene.add(ambientLight);

      // Load GLTF Model
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/path/to/draco/");
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);

      const gltf: any = await gltfLoader.loadAsync("/path/to/kira.glb");
      gltf.scene.traverse((node: any) => {
        if (node.name === "head") OOI.head = node;
        if (node.name === "hand_l") OOI.hand_l = node;
        if (node.name === "sphere") OOI.sphere = node;
      });
      scene.add(gltf.scene);

      // IK Solver
      const iks = [
        {
          target: 22,
          effector: 6,
          links: [{ index: 5 }, { index: 4 }],
        },
      ];
      IKSolver = new CCDIKSolver(OOI.kira, iks);
      scene.add(new CCDIKHelper(OOI.kira, iks) as any);

      // Stats
      stats = new Stats();
      document.body.appendChild(stats.dom);

      // GUI
      gui = new GUI();
      gui.add(conf, "followSphere").name("Follow Sphere");
      gui.add(conf, "turnHead").name("Turn Head");
      gui.add(conf, "ik_solver").name("IK Solver");
      gui.add(conf, "update").name("Update IK");

      // Orbit Controls
      orbitControls = new OrbitControls(camera, renderer.domElement);

      // Transform Controls
      transformControls = new TransformControls(camera, renderer.domElement);
      transformControls.attach(OOI.hand_l);
      scene.add(transformControls as any);

      animate();
      window.addEventListener("resize", onResize);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (conf.ik_solver) updateIK();
      stats.update();
      renderer.render(scene, camera);
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();

    return () => {
      renderer.dispose();
      gui?.destroy?.();
      stats?.dom?.remove?.();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeScene;
