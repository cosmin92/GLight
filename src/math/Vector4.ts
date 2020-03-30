import Matrix4 from "./Matrix4";
import Vector3 from "./Vector3";

export default class Vector4 {

    private _x: number;
    private _y: number;
    private _z: number;
    private _w: number;

    /**
     * Vector4 constructor
     *
     * @param {number} x - the first component of the vector
     * @param {number} y - the second component of the vector
     * @param {number} z - the third component of the vector
     * @param {number} w - the fourth component of the vector
     */
    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    /**
     * Set the first component of the vector
     *
     * @param {number} value
     */
    public set x(value: number) {
        this._x = value;
    }

    /**
     * Set the second component of the vector
     *
     * @param {number} value
     */
    public set y(value: number) {
        this._y = value;
    }

    /**
     * Set the third component of the vector
     *
     * @param {number} value
     */
    public set z(value: number) {
        this._z = value;
    }

    /**
     * Set the fourth component of the vector
     *
     * @param {number} value
     */
    public set w(value: number) {
        this._w = value;
    }

    /**
     * Get the first component of the vector
     *
     * @return {number}
     */
    public get x(): number {
        return this._x;
    }

    /**
     * Get the second component of the vector
     *
     * @return {number}
     */
    public get y(): number {
        return this._y;
    }

    /**
     * Get the third component of the vector
     *
     * @return {number}
     */
    public get z(): number {
        return this._z;
    }

    /**
     * Get the fourth component of the vector
     *
     * @return {number}
     */
    public get w(): number {
        return this._w;
    }

    /**
     * Sets the vector's components
     *
     * @param {number} x - the first component
     * @param {number} y - the second component
     * @param {number} z - the third component
     * @param {number} w - the fourth component
     * @return {Vector4}
     */
    public set(x: number, y: number, z: number, w: number): Vector4 {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        return this;
    }

    /**
     * Clone this vector
     *
     * @return {Vector4}
     */
    public clone(): Vector4 {
        return new Vector4(this._x, this._y, this._z, this._w);
    }

    /**
     * Sum vector4 to this vector
     *
     * @param {Vector4} vector4
     * @return {Vector4}
     */
    public add(vector4: Vector4): Vector4 {
        this._x += vector4.x;
        this._y += vector4.y;
        this._z += vector4.z;
        this._w += vector4.w;

        return this;
    }

    /**
     * Multiply vector by the given scalar
     *
     * @param {number} value
     * @return {Vector4}
     */
    public multiplyScalar(value: number) {
        this._x *= value;
        this._y *= value;
        this._z *= value;
        this._w *= value;
        return this;
    }

    /**
     * Negate the vector
     *
     * @return {Vector4}
     */
    public negate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this._w *= -1;
        return this;
    }

    /**
     * Get the magnitude
     *
     * @return {number}
     */
    public magnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }

    /**
     * Project this vector in a new 4 dimensional space
     *
     * @param {Matrix4} matrix
     * @return {Vector4}
     */
    public transform(matrix: Matrix4) {

        let x = this._x;
        let y = this._y;
        let z = this._z;
        let w = this._w;

        this._x = matrix.get(0) * x + matrix.get(4) * y + matrix.get(8) * z + matrix.get(12) * w;
        this._y = matrix.get(1) * x + matrix.get(5) * y + matrix.get(9) * z + matrix.get(13) * w;
        this._z = matrix.get(2) * x + matrix.get(6) * y + matrix.get(10) * z + matrix.get(14) * w;
        this._w = matrix.get(3) * x + matrix.get(7) * y + matrix.get(11) * z + matrix.get(15) * w;

        return this;
    }

    /**
     * Reduce this vector to a three dimensional vector eliminating the fourth component
     *
     * @return {Vector3}
     */
    public reduce() {
        return new Vector3(this._x, this._y, this._z);
    }

    /**
     * Returns the vector's components as a an array
     *
     * @return {number[]}
     */
    public getArray(): number[] {
        return [this._x, this._y, this._z, this._w];
    }

    /**
     * Returns the vector's components as a typed array
     *
     * @return {Float32Array}
     */
    public getFloat32Array(): Float32Array {
        return new Float32Array([this._x, this._y, this._z, this._w]);
    }

    //==================================================================================================================
    // STATIC METHODS
    //==================================================================================================================

    /**
     * Create a vector from the array
     *
     * @param {number[]} values
     * @return {Vector4}
     */
    public static fromArray(values: number[]): Vector4 {
        return new Vector4(values[0], values[1], values[2], values[3]);
    }

    /**
     * Return a new vector result of the subtraction operation
     *
     * @param {Vector4} v1
     * @param {Vector4} v2
     * @return {Vector4}
     */
    public static sub(v1: Vector4, v2: Vector4): Vector4 {
        return new Vector4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
    }

    /**
     * Return a new vector result of the sum operation
     *
     * @param {Vector4} v1
     * @param {Vector4} v2
     * @return {Vector4}
     */
    public static add(v1: Vector4, v2: Vector4): Vector4 {
        return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
    }

    /**
     * Carry out the dot product
     *
     * @param {Vector4} v1
     * @param {Vector4} v2
     * @return {number}
     */
    public static dot(v1: Vector4, v2: Vector4): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
    }
}