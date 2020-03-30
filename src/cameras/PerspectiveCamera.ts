import Camera from "./Camera";
import Matrix4 from "../math/Matrix4";
import {getWebGL} from "../core/GL";
import {PERSPECTIVE_CAMERA} from "../Constants";
import Base from "../core/Base";

/**
 * Class representing a camera in perspective projection
 */
export default class PerspectiveCamera extends Camera {

    /**
     * Util counter for directional lights naming
     *
     * @type {number}
     * @private
     */
    private static _counter: number = 0;

    private _verticalFov: number;
    private _aspectRatio: number;
    private _near: number;
    private _far: number;

    /**
     * PerspectiveCamera constructor
     *
     * @param {String} name
     * @param {number} verticalFov
     * @param {number} aspectRatio
     * @param {number} near
     * @param {number} far
     */
    public constructor(name?: string, verticalFov: number = 45, aspectRatio: number = getWebGL().canvas.width / getWebGL().canvas.height, near: number = 0.01, far: number = 100.0) {
        let obj = Base.getName("Perspective Camera", PerspectiveCamera._counter, name);
        PerspectiveCamera._counter = obj.counter;
        super(obj.name, PERSPECTIVE_CAMERA);

        /**
         * The vertical fov value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._verticalFov = verticalFov;

        /**
         * The aspect ratio value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._aspectRatio = aspectRatio;

        /**
         * The near value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._near = near;

        /**
         * The far value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._far = far;

        // recompute the projection matrix
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
    }


    /**
     * Gets the vertical fov
     *
     * @return {number}
     */
    public get verticalFov(): number {
        return this._verticalFov;
    }

    /**
     * Sets the vertical fov
     *
     * @param {number} value
     */
    public set verticalFov(value: number) {
        this._verticalFov = value;
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
    }

    /**
     * Gets the aspect ratio
     *
     * @return {number}
     */
    public get aspectRatio(): number {
        return this._aspectRatio;
    }

    /**
     * Sets the aspect ratio
     *
     * @param {number} value
     */
    public set aspectRatio(value: number) {
        this._aspectRatio = value;
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
    }

    /**
     * Gets the viewing volume start
     *
     * @return {number}
     */
    public get near(): number {
        return this._near;
    }

    /**
     * Sets the viewing volume start
     *
     * @param {number} value
     */
    public set near(value: number) {
        this._near = value;
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
    }

    /**
     * Gets the viewing volume end
     *
     * @return {number}
     */
    public get far(): number {
        return this._far;
    }

    /**
     * Sets the viewing volume end
     *
     * @param {number} value
     */
    public set far(value: number) {
        this._far = value;
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
    }
}