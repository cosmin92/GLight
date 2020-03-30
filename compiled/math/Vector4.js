import Vector3 from "./Vector3";
export default class Vector4 {
    /**
     * Vector4 constructor
     *
     * @param {number} x - the first component of the vector
     * @param {number} y - the second component of the vector
     * @param {number} z - the third component of the vector
     * @param {number} w - the fourth component of the vector
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
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
    set x(value) {
        this._x = value;
    }
    /**
     * Set the second component of the vector
     *
     * @param {number} value
     */
    set y(value) {
        this._y = value;
    }
    /**
     * Set the third component of the vector
     *
     * @param {number} value
     */
    set z(value) {
        this._z = value;
    }
    /**
     * Set the fourth component of the vector
     *
     * @param {number} value
     */
    set w(value) {
        this._w = value;
    }
    /**
     * Get the first component of the vector
     *
     * @return {number}
     */
    get x() {
        return this._x;
    }
    /**
     * Get the second component of the vector
     *
     * @return {number}
     */
    get y() {
        return this._y;
    }
    /**
     * Get the third component of the vector
     *
     * @return {number}
     */
    get z() {
        return this._z;
    }
    /**
     * Get the fourth component of the vector
     *
     * @return {number}
     */
    get w() {
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
    set(x, y, z, w) {
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
    clone() {
        return new Vector4(this._x, this._y, this._z, this._w);
    }
    /**
     * Sum vector4 to this vector
     *
     * @param {Vector4} vector4
     * @return {Vector4}
     */
    add(vector4) {
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
    multiplyScalar(value) {
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
    negate() {
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
    magnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    /**
     * Project this vector in a new 4 dimensional space
     *
     * @param {Matrix4} matrix
     * @return {Vector4}
     */
    transform(matrix) {
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
    reduce() {
        return new Vector3(this._x, this._y, this._z);
    }
    /**
     * Returns the vector's components as a an array
     *
     * @return {number[]}
     */
    getArray() {
        return [this._x, this._y, this._z, this._w];
    }
    /**
     * Returns the vector's components as a typed array
     *
     * @return {Float32Array}
     */
    getFloat32Array() {
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
    static fromArray(values) {
        return new Vector4(values[0], values[1], values[2], values[3]);
    }
    /**
     * Return a new vector result of the subtraction operation
     *
     * @param {Vector4} v1
     * @param {Vector4} v2
     * @return {Vector4}
     */
    static sub(v1, v2) {
        return new Vector4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
    }
    /**
     * Return a new vector result of the sum operation
     *
     * @param {Vector4} v1
     * @param {Vector4} v2
     * @return {Vector4}
     */
    static add(v1, v2) {
        return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
    }
    /**
     * Carry out the dot product
     *
     * @param {Vector4} v1
     * @param {Vector4} v2
     * @return {number}
     */
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
    }
}
