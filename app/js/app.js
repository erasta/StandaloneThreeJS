var gui, guiParams;
var mesh;

function initApp() {
    var material = new THREE.MeshStandardMaterial({ color: 'red' });
    mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
    mesh.position.set(0, 0, 3);
    manager.scene.add(mesh);
    applyGuiChanges();
}

function applyGuiChanges() {
    // console.log(guiParams.ballSize);
    mesh.scale.set(guiParams.ballSize, guiParams.ballSize, guiParams.ballSize);
}

function initGui() {
    gui = new dat.GUI({ autoPlace: true, width: 500 });
    guiParams = new(function() {
        this.ballSize = 3;
    })();
    gui.add(guiParams, 'ballSize').name('Ball size').min(0.1).max(16).step(0.01).onChange(applyGuiChanges);
}

// code entry point
initGui();
let manager = new SceneManager();
initApp();
manager.animate();
