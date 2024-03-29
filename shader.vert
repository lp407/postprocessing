#version 300 es
precision highp float;

in vec3 aPosition;
in vec2 aTexCoord;

out vec2 vTexCoord;

void main(){
    vTexCoord = aTexCoord;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    positionVec4.y = -positionVec4.y;
    gl_Position = positionVec4;
}