import Camera from "./Camera";
import Matrix4 from "../math/Matrix4";
import {ORTHOGRAPHIC_CAMERA} from "../Constants";
import Base from "../core/Base";

/**
 * Class representing a camera in orthographic projection
 */
export default class OrthographicCamera extends Camera {

    /**
     * Util counter for directional lights naming
     *
     * @type {number}
     * @private
     */
    private static _counter: number = 0;

    private _left: number;
    private _right: number;
    private _top: number;
    private _bottom: number;
    private _near: number;
    private _far: number;

    /**
     * OrthographicCamera constructor
     *
     * @param {String} name
     * @param {number} left
     * @param {number} right
     * @param {number} top
     * @param {number} bottom
     * @param {number} near
     * @param {number} far
     */
    public constructor(name?: string, left: number = -1, right: number = 1, top: number = 1, bottom: number = 1, near: number = 0.01, far: number = 100.0) {
        let obj = Base.getName("Orthographic Camera", OrthographicCamera._counter, name);
        OrthographicCamera._counter = obj.counter;
        super(obj.name, ORTHOGRAPHIC_CAMERA);

        /**
         * The left value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._left = left;

        /**
         * The right value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._right = right;

        /**
         * The top value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._top = top;

        /**
         * The bottom value of the viewing volume
         *
         * @type {number}
         * @private
         */
        this._bottom = bottom;

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
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }

    /**
     * Gets the left viewing volume
     *
     * @return {number}
     */
    public get left(): number {
        return this._left;
    }

    /**
     * Sets the left viewing volume
     *
     * @param {number} value
     */
    public set left(value: number) {
        this._left = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }

    /**
     * Gets the right viewing volume
     *
     * @return {number}
     */
    public get right(): number {
        return this._right;
    }

    /**
     * Sets the right viewing volume
     *
     * @param {number} value
     */
    public set right(value: number) {
        this._right = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }

    /**
     * Gets the top viewing volume
     *
     * @return {number}
     */
    public get top(): number {
        return this._top;
    }

    /**
     * Sets the top viewing volume
     *
     * @param {number} value
     */
    public set top(value: number) {
        this._top = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }

    /**
     * Gets the bottom viewing volume
     *
     * @return {number}
     */
    public get bottom(): number {
        return this._bottom;
    }

    /**
     * Sets the bottom viewing volume
     *
     * @param {number} value
     */
    public set bottom(value: number) {
        this._bottom = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
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
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
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
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
}