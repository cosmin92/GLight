import Program from "../shaders/Program";
import Camera from "../cameras/Camera";
import LineGeometry from "../geometries/LineGeometry";
import {getWebGL} from "../core/GL";
import {basicFragmentShader, basicVertexShader} from "../shaders/basicShaders";

export default class Axis {


    private _size: number;

    private _xAxis: LineGeometry;
    private _yAxis: LineGeometry;
    private _zAxis: LineGeometry;

    private _showX: boolean;
    private _showY: boolean;
    private _showZ: boolean;

    private _gl: WebGLRenderingContext;
    private _program: Program;

    /**
     * Axis constructor
     *
     * @param size
     */
    public constructor(size: number = 10) {

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
    public render(camera: Camera): void {
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
    public set size(dim: number) {
        if (this._size == dim) return;

        this._size = dim;

        this._xAxis.dispose();
        this._yAxis.dispose();
        this._zAxis.dispose();

        this._xAxis = new LineGeometry(-this._size / 2, 0, 0, this._size / 2, 0, 0);
        this._yAxis = new LineGeometry(0, -this._size / 2, 0, 0, this._size / 2, 0);
        this._zAxis = new LineGeometry(0, 0, -this._size / 2, 0, 0, this._size / 2);
    }

    public showX(): void {
        this._showX = true;
    }

    public showY(): void {
        this._showY = true;
    }

    public showZ(): void {
        this._showZ = true;
    }

    public hideX(): void {
        this._showX = false;
    }

    public hideY(): void {
        this._showY = false;
    }

    public hideZ(): void {
        this._showZ = false;
    }

    public hide_showX(): void{
        this._showX = !this._showX;
    }

    public hide_showY(): void{
        this._showY = !this._showY;
    }

    public hide_showZ(): void{
        this._showZ = !this._showZ;
    }
}