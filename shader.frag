#version 300 es
precision highp float;

in vec2 vTexCoord;
uniform sampler2D uTexture;
uniform float uWidth;
uniform float uHeight;

out vec4 outColor;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec4 downSample(float intensity){
    vec2 onePixel = vec2(1.0, 1.0) / vec2(uWidth, uHeight) * intensity;
    vec4 colorSum =
        texture(uTexture, vTexCoord) +
        texture(uTexture, vTexCoord + vec2(onePixel.x, 0.0)) +
        texture(uTexture, vTexCoord + vec2(0.0, onePixel.y)) +
        texture(uTexture, vTexCoord + onePixel);
    vec4 color = colorSum / 4.0;
    return color;
}

float grayScale(vec4 color){
    return dot(color.rgb, vec3(0.21, 0.72, 0.07));
}

void main(){
    vec4 color = downSample(1.0);
    // color = texture(uTexture, vTexCoord);
    float grayScaleValue = grayScale(color);
    grayScaleValue += rand(vTexCoord) * 0.25;
    if(grayScaleValue > 0.9){
        color.xyz = vec3(1.0, 0.4, 0.4);
    } else if(grayScaleValue > 0.7){
        color.xyz = vec3(0.4, 0.4, 0.7);
    } else if (grayScaleValue > 0.5){
        color.xyz = vec3(0.3, 0.1, 0.4);
    } else if (grayScaleValue > 0.1){
        color.xyz = vec3(0.1, 0.0, 0.0);
    } else{
        color.xyz = vec3(0.0, 0.0, 0.0);
    }
    outColor = color;
}