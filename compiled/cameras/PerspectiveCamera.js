import Camera from "./Camera";
import Matrix4 from "../math/Matrix4";
import { getWebGL } from "../core/GL";
import { PERSPECTIVE_CAMERA } from "../Constants";
import Base from "../core/Base";
/**
 * Class representing a camera in perspective projection
 */
export default class PerspectiveCamera extends Camera {
    /**
     * PerspectiveCamera constructor
     *
     * @param {String} name
     * @param {number} verticalFov
     * @param {number} aspectRatio
     * @param {number} near
     * @param {number} far
     */
    constructor(name, verticalFov = 45, aspectRatio = getWebGL().canvas.width / getWebGL().canvas.height, near = 0.01, far = 100.0) {
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
    get verticalFov() {
        return this._verticalFov;
    }
    /**
     * Sets the vertical fov
     *
     * @param {number} value
     */
    set verticalFov(value) {
        this._verticalFov = value;
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
    }
    /**
     * Gets the aspect ratio
     *
     * @return {number}
     */
    get aspectRatio() {
        return this._aspectRatio;
    }
    /**
     * Sets the aspect ratio
     *
     * @param {number} value
     */
    set aspectRatio(value) {
        this._aspectRatio = value;
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
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
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
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
        Matrix4.perspective(this._projectionMatrix, this._verticalFov, this._aspectRatio, this._near, this._far);
    }
}
/**
 * Util counter for directional lights naming
 *
 * @type {number}
 * @private
 */
PerspectiveCamera._counter = 0;
