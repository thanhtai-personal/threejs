declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher, MOUSE, Object3D, TOUCH, Vector3 } from "three";

  export class OrbitControls extends EventDispatcher {
    constructor(camera: Camera, domElement: HTMLElement);

    object: Camera;
    domElement: HTMLElement;

    // API
    enabled: boolean;
    target: Vector3;

    // Controls
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;

    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;

    screenSpacePanning: boolean;
    keyPanSpeed: number;

    autoRotate: boolean;
    autoRotateSpeed: number;

    enableDamping: boolean;
    dampingFactor: number;

    enableZoom: boolean;
    enableRotate: boolean;
    enablePan: boolean;

    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
    touches: { ONE: TOUCH; TWO: TOUCH };

    saveState(): void;
    reset(): void;

    update(): void;
  }
}

declare module "three/examples/jsm/controls/TransformControls" {
  import { Camera, Object3D } from "three";
  import { EventDispatcher } from "three";

  export class TransformControls extends EventDispatcher {
    constructor(camera: Camera, domElement: HTMLElement);

    object: Object3D | null;
    enabled: boolean;
    size: number;
    space: string;

    attach(object: Object3D): this;
    detach(): this;

    updateMatrixWorld(force?: boolean): void;
  }
}

declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { Loader, LoadingManager, Group } from "three";

  export interface GLTF {
    animations: any[];
    scene: Group;
    scenes: Group[];
    cameras: any[];
    asset: object;
  }

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);

    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;

    parse(
      data: ArrayBuffer | string,
      path: string,
      onLoad: (gltf: GLTF) => void
    ): void;

    setDRACOLoader(dracoLoader: any): this;
  }
}

declare module "three/examples/jsm/loaders/DRACOLoader" {
  import { Loader, LoadingManager } from "three";

  export class DRACOLoader extends Loader {
    constructor(manager?: LoadingManager);

    setDecoderPath(path: string): this;
    setDecoderConfig(config: object): this;
    setWorkerLimit(workerLimit: number): this;
  }
}

declare module "three/examples/jsm/animation/CCDIKSolver" {
  import { SkinnedMesh } from "three";

  export class CCDIKSolver {
    constructor(mesh: SkinnedMesh, iks: object[]);

    update(): void;
  }

  export class CCDIKHelper {
    constructor(mesh: SkinnedMesh, iks: object[], sphereSize?: number);
  }
}
