// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  float offset = 0.01;
  vec4 diffuseColor = texture2D(my_texture, vertTexCoord.xy);
  vec4 currentIntensity = diffuseColor / 3;

  // colors of neighboring pixels
  vec4 top = texture2D(my_texture, vec2(vertTexCoord.x, vertTexCoord.y + offset));
  vec4 left = texture2D(my_texture, vec2(vertTexCoord.x - offset, vertTexCoord.y));
  vec4 right = texture2D(my_texture, vec2(vertTexCoord.x + offset, vertTexCoord.y));
  vec4 bottom = texture2D(my_texture, vec2(vertTexCoord.x, vertTexCoord.y - offset));

  vec4 neighborIntensity = (top / 3) + (left / 3) + (right / 3) + (bottom / 3);
  vec4 laplacian = neighborIntensity - (4 * currentIntensity);
  laplacian = laplacian * 1.8; // scale up laplacian for higher contrast
  laplacian = laplacian + vec4(0.498, 0.498, 0.498, 1.0); // add middle gray

  float diffuse = clamp(dot(vertNormal, vertLightDir), 0.0, 1.0);
  gl_FragColor = vec4(diffuse * laplacian.rgb, 1.0);
}
