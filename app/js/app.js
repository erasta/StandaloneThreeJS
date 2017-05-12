var container, scene, camera, renderer, controls, stats;
var gui, guiParams;

function initApp() {
    var material = new THREE.MeshStandardMaterial({ color: 'red' });
    var mesh = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), material);
    mesh.position.set(0, 0, 3);
    scene.add(mesh);
}

function initGui() {
    gui = new dat.GUI({ autoPlace: true, width: 500 });
    guiParams = new(function() {
        this.number = 5;
    })();
    gui.add(guiParams, 'number').min(2).max(16).step(1).onFinishChange(function() {});
}

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

    // Stats of FPS
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.domElement);

    // CAMERA
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, -30, 5);
    // camera.up.set(0.0, 1.0, 0.0);
    scene.add(camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    THREEx.WindowResize(renderer, camera);

    // Background clear color
    renderer.setClearColor(0xffffff, 1);
    renderer.clear();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222222));
    var grid = new THREE.GridHelper(50, 50);
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);

    // Lights
    [
        [1, 1, 1],
        [-1, 1, 1],
        [1, -1, 1],
        [-1, -1, 1]
    ].forEach(function(pos) {
        var dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
        dirLight.position.set(pos[0] * 100, pos[1] * 100, pos[2] * 100);
        this.scene.add(dirLight);
    });
}

function animate() {
    stats.begin();
    // controls.update();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
}

// code entry point
initGui();
initGraphics();
initApp();
animate();
