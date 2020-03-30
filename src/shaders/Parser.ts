import Program from "./Program";
import Geometry from "../geometries/Geometry";
import Material from "../materials/Material";
import LightsManager from "../lights/LightsManager";
import {
    cameraUniforms,
    LambertDirectionalLightUniforms,
    LambertPointLightUniforms,
    lightDirections,
    lightPositions
} from "./chuncks";
import {LAMBERT_MATERIAL} from "../Constants";

export default class Parser {

    public static createProgram(geometry: Geometry, material: Material, lights?: LightsManager): Program {
        let vertexSource = "";
        let fragmentSource = "";

        if (material.type === LAMBERT_MATERIAL) {
            vertexSource = Parser._parseLambertVertexShader(geometry, material, lights);
            fragmentSource = Parser._parseLambertFragmentShader(geometry, material, lights);
        } else {
            vertexSource = Parser._parsePhongVertexShader(geometry, material, lights);
            fragmentSource = Parser._parsePhongFragmentShader(geometry, material, lights);
        }

        return new Program(vertexSource, fragmentSource);
    }

    private static _parseLambertVertexShader(geometry: Geometry, material: Material, lights?: LightsManager) {
        let source = "attribute vec3 vertexPosition;\n";
        source += cameraUniforms;
        source += "\nuniform vec4 materialDiffuse;\n";

        if (lights && geometry.normalBuffer != null && (lights.isPointLights || lights.isDirectionaLights)) {
            source += "attribute vec3 vertexNormal;\n";
            source += "uniform mat4 normalMatrix;\n\n";

            if (lights.isDirectionaLights) {
                source += lightDirections(lights.directionalLights.length);
                source += LambertDirectionalLightUniforms(lights.directionalLights.length);
            }

            if (lights.isPointLights) {
                source += lightPositions(lights.pointLights.length);
                source += LambertPointLightUniforms(lights.pointLights.length);
            }
        }

        if (geometry.uvBuffer != null && material.texture !== null) {
            source += "attribute vec2 vertexUV;\n";
            source += "varying vec2 uv;\n";
        }

        if (geometry.colorBuffer !== null) {
            source += "attribute vec4 vertexColor;\n";
        }

        source += "varying vec4 color;\n";
        //===== MAIN ===============

        source += "void main(void){\n";
        if (geometry.uvBuffer != null && material.texture !== null) {
            source += "uv = vertexUV;\n";
        }
        if (lights && (lights.isPointLights || lights.isDirectionaLights) && geometry.normalBuffer != null) {
            source += "\tmat4 modelViewMatrix = viewMatrix * modelMatrix;\n";
            source += "\n\tvec3 N = vec3(normalMatrix * vec4(vertexNormal, 1.0));\n";
            source += "\tvec4 Id = vec4(0,0,0,0);\n";

            if (lights.isDirectionaLights) {
                source += "\tfor(int i=0; i < " + lights.directionalLights.length + "; i++){\n";
                source += "\t\tvec3 L = normalize(DLightsDirection[i]);\n";
                source += "\t\tfloat lambertTerm = dot(N, -L);\n";
                source += "\t\tId += materialDiffuse * DLightsDiffuse[i] * lambertTerm;\n\t}\n\n";
            }

            if (lights.isPointLights) {
                source += "\tvec4 position = (modelViewMatrix * vec4(vertexPosition, 1.0));\n";
                source += "\tfor(int i=0; i < " + lights.pointLights.length + "; i++){\n";
                source += "\t\tvec3 L = normalize(position.xyz - PLightsPosition[i]);\n";
                source += "\t\tfloat lambertTerm1 = dot(N, -L);\n";
                source += "\t\tId += materialDiffuse * PLightsDiffuse[i] * lambertTerm1;\n\t}\n\n";
            }
            source += "\tgl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);\n";
            source += "\tcolor = vec4(Id.xyz, 1.0);\n";
        } else {
            source += "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix  * vec4(vertexPosition, 1);\n";
            source += "\tcolor = materialDiffuse;\n";
        }

        source += "}";

        return source;
    }

    private static _parseLambertFragmentShader(geometry: Geometry, material: Material, lights?: LightsManager) {
        let source = "precision mediump float;\n";

        source += "varying vec4 color;\n\n";

        if (geometry.uvBuffer != null && material.texture !== null) {
            source += "varying vec2 uv;\n";
            source += "uniform sampler2D texture;\n";
        }

        //===== MAIN ===============
        source += "void main(void){\n" +
            "\tvec4 finalColor = color;\n";

        if (geometry.uvBuffer != null && material.texture !== null) {
            source += "\tfinalColor = texture2D(texture, uv);\n";
        }

        source += "\t\ngl_FragColor = finalColor;" +
            "}";
        return source;
    }

    private static _parsePhongVertexShader(geometry: Geometry, material: Material, lights?: LightsManager) {
        let source = "attribute vec3 vertexPosition;\n";
        source += cameraUniforms;
        source += "\nuniform vec4 materialDiffuse;\n";

        if (lights && geometry.normalBuffer != null && (lights.isPointLights || lights.isDirectionaLights)) {
            source += "attribute vec3 vertexNormal;\n";
            source += "uniform mat4 normalMatrix;\n\n";

            if (lights.isDirectionaLights) {
                source += lightDirections(lights.directionalLights.length);
                source += LambertDirectionalLightUniforms(lights.directionalLights.length);
            }

            if (lights.isPointLights) {
                source += lightPositions(lights.pointLights.length);
                source += LambertPointLightUniforms(lights.pointLights.length);
            }
        }

        if (geometry.uvBuffer != null) {
            source += "attribute vec3 vertexUV;\n";
        }

        if (geometry.colorBuffer !== null) {
            source += "attribute vec4 vertexColor;\n";
        }

        source += "varying vec4 color;\n";
        //===== MAIN ===============

        source += "void main(void){\n";
        if (lights && (lights.isPointLights || lights.isDirectionaLights) && geometry.normalBuffer != null) {
            source += "\tmat4 modelViewMatrix = viewMatrix * modelMatrix;\n";
            source += "\n\tvec3 N = vec3(normalMatrix * vec4(vertexNormal, 1.0));\n";
            source += "\tvec4 Id = vec4(0,0,0,0);\n";

            if (lights.isDirectionaLights) {
                source += "\tfor(int i=0; i < " + lights.directionalLights.length + "; i++){\n";
                source += "\t\tvec3 L = normalize(DLightsDirection[i]);\n";
                source += "\t\tfloat lambertTerm = dot(N, -L);\n";
                source += "\t\tId += materialDiffuse * DLightsDiffuse[i] * lambertTerm;\n\t}\n\n";
            }

            if (lights.isPointLights) {
                source += "\tvec4 position = (modelViewMatrix * vec4(vertexPosition, 1.0));\n";
                source += "\tfor(int i=0; i < " + lights.pointLights.length + "; i++){\n";
                source += "\t\tvec3 L = normalize(position.xyz - PLightsPosition[i]);\n";
                source += "\t\tfloat lambertTerm1 = dot(N, -L);\n";
                source += "\t\tId += materialDiffuse * PLightsDiffuse[i] * lambertTerm1;\n\t}\n\n";
            }
            source += "\tgl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);\n";
            source += "\tcolor = vec4(Id.xyz, 1.0);\n";
        } else {
            source += "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix  * vec4(vertexPosition, 1);\n";
            source += "\tcolor = materialDiffuse;\n";
        }

        source += "}";

        //console.log(source);
        return source;
    }

    private static _parsePhongFragmentShader(geometry: Geometry, material: Material, lights?: LightsManager) {
        let source = "precision mediump float;\n";

        source += "varying vec4 color;\n\n";
        //===== MAIN ===============
        source += "void main(void){\n" +
            "\t\ngl_FragColor = color;" +
            "}";
        return source;
    }

}