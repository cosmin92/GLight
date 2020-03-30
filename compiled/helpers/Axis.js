import Program from "../shaders/Program";
import LineGeometry from "../geometries/LineGeometry";
import { getWebGL } from "../core/GL";
import { basicFragmentShader, basicVertexShader } from "../shaders/basicShaders";
export default class Axis {
    /**
     * Axis constructor
     *
     * @param size
     */
    constructor(size = 10) {
        /**
         * The size oof each axis
         *
         * @type {number}
         * @private
         */
        this._size = size;
        /**
         * If true axis x wil be rendered
         *
         * @type {boolean}
         * @private
         */
        this._showX = true;
        /**
         * If true axis y will be rendered
         *
         * @type {boolean}
         * @private
         */
        this._showY = false;
        /**
         * If true axis z will be rendered
         *
         * @type {boolean}
         * @private
         */
        this._showZ = true;
        /**
         * Line geometry for x axis
         *
         * @type {LineGeometry}
         * @private
         */
        this._xAxis = new LineGeometry(-this._size / 2, 0, 0, this._size / 2, 0, 0);
        /**
         * Line geometry for y axis
         *
         * @type {LineGeometry}
         * @private
         */
        this._yAxis = new LineGeometry(0, -this._size / 2, 0, 0, this._size / 2, 0);
        /**
         * Line geometry for z axis
         *
         * @type {LineGeometry}
         * @private
         */
        this._zAxis = new LineGeometry(0, 0, -this._size / 2, 0, 0, this._size / 2);
        /**
         * Reference to the webgl rendering context API
         *
         * @type {WebGLRenderingContext}
         * @private
         */
        this._gl = getWebGL();
        /**
         * Reference to the program with which axis wil be rendered
         *
         * @type {Program}
         * @private
         */
        this._program = new Program(basicVertexShader, basicFragmentShader);
    }
    /**
     * Render axis
     *
     * @param {Camera} camera
     */
    render(camera) {
        this._program.use();
        let gl = getWebGL();
        gl.uniformMatrix4fv(this._program.modelMatrix, false, new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
        gl.uniformMatrix4fv(this._program.viewMatrix, false, camera.viewMatrix.getFloat32Array());
        gl.uniformMatrix4fv(this._program.projectionMatrix, false, camera.projectionMatrix.getFloat32Array());
        if (this._showX) {
            gl.uniform4fv(this._program.materialDiffuse, new Float32Array([1, 0, 0, 1]));
            this._xAxis.positionBuffer.setAttributePointer(0);
            gl.drawArrays(gl.LINES, 0, this._xAxis.positionBuffer.numItems);
        }
        if (this._showY) {
            gl.uniform4fv(this._program.materialDiffuse, new Float32Array([0, 1, 0, 1]));
            this._yAxis.positionBuffer.setAttributePointer(0);
            gl.drawArrays(gl.LINES, 0, this._yAxis.positionBuffer.numItems);
        }
        if (this._showZ) {
            gl.uniform4fv(this._program.materialDiffuse, new Float32Array([0, 0, 1, 1]));
            this._zAxis.positionBuffer.setAttributePointer(0);
            gl.drawArrays(gl.LINES, 0, this._zAxis.positionBuffer.numItems);
        }
    }
    /**
     * Set the a new size to axis
     *
     * @param {number} dim
     */
    set size(dim) {
        if (this._size == dim)
            return;
        this._size = dim;
        this._xAxis.dispose();
        this._yAxis.dispose();
        this._zAxis.dispose();
        this._xAxis = new LineGeometry(-this._size / 2, 0, 0, this._size / 2, 0, 0);
        this._yAxis = new LineGeometry(0, -this._size / 2, 0, 0, this._size / 2, 0);
        this._zAxis = new LineGeometry(0, 0, -this._size / 2, 0, 0, this._size / 2);
    }
    showX() {
        this._showX = true;
    }
    showY() {
        this._showY = true;
    }
    showZ() {
        this._showZ = true;
    }
    hideX() {
        this._showX = false;
    }
    hideY() {
        this._showY = false;
    }
    hideZ() {
        this._showZ = false;
    }
    hide_showX() {
        this._showX = !this._showX;
    }
    hide_showY() {
        this._showY = !this._showY;
    }
    hide_showZ() {
        this._showZ = !this._showZ;
    }
}
