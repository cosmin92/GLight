import Object3D from "./Object3D";
import Parser from "../shaders/Parser";
import { getWebGL } from "./GL";
import Matrix4 from "../math/Matrix4";
import { DIRECTIONAL_LIGHT, PHONG_MATERIAL, POINT_LIGHT } from "../Constants";
/**
 * Class representing entities that can be seen in the scene
 */
export default class Renderable extends Object3D {
    constructor(name, type, geometry, material) {
        super(name, type);
        /**
         * Reference to WebGL API
         *
         * @type {WebGLRenderingContext}
         * @protected
         */
        this._gl = getWebGL();
        /**
         * Reference to the object geometry
         *
         * @type{Geometry}
         * @protected
         */
        this._geometry = geometry;
        /**
         * Reference to the object geometry
         *
         * @type{Geometry}
         * @protected
         */
        this._material = material;
        material.renderable = this;
        /**
         * Reference to the instance of shader program used to render this instance of renderable
         *
         * @type {Program}
         * @protected
         */
        this._program = Parser.createProgram(geometry, material);
        /**
         * Temporary reference to the light manager
         *
         * @type {LightsManager}
         * @private
         */
        this._lights = null;
        /**
         * The drawing method
         *
         * @type {GLenum}
         * @private
         */
        this._drawingMode = this._gl.TRIANGLES;
    }
    /**
     * Render the the mesh
     * @param {Camera} camera
     * @param {Light} lights
     */
    render(camera, lights) {
        if (this._hidden)
            return;
        this._program.use();
        this._setCameraUniforms(camera);
        this._gl.uniformMatrix4fv(this._program.modelMatrix, false, this.transformationMatrix.getFloat32Array());
        if (this._type !== POINT_LIGHT && this._type !== DIRECTIONAL_LIGHT) {
            this._setLightsUniforms(lights);
        }
        this._setMaterialUniforms();
        this._setTextures();
        this._geometry.draw(this._drawingMode, this._program);
    }
    /**
     * Send camera data to the GPU uniform locations
     *
     * @param {Camera} camera
     * @private
     */
    _setCameraUniforms(camera) {
        this._gl.uniformMatrix4fv(this._program.viewMatrix, false, camera.viewMatrix.getFloat32Array());
        this._gl.uniformMatrix4fv(this._program.projectionMatrix, false, camera.projectionMatrix.getFloat32Array());
        if (this._program.normalMatrix != null) {
            let normalMatrix = new Matrix4();
            Matrix4.multiply(normalMatrix, camera.viewMatrix, this._modelMatrix);
            this._gl.uniformMatrix4fv(this._program.normalMatrix, false, normalMatrix.transpose().getFloat32Array());
        }
    }
    /**
     * Send lights data to the GPU uniform locations
     *
     * @param {LightsManager} lights
     * @private
     */
    _setLightsUniforms(lights) {
        if (!lights)
            return;
        let dLights = lights.directionalLights;
        for (let i = 0; i < dLights.length; i++) {
            this._gl.uniform3fv(this._program.getUniformLocation("DLightsDirection[" + i + "]"), dLights[i].translate.getFloat32Array());
            this._gl.uniform4fv(this._program.getUniformLocation("DLightsAmbient[" + i + "]"), dLights[i].ambientColor.multiplyScalar(dLights[i].ambientIntensity).clone().normalize().getFloat32Array());
            this._gl.uniform4fv(this._program.getUniformLocation("DLightsDiffuse[" + i + "]"), dLights[i].diffuseColor.multiplyScalar(dLights[i].diffuseIntensity).clone().normalize().getFloat32Array());
            this._gl.uniform4fv(this._program.getUniformLocation("DLightsSpecular[" + i + "]"), dLights[i].specularColor.multiplyScalar(dLights[i].specularIntensity).clone().normalize().getFloat32Array());
        }
        let pLights = lights.pointLights;
        for (let i = 0; i < pLights.length; i++) {
            this._gl.uniform3fv(this._program.getUniformLocation("PLightsPosition[" + i + "]"), pLights[i].translate.getFloat32Array());
            this._gl.uniform4fv(this._program.getUniformLocation("PLightsAmbient[" + i + "]"), pLights[i].ambientColor.multiplyScalar(pLights[i].ambientIntensity).clone().normalize().getFloat32Array());
            this._gl.uniform4fv(this._program.getUniformLocation("PLightsDiffuse[" + i + "]"), pLights[i].diffuseColor.multiplyScalar(pLights[i].diffuseIntensity).clone().normalize().getFloat32Array());
            this._gl.uniform4fv(this._program.getUniformLocation("PLightsSpecular[" + i + "]"), pLights[i].specularColor.multiplyScalar(pLights[i].specularIntensity).clone().normalize().getFloat32Array());
        }
    }
    /**
     * Sets the material uniform in the GPU
     *
     * @private
     */
    _setMaterialUniforms() {
        if (this._material.type === PHONG_MATERIAL) {
            let m = this._material;
            this._gl.uniform4fv(this._program.materialAmbient, m.ambientColor.multiplyScalar(m.ambientIntensity).clone().normalize().getFloat32Array());
            this._gl.uniform4fv(this._program.materialSpecular, m.specularColor.multiplyScalar(m.specularIntensity).clone().normalize().getFloat32Array());
            this._gl.uniform1i(this._program.materialShininess, m.shininess);
        }
        this._gl.uniform4fv(this._program.materialDiffuse, this._material.diffuseColor.multiplyScalar(this._material.diffuseIntensity).clone().normalize().getFloat32Array());
    }
    _setTextures() {
        if (this._material.texture !== null && this._program.texture !== null) {
            console.log("BOUND");
            this._material.texture.use(this._program.texture);
        }
    }
    /**
     * Create a new shader program with base ion the new lights in the scene
     *
     * @param {LightsManager} lights
     */
    processShader(lights) {
        if (lights) {
            this._lights = lights;
        }
        if (this._lights !== null) {
            this._program = Parser.createProgram(this._geometry, this._material, this._lights);
        }
        else {
            this._program = Parser.createProgram(this._geometry, this._material);
        }
    }
    /**
     * Function used for offscreen rendering. Useful for pinking method
     *
     * @param {Camera} camera
     * @param {Program} program
     */
    offScreenRender(camera, program) {
        this._gl.uniformMatrix4fv(program.viewMatrix, false, camera.viewMatrix.getFloat32Array());
        this._gl.uniformMatrix4fv(program.projectionMatrix, false, camera.projectionMatrix.getFloat32Array());
        this._gl.uniformMatrix4fv(program.modelMatrix, false, this.transformationMatrix.getFloat32Array());
        this._gl.uniform4fv(program.materialDiffuse, this._pickColor.clone().normalize().getFloat32Array());
        this._geometry.draw(this._drawingMode, program);
    }
    /**
     * Gets the drawing mode
     *
     * @return {GLenum}
     */
    get drawingMode() {
        return this._drawingMode;
    }
    /**
     * Sets the drawing mode
     *
     * @param {GLenum} value
     */
    set drawingMode(value) {
        this._drawingMode = value;
    }
}
