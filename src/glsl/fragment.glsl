uniform vec3 diffuse;

#include <common>
#include <clipping_planes_pars_fragment>

void main() {
  vec4 diffuseColor = vec4( diffuse, 1.0 );

  #include <clipping_planes_fragment>

  gl_FragColor = diffuseColor;

  #include <colorspace_fragment>
}
