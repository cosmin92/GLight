import {basicFragmentShader, basicVertexShader} from "../shaders/basicShaders";
import GridGeometry from "../geometries/helpers/GridGeometry";
import Renderable from "../core/Renderable";
import {HELPER} from "../Constants";
import LambertMaterial from "../materials/LambertMaterial";
import Program from "../shaders/Program";

/**
 * Helper class similar to the mesh class creating a Grid
 */
export default class Grid extends Renderable{

    private _size: number;
    private _divisions: number;

    /**
     * Grid constructor
     *
     * @param {number} size
     * @param {number} divisions
     */
    public constructor(size: number = 10, divisions: number = 20) {
        super("Grid", HELPER, new GridGeometry(size, divisions), new LambertMaterial());

        /**
         * The grid size
         *
         * @type {number}
         * @private
         */
        this._size = size;

        /**
         * The number of the grid subdivisions
         *
         * @type {number}
         * @private
         */
        this._divisions = divisions;

        /**
         * Reference to the shader program used to render the grid
         *
         * @type {Program}
         * @private
         */
        this._program = new Program(basicVertexShader, basicFragmentShader);

        /**
         * Draw lines
         */
        this._drawingMode = this._gl.LINES;
    }

    /**
     * Sets the grid size to a new value
     *
     * @param {number} dim
     */
    public set size(dim: number) {
        this._size = dim;
        this._createGeometry();
    }

    /**
     * Sets the number of subdivisions of the grid to a new value
     *
     * @param {number} num
     */
    public set divisions(num: number) {
        this._divisions = num;
        this._createGeometry();
    }

    /**
     * Sets even the grid size that grid subdivisions
     *
     * @param {number} size
     * @param {number} divisions
     */
    public set(size: number = 2, divisions: number = 10): void {
        this._size = size;
        this._divisions = divisions;
        this._createGeometry();
    }

    /**
     * Generate a new grid data
     *
     * @private
     */
    private _createGeometry() {
        this._geometry.dispose();
        this._geometry = new GridGeometry(this._size, this._divisions);
    }
}