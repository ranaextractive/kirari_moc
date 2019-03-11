export const vert = `
varying vec2 vUv;
attribute float aPos;
// varying vec2 screenPos;
uniform float scale;
void main(void) {
  vUv = uv;
  vec3 p = position;
  // p.y = aPos;
  vec4 projected = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  gl_Position = projected;

  // screenPos = projected.xy / projected.w;;
}
`

export const frag = `
uniform vec2 resolution;
uniform vec2 imageResolution;
uniform sampler2D texture;
uniform float angle;
uniform float opacity;
varying vec2 vUv;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
void main(void) {
  vec2 ratio = vec2(
    min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
    min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  // vec2 st = rotate2d(angle)*uv;
  vec4 map = texture2D(texture, uv);
  map.a = opacity;
  gl_FragColor = map;

}
` ;
