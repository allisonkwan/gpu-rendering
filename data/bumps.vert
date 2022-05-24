// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

// The shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER
#define PI 3.1415926535897932384626433832795

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
//attribute vec4 position;
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

void main() {
  vertColor = color;
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

  vec4 textureColor = texture2D(texture, vec2(vertTexCoord.x, vertTexCoord.y));
  vec4 intensity = vertex + vec4(-100 * normal * (0.3 * textureColor.r + 0.6 * textureColor.g + 0.1 * textureColor.b), 0); // offset vertex in normal direction
  gl_Position = transform * intensity;
}