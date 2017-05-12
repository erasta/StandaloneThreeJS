var container, scene, camera, renderer, controls;
var gui, guiParams;

function initGraphics() {
    THREE.Object3D.DefaultUp.set(0, 0, 1);

    // SCENE
    scene = new THREE.Scene();
    container = document.getElementById('ThreeJS');

    // RENDERER
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
        renderer = new THREE.CanvasRenderer();
    }

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setFaceCulling(0);

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // CAMERA
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, 5, -30);
    camera.up.set(0.0, 1.0, 0.0);
    scene.add(camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    THREEx.WindowResize(renderer, camera);

    // Background clear color
    renderer.setClearColor(0xffffff, 1);
    renderer.clear();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222222));
    scene.add(new THREE.GridHelper(50, 50));
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function initGui() {
    gui = new dat.GUI({ autoPlace: true, width: 500 });
    guiParams = new(function() {
        this.nodesPerDimension = 5;
    })();
    gui.add(guiParams, 'nodesPerDimension').min(2).max(16).step(1).onFinishChange(function() {});
}

// code entry point
initGui();
initGraphics();
animate();
