export default class SetUp {
  constructor() {
    this.$slider = $('.canvas');

    this.$glContents = this.$slider;
    this.setSence();
    this.setCamera();

    this.setRender();
    this.render();

  }

  setRender(){
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.onWindowResize();
    this.$glContents.append(this.renderer.domElement);
  }

  setCamera(){
    this.camera = new THREE.PerspectiveCamera(
      45,this.$glContents.width() /this.$glContents.height(),1,20000
    );
    this.setCameraByPixel();

  }

  setCameraByPixel(){
    this.w = this.$glContents.width();
    this.h = this.$glContents.height();
    var fov = 45;
    var vFOV = fov * (Math.PI / 180);
    var vpHeight = this.h;
    var z = vpHeight / (2 * Math.tan(vFOV / 2) );
    this.z = z;
    this.camera.position.set(0, 0, z);
    this.camera.lookAt(new THREE.Vector3());

    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();
  }

  setSence(){
    this.sence = new THREE.Scene();
  }

  addObjtoScene(mesh){
    this.sence.add(mesh)
  }

  render(){
    this.renderer.render(this.sence,this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  onWindowResize(){
    const w = this.$glContents.width();
    const h = this.$glContents.height();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(w,h,true);
    this.setCameraByPixel();
    // this.render();
  }
}
