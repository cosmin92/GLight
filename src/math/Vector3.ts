export default class Vector3 {

    private _x: number;
    private _y: number;
    private _z: number;

    /**
     * Vector3 constructor
     *
     * @param {number} x - the first component of the vector
     * @param {number} y - the second component of the vector
     * @param {number} z - the third component of the vector
     */
    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
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
     * Sets the vector's components
     *
     * @param {number} x - the first component
     * @param {number} y - the second component
     * @param {number} z - the third component
     * @return {Vector3}
     */
    public set(x: number, y: number, z: number): Vector3 {
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
    public clone(): Vector3 {
        return new Vector3(this._x, this._y, this._z);
    }

    /**
     * Sum vector3 to this vector
     *
     * @param {Vector3} vector3
     * @return {Vector3}
     */
    public add(vector3: Vector3): Vector3 {
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
    public multiplyScalar(value: number) {
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
    public negate() {
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
    public magnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }

    /**
     * Returns the vector's components as a an array
     *
     * @return {number[]}
     */
    public getArray(): number[] {
        return [this._x, this._y, this._z];
    }

    /**
     * Returns the vector's components as a typed array
     *
     * @return {Float32Array}
     */
    public getFloat32Array(): Float32Array {
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
    public static fromArray(values: number[]): Vector3 {
        return new Vector3(values[0], values[1], values[2]);
    }

    /**
     * Return a new vector result of the subtraction operation
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {Vector3}
     */
    public static sub(v1: Vector3, v2: Vector3): Vector3 {
        return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    /**
     * Return a new vector result of the sum operation
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {Vector3}
     */
    public static add(v1: Vector3, v2: Vector3): Vector3 {
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    /**
     * Carry out the dot product
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {number}
     */
    public static dot(v1: Vector3, v2: Vector3): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    /**
     * Carry out the cross product
     *
     * @param {Vector3} v1
     * @param {Vector3} v2
     * @return {Vector3}
     */
    public static cross(v1: Vector3, v2: Vector3) {
        return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
}