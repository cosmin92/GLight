import Camera from "./Camera";
import Matrix4 from "../math/Matrix4";
import { ORTHOGRAPHIC_CAMERA } from "../Constants";
import Base from "../core/Base";
/**
 * Class representing a camera in orthographic projection
 */
export default class OrthographicCamera extends Camera {
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
    constructor(name, left = -1, right = 1, top = 1, bottom = 1, near = 0.01, far = 100.0) {
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
    get left() {
        return this._left;
    }
    /**
     * Sets the left viewing volume
     *
     * @param {number} value
     */
    set left(value) {
        this._left = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
    /**
     * Gets the right viewing volume
     *
     * @return {number}
     */
    get right() {
        return this._right;
    }
    /**
     * Sets the right viewing volume
     *
     * @param {number} value
     */
    set right(value) {
        this._right = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
    /**
     * Gets the top viewing volume
     *
     * @return {number}
     */
    get top() {
        return this._top;
    }
    /**
     * Sets the top viewing volume
     *
     * @param {number} value
     */
    set top(value) {
        this._top = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
    /**
     * Gets the bottom viewing volume
     *
     * @return {number}
     */
    get bottom() {
        return this._bottom;
    }
    /**
     * Sets the bottom viewing volume
     *
     * @param {number} value
     */
    set bottom(value) {
        this._bottom = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
    /**
     * Gets the viewing volume start
     *
     * @return {number}
     */
    get near() {
        return this._near;
    }
    /**
     * Sets the viewing volume start
     *
     * @param {number} value
     */
    set near(value) {
        this._near = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
    /**
     * Gets the viewing volume end
     *
     * @return {number}
     */
    get far() {
        return this._far;
    }
    /**
     * Sets the viewing volume end
     *
     * @param {number} value
     */
    set far(value) {
        this._far = value;
        Matrix4.ortho(this._projectionMatrix, this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
}
/**
 * Util counter for directional lights naming
 *
 * @type {number}
 * @private
 */
OrthographicCamera._counter = 0;
