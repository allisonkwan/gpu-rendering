// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER
#define PI 3.1415926535897932384626433832795

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

float sq(float num) {
    return num * num;
}

void main() { 
    vec2 coordinate = vec2(vertTexCoord.xy);
    vec2 mainCircle = vec2(0.5, 0.5);
    float mainCircleRad = 0.35;

    vec2 newCirc = vec2(0.5, 0.5);
    float radius = 0.055;
    float transform = 0.28; // distance from small circle's center to main circle's center
    float theta = PI;

    if (sq(coordinate.x - (mainCircle.x)) + sq(coordinate.y - (mainCircle.y)) > sq(mainCircleRad)) { // outside of main circle
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0); // transparent
    } else { // shade it teal
        gl_FragColor = vec4(0.0, 1.0, 2.0, 1.0);
    }

    while (radius > 0.0) {
        
        newCirc = vec2((transform * cos(theta)) + 0.5, (transform * sin(theta)) + 0.5);

        if (sq(coordinate.x - (newCirc.x)) + sq(coordinate.y - (newCirc.y)) < sq(radius)) { // inside spiral circles
            gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0); // transparent
        } 

        theta = theta + (PI / 6);
        radius = radius - 0.0017;
        transform = transform - 0.0095;
    }

}

