import setup from './setUp.es6';
import Slider from './Mesh.es6';
export default class Controller {
  constructor() {
    this.setup = new setup();
    this.loader = new THREE.TextureLoader();
    this.textures = [];
    this.sliders = [];
    this.init();

  }

  init(){
    const $imgs = $('.imgs');
    const promises = [];
    $imgs.find('img').each((i,e)=>{
      const p = this.load($(e).attr('src'));
      promises.push(p);
    })
    Promise.all(promises).then(e=>{
      this.textures = e;
      this.meshload();

      this.show();
    })
  }

  load(path){
    return new Promise((resolve, reject)=> {
      this.loader.load(path,e=>{
        e.magFilter = THREE.NearestFilter;
        e.minFilter = THREE.NearestFilter;
        resolve(e);
      })
    });
  }

  meshload(){

    // for (var i = 0; i < this.textures.length; i++) {
    //   const s = new Slider(this.textures[i],i);
    //   this.sliders.push(s);
    //   this.setup.addObjtoScene(s.mesh);
    // }
    const g = new THREE.Group();
    for (var i = 0; i < 6; i++) {
      const s = new Slider(this.textures[i],i,g,this.setup);
      this.sliders.push(s);
    }
    this.setup.addObjtoScene(g);
    console.log(Math.cos(Math.PI/12));
    const r = window.innerWidth/5
    const len = 3 * r / Math.sqrt(3);
    const h = len * Math.sqrt(3)/2 ;
    // g.position.x = -len/2
    // g.position.y = Math.sqrt(3)*len /6;
    g.rotation.set(0,0,-Math.PI/6);

  }

  show(){
    console.log('show');
    const tl = new TimelineMax();
    this.sliders.forEach((e,i)=>{
      e.show(-60*i);

    })
  }
}
