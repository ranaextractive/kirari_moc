
import * as Shader from './Shader/shader.es6';
export default class MeshController {
  constructor(t,i,g) {
    this.texture = t;
    this.imgw = t.image.naturalWidth;
    this.imgh = t.image.naturalHeight;
    this.index = i;
    this.r = 0;
    this.radius = window.innerWidth/7;
    this.group = g;
    this.setMesh();
  }

  setMesh(){
    const geo = new THREE.CircleGeometry(this.radius,0);
    const len = 3 * this.radius / Math.sqrt(3);
    const h = len * Math.sqrt(3)/2 ;
    const uniform = {
      'texture':{
        type:'t',
        value:this.texture
      },
      'imageResolution':{
        type:'v2',
        value:new THREE.Vector2(this.imgw,this.imgh)
      },
      'resolution':{
        type:'v2',
        value:new THREE.Vector2(len,h)
      },
      'angle':{
        type:'f',
        value:this.rad(60) * this.index
      },
      'opacity':{
        type:'f',
        value:0
      }
    }
    const mate = new THREE.ShaderMaterial({
      uniforms:uniform,
      vertexShader:Shader.vert,
      fragmentShader:Shader.frag,
      depthTest: true,
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(geo, mate);
    //中心に移動
    this.mesh.position.x = -this.radius;
    const rad = 0*this.index;
    const v = this.mesh.geometry.vertices;
    //軸
    const o = v[1];

    //
    const v0 = v[0].sub(o);
    const v1 = v[2].sub(o);
    const v3 = v[3].sub(o);
    const v4 = v[4].sub(o);
    this.mesh.geometry.vertices[0] = this.rotation(this.rad(rad),v0,o);
    this.mesh.geometry.vertices[2] = this.rotation(this.rad(rad),v1,o);
    this.mesh.geometry.vertices[3] = this.rotation(this.rad(rad),v3,o);
    this.mesh.geometry.vertices[4] = this.rotation(this.rad(rad),v4,o);
    this.mesh.material.opacity = 0;
    this.group.add(this.mesh);


  }

  rad(r){
    return (r/180)*Math.PI;
  }


  rotation(rad,v1,v0){
    return new THREE.Vector3(
      v1.x*Math.cos(rad) - v1.y*Math.sin(rad) + v0.x,
      v1.x*Math.sin(rad) + v1.y*Math.cos(rad) + v0.y,
      0
    )
  }

  show(ir){
    const tl = new TimelineMax();
    console.log("show");
    const crad = {
      r:this.r,
      theta:Math.PI*2
    }
    tl.to(this.mesh.material.uniforms.opacity,1,{
      value:1,
      ease: Circ.easeInOut
    },0)
    .to(crad,1,{
      r:ir,
      ease: Power2.easeIn,
      onUpdate:e=>{
        const geo = new THREE.CircleGeometry(this.radius,0);
        this.r = crad.r;
        const rad = crad.r;
        const v = geo.vertices;
        //軸
        const o = v[1];

        //
        const v0 = v[0].sub(o);
        const v1 = v[2].sub(o);
        const v3 = v[3].sub(o);
        const v4 = v[4].sub(o);
        geo.vertices[0] = this.rotation(this.rad(rad),v0,o);
        geo.vertices[2] = this.rotation(this.rad(rad),v1,o);
        geo.vertices[3] = this.rotation(this.rad(rad),v3,o);
        geo.vertices[4] = this.rotation(this.rad(rad),v4,o);
        this.mesh.geometry = geo;
      }
    })
    .to(crad,1,{
      r:-360,
      ease: Power2.easeIn,
      onUpdate:e=>{
        const geo = new THREE.CircleGeometry(this.radius,0);
        this.r = crad.r;
        const rad = crad.r;
        const v = geo.vertices;
        //軸
        const o = v[1];

        //
        const v0 = v[0].sub(o);
        const v1 = v[2].sub(o);
        const v3 = v[3].sub(o);
        const v4 = v[4].sub(o);
        geo.vertices[0] = this.rotation(this.rad(rad),v0,o);
        geo.vertices[2] = this.rotation(this.rad(rad),v1,o);
        geo.vertices[3] = this.rotation(this.rad(rad),v3,o);
        geo.vertices[4] = this.rotation(this.rad(rad),v4,o);
        this.mesh.geometry = geo;
      }
    },4)
    // .to(this.mesh.position,1,{
    //   x:-this.radius + window.innerWidth/2,
    //   ease: Circ.easeInOut
    // },5)

    // console.log(this.mesh.material.uniforms.opacity);
  }







}
