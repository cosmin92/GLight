const cameraUniforms = "\n" +
    "uniform mat4 viewMatrix;\n" +
    "uniform mat4 projectionMatrix;\n" +
    "uniform mat4 modelMatrix;\n" +
    "\n";

export function PhongDirectionalLightUniforms(n: number): string {
    return "\n" +
        "uniform vec4 DLightsAmbient[" + n + "];\n" +
        "uniform vec4 DLightsDiffuse[" + n + "]\n" +
        "uniform vec4 DLightsSpecular[" + n + "];\n";
}

export function LambertDirectionalLightUniforms(n: number): string {
    return "uniform vec4 DLightsDiffuse[" + n + "];\n";
}

export function PhongPointLightUniforms(n: number): string {
    return "\n" +
        "uniform vec4 PLightsAmbient[" + n + "];\n" +
        "uniform vec4 PLightsDiffuse[" + n + "];\n" +
        "uniform vec4 PLightsSpecular[" + n + "];\n";
}

export function LambertPointLightUniforms(n: number): string {
    return "uniform vec4 PLightsDiffuse[" + n + "];\n";
}

export function lightDirections(n: number): string {
    return "uniform vec3 DLightsDirection[" + n + "];\n";
}

export function lightPositions(n: number): string {
    return "uniform vec3 PLightsPosition[" + n + "];\n";
}

export {cameraUniforms};