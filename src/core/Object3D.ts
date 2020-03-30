import Node from "./Node";
import Vector3 from "../math/Vector3";
import Matrix4 from "../math/Matrix4";
import Vector4 from "../math/Vector4";

/**
 * Class representing a generic entity subject to transformations in the scene
 */
export default class Object3D extends Node {

    protected _target: Vector3 | null;

    protected readonly _translation: Vector3;
    protected readonly _rotation: Vector3;
    protected readonly _scale: Vector3;

    protected readonly _pivot: Vector3;

    protected readonly _forwardDirection: Vector4;
    protected readonly _upDirection: Vector4;
    protected readonly _rightDirection: Vector4;

    protected _localMatrix: Matrix4;
    protected _modelMatrix: Matrix4;

    /**
     * Object3D constructor
     *
     * @param {string} name
     * @param {number} type
     */
    public constructor(name: string, type: number) {
        super(name, type);

        /**
         * If defined this object looks att the target
         *
         * @type {Vector3 | null}
         * @protected
         */
        this._target = null;

        /**
         * The rotation values
         *
         * @type {Vector3}
         * @protected
         */
        this._translation = new Vector3();

        /**
         * The translation values
         *
         * @type {Vector3}
         * @protected
         */
        this._rotation = new Vector3();

        /**
         * The scales values
         *
         * @type {Vector3}
         * @protected
         */
        this._scale = new Vector3(1, 1, 1);

        /**
         * The pivot translation values
         *
         * @type {Vector3}
         * @protected
         */
        this._pivot = new Vector3();

        /**
         * The vector pointing in the forward direction
         *
         * @type {Vector4}
         * @protected
         */
        this._forwardDirection = new Vector4();

        /**
         * The vector pointing in the up direction
         *
         * @type {Vector4}
         * @protected
         */
        this._upDirection = new Vector4();

        /**
         * The vector pointing in the right direction
         *
         * @type {Vector4}
         * @protected
         */
        this._rightDirection = new Vector4();


        /**
         * The local transformations matrix
         *
         * @type {Matrix4}
         * @protected
         */
        this._localMatrix = new Matrix4();

        /**
         * The global transformations matrix
         *
         * @type {Matrix4}
         * @protected
         */
        this._modelMatrix = new Matrix4();
    }

    /**
     * Computes the local an global transformation matrices
     */
    public applyTransformations(): void {

        if (this._target !== null) {
            Matrix4.targetTo(this._localMatrix, this._translation, this._target, this._upDirection.reduce());
            this._localMatrix.translate(this._pivot);
        } else {
            this._localMatrix.reset().translate(Vector3.add(this._translation, this._pivot)).rotate(this._rotation).translate(Vector3.sub(new Vector3(), this._pivot)).scale(this._scale);
        }

        this._forwardDirection.set(0, 0, 1, 0).transform(this._localMatrix);
        this._upDirection.set(0, 1, 0, 0).transform(this._localMatrix);
        this._rightDirection.set(1, 0, 0, 0).transform(this._localMatrix);

        if (this._parent != null && this._parent instanceof Object3D) {
            Matrix4.multiply(this._modelMatrix, this._parent.transformationMatrix, this._localMatrix);
        } else {
            this._localMatrix.copyTo(this._modelMatrix);
        }
    }

    /**
     * Set the target to look
     *
     * @param {Vector3} target
     */
    public setTarget(target: Vector3): void {
        this._target = target;
    }

    /**
     * Set the previously set target to look
     */
    public unsetTarget(): void {
        this._target = null;
    }

    /**
     * Gets the translation vector
     *
     * @return {Vector3}
     */
    public get translate(): Vector3 {
        return this._translation;
    }

    /**
     * Gets the rotation vector
     *
     * @return {Vector3}
     */
    public get rotate(): Vector3 {
        return this._rotation;
    }

    /**
     * Gets the scales vector
     *
     * @return {Vector3}
     */
    public get scale(): Vector3 {
        return this._scale;
    }

    /**
     * Gets the pivot translation vector
     *
     * @return {Vector3}
     */
    public get pivot(): Vector3 {
        return this._pivot;
    }

    /**
     * Gets the up direction vector
     *
     * @return {Vector4}
     */
    public get upDirection(): Vector4 {
        return this._upDirection;
    }

    /**
     * Gets the right direction vector
     *
     * @return {Vector4}
     */
    public get rightDirection(): Vector4 {
        return this._rightDirection;
    }

    /**
     * Gets the forward direction vector
     *
     * @return {Vector4}
     */
    public get forwardDirection(): Vector4 {
        return this._forwardDirection;
    }

    /**
     * Gets the global transformation matrix
     *
     * @return {Matrix4}
     */
    public get transformationMatrix(): Matrix4 {
        return this._modelMatrix;
    }

    /**
     * Reset all properties of the object to initial state
     */
    public reset(): void {

        this.unsetParent();
        this._children = [];

        this._localMatrix.reset();
        this._modelMatrix.reset();

        this._translation.set(0, 0, 0);
        this._rotation.set(0, 0, 0);
        this._scale.set(0, 0, 0);
        this._pivot.set(0, 0, 0);

        this._forwardDirection.set(0, 0, 0, 0);
        this._upDirection.set(0, 0, 0, 0);
        this._rightDirection.set(0, 0, 0, 0);
    }
}