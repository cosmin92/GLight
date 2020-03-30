export default class Vector3 {
    /**
     * Vector3 constructor
     *
     * @param {number} x - the first component of the vector
     * @param {number} y - the second component of the vector
     * @param {number} z - the third component of the vector
     */
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
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
     * Sets the vector's components
     *
     * @param {number} x - the first component
     * @param {number} y - the second component
     * @param {number} z - the third component
     * @return {Vector3}
     */
    set(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    }
    /**
     * Clone this vector
     *
     * @return {Vector3}
     */
    clone() {
        return new Vector3(this._x, this._y, this._z);
    }
    /**
     * Sum vector3 to this vector
     *
     * @param {Vector3} vector3
     * @return {Vector3}
     */
    add(vector3) {
        this._x += vector3.x;
        this._y += vector3.y;
        this._z += vector3.z;
        return this;
    }
    /**
     * Multiply vector by the given scalar
     *
     * @param {number} value
     * @return {Vector3}
     */
    multiplyScalar(value) {
        this._x *= value;
        this._y *= value;
        this._z *= value;
        return this;
    }
    /**
     * Negate the vector
     *
     * @return {Vector3}
     */
    negate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        return this;
    }
    /**
     * Get the magnitude
     *
     * @return {number}
     */
    magnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }
    /**
     * Returns the vector's components as a an array
     *
     * @return {number[]}
     */
    getArray() {
        return [this._x, this._y, this._z];
    }
    /**
     * Returns the vector's components as a typed array
     *
     * @return {Float32Array}
     */
    getFloat32Array() {
        return new Float32Array([this._x, this._y, this._z]);
    }
    //==================================================================================================================
    // STATIC METHODS
    //==================================================================================================================
    /**
     * Create a vector from the array
     *
     * @param {number[]} values
     * @return {Vector3}
     */
    static fromArray(values) {
        return new Vector3(values[0], values[1], values[2]);
    }
    /**
     * Return a new vector result of the subtraction operation
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {Vector3}
     */
    static sub(v1, v2) {
        return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    /**
     * Return a new vector result of the sum operation
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {Vector3}
     */
    static add(v1, v2) {
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    /**
     * Carry out the dot product
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {number}
     */
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    /**
     * Carry out the cross product
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {Vector3}
     */
    static cross(v1, v2) {
        return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
}
