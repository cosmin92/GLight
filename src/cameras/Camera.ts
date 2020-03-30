import Renderable from "../core/Renderable";
import Material from "../materials/Material";
import CameraGeometry from "../geometries/helpers/CameraGeometry";
import Matrix4 from "../math/Matrix4";
import LambertMaterial from "../materials/LambertMaterial";
import Color from "../core/Color";

/**
 * Class representing a generic camera
 */
export default class Camera extends Renderable {


    protected _projectionMatrix: Matrix4;
    private readonly _mode: boolean;

    /**
     * Camera constructor
     *
     * @param {string} name
     * @param {number} type
     * @param {Material} material
     */
    public constructor(name: string, type: number, material: Material = new LambertMaterial(new Color(0,0,0,255))) {
        super(name, type, new CameraGeometry(), material);

        /**
         * The projection matrix
         *
         * @type {Matrix4}
         * @protected
         */
        this._projectionMatrix = new Matrix4();
        Matrix4.perspective(this._projectionMatrix, 45, this._gl.canvas.width / this._gl.canvas.height, 0.01, 100.0);

        /**
         * Indicator variable for camera movements
         *
         * @type {boolean}
         * @private
         */
        this._mode = false; // ORBITING CAMERA
    }

    /**
     * Overridden method to threat transformation matrix differently
     */
    public applyTransformations(): void {
        super.applyTransformations();
    }

    /**
     * Gets the view matrix
     *
     * @return {Matrix4}
     */
    public get viewMatrix(): Matrix4 {
        return this._modelMatrix;
    }

    /**
     * Gets the projection matrix
     *
     * @return {Matrix4}
     */
    public get projectionMatrix(): Matrix4 {
        return this._projectionMatrix;
    }

    /**
     * Move along the right direction by v
     *
     * @param {number} v
     */
    public panX(v: number): void {
        if (this._mode) return;
        this._translation.x += this._rightDirection.x * v;
        this._translation.y += this._rightDirection.y * v;
        this._translation.z += this._rightDirection.z * v;
    }

    /**
     * Move along the up direction by v
     *
     * @param {number} v
     */
    public panY(v: number): void {
        this._translation.y += this._upDirection.y * v;
        if (this._mode) return;
        this._translation.x += this._upDirection.x * v;
        this._translation.z += this._upDirection.z * v;
    }

    /**
     * Move along the forward direction by v
     *
     * @param {number} v
     */
    public panZ(v: number): void {
        if (!this._mode) {
            this._translation.z += v;
        } else {
            this._translation.x += this._forwardDirection.x * v;
            this._translation.y += this._forwardDirection.y * v;
            this._translation.z += this._forwardDirection.z * v;
        }
    }
}