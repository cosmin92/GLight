var GLIGHT = (function (exports) {
    'use strict';

    let __glContext;
    function initialize(canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        let gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
        if (gl !== null) {
            __glContext = gl;
            return;
        }
        console.warn("No context with ID = webgl");
        gl = canvas.getContext("experimental-webgl", { preserveDrawingBuffer: true });
        if (gl !== null) {
            __glContext = gl;
            return;
        }
        throw new Error("Cannot get the WebGLRenderingContext");
    }
    function getWebGL() {
        if (__glContext === undefined) {
            throw new Error("WebGLRenderingContext not initialized. Use 'initialize()' function first!");
        }
        else {
            return __glContext;
        }
    }

    // Object types
    const MESH = 0;
    const CAMERA = 1;
    const PERSPECTIVE_CAMERA = 2;
    const ORTHOGRAPHIC_CAMERA = 3;
    const LAMBERT_MATERIAL = 4;
    const PHONG_MATERIAL = 5;
    const DIRECTIONAL_LIGHT = 6;
    const POINT_LIGHT = 7;
    const HELPER = 8;
    const GROUP = 9;
    const TEXTURE = 10;
    const TEXTURE_CUBE = 11;
    (function (INTERPOLATION) {
        INTERPOLATION[INTERPOLATION["LINEAR"] = 0] = "LINEAR";
        INTERPOLATION[INTERPOLATION["BSPLINE"] = 1] = "BSPLINE";
    })(exports.INTERPOLATION || (exports.INTERPOLATION = {}));
    (function (EASE) {
        EASE[EASE["LINEAR"] = 0] = "LINEAR";
        EASE[EASE["IN_OUT_QUAD"] = 1] = "IN_OUT_QUAD";
        EASE[EASE["OUT_QUAD"] = 2] = "OUT_QUAD";
        EASE[EASE["IN_QUAD"] = 3] = "IN_QUAD";
        EASE[EASE["IN_OUT_CUBIC"] = 4] = "IN_OUT_CUBIC";
        EASE[EASE["OUT_CUBIC"] = 5] = "OUT_CUBIC";
        EASE[EASE["IN_CUBIC"] = 6] = "IN_CUBIC";
        EASE[EASE["IN_OUT_QUART"] = 7] = "IN_OUT_QUART";
        EASE[EASE["OUT_QUART"] = 8] = "OUT_QUART";
        EASE[EASE["IN_QUART"] = 9] = "IN_QUART";
        EASE[EASE["IN_OUT_QUINT"] = 10] = "IN_OUT_QUINT";
        EASE[EASE["OUT_QUINT"] = 11] = "OUT_QUINT";
        EASE[EASE["IN_QUINT"] = 12] = "IN_QUINT";
        EASE[EASE["IN_OUT_ELASTIC"] = 13] = "IN_OUT_ELASTIC";
        EASE[EASE["OUT_ELASTIC"] = 14] = "OUT_ELASTIC";
        EASE[EASE["IN_OUT_SIN"] = 15] = "IN_OUT_SIN";
        EASE[EASE["OUT_SIN"] = 16] = "OUT_SIN";
        EASE[EASE["IN_SIN"] = 17] = "IN_SIN";
    })(exports.EASE || (exports.EASE = {}));

    /**
     * Class encapsulating all color operations
     */
    class Color {
        /**
         * Color constructor
         *
         * @param {number} red - the red component [0..255]. Default value equal to 0
         * @param {number} green - the green component [0..255]. Default value equal to 0
         * @param {number} blue - the blue component [0..255]. Default value equal to 0
         * @param {number} alpha - the alpha component [0..255]. Default value equal to 255
         */
        constructor(red = 0, green = 0, blue = 0, alpha = 255) {
            /**
             * Return the color as an array of numbers
             *
             * @return {number[]}
             */
            this.getArray = () => [this._red, this._green, this._blue, this._alpha];
            /**
             * Return the color as a Float32Array
             *
             * @return {Float32Array}
             */
            this.getFloat32Array = () => new Float32Array([this._red, this._green, this._blue, this._alpha]);
            /**
             * Returns the hexadecimal representation of this color
             *
             * @return {string}
             */
            this.getHexadecimal = () => Color.rgbToHex(this._red, this._green, this._blue);
            /**
             * Returns true if each component of this color is equal to each component of the passed color
             *
             * @param {Color} color - color to be compared
             *
             * @return {boolean}
             */
            this.equalTo = (color) => (this._red === color.red && this._green === color.green && this._blue === color.blue && this._alpha === color.alpha);
            /**
             * Returns a new Color, clone of this color
             *
             * @return {Color}
             */
            this.clone = () => new Color(this._red, this._green, this._blue, this._alpha);
            /**
             * The red component of the color
             *
             * @type {number}
             */
            this._red = red;
            /**
             * The green component of the color
             *
             * @type {number}
             */
            this._green = green;
            /**
             * The blue component of the color
             *
             * @type {number}
             */
            this._blue = blue;
            /**
             * The alpha component of the color
             *
             * @type {number}
             */
            this._alpha = alpha;
        }
        /**
         * Set the color components to new values
         *
         * @param {number} red - the red component. default value equal to 0
         * @param {number} green - the green component. default value equal to 0
         * @param {number} blue - the blue component. default value equal to 0
         * @param {number} alpha - the alpha component. default value equal to 255
         *
         * @return {Color}
         */
        set(red = 0, green = 0, blue = 0, alpha = 255) {
            this._red = red;
            this._green = green;
            this._blue = blue;
            this._alpha = alpha;
            return this;
        }
        /**
         * Returns the red component
         *
         * @return {number}
         */
        get red() {
            return this._red;
        }
        /**
         * Sets the red component
         *
         * @param {number} value - the new value
         */
        set red(value) {
            this._red = value;
        }
        /**
         * Returns the green component
         *
         * @return {number}
         */
        get green() {
            return this._green;
        }
        /**
         * Sets the green component
         *
         * @param {number} value - the new value
         */
        set green(value) {
            this._green = value;
        }
        /**
         * Returns the blue component
         *
         * @return {number}
         */
        get blue() {
            return this._blue;
        }
        /**
         * Sets the blue component
         *
         * @param {number} value - the new value
         */
        set blue(value) {
            this._blue = value;
        }
        /**
         * Returns the alpha component
         *
         * @return {number}
         */
        get alpha() {
            return this._alpha;
        }
        /**
         * Sets the alpha component
         *
         * @param {number} value - the new value
         */
        set alpha(value) {
            this._alpha = value;
        }
        /**
         * Normalize the color ([0..255], [0..255], [0..255], [0..255]) --> ([0..1], [0..1], [0..1], [0..1])
         *
         * @return {Color}
         */
        normalize() {
            this._red = this._red < 1 ? this._red : Math.abs(this._red / 255);
            this._green = this._green < 1 ? this._green : Math.abs(this._green / 255);
            this._blue = this._blue < 1 ? this._blue : Math.abs(this._blue / 255);
            this._alpha = this._alpha < 1 ? this._alpha : Math.abs(this._alpha / 255);
            return this;
        }
        /**
         * Return a new normalized color ([0..255], [0..255], [0..255], [0..255]) --> ([0..1], [0..1], [0..1], [0..1])
         *
         * @return {Color}
         */
        normalized() {
            return this.clone().normalize();
        }
        /**
         * Multiply each component of this color by the scalar value
         *
         * @param {number} scalar
         */
        multiplyScalar(scalar) {
            this._red *= scalar;
            this._green *= scalar;
            this._blue *= scalar;
            return this;
        }
        //==================================================================================================================
        // STATIC METHODS
        //==================================================================================================================
        /**
         * Create a color from an integer. All values grater than 255^4 will be white
         *
         * @param {number} integer
         * @return {Color}
         */
        static fromInteger(integer) {
            let powThree = 255 * 255 * 255;
            let powTwo = 255 * 255;
            if (integer >= powThree * 255) {
                return new Color(255, 255, 255, 255);
            }
            else if (integer >= powThree) {
                return new Color(integer - powThree, 255, 255, 255);
            }
            else if (integer >= powTwo) {
                return new Color(0, integer - powTwo, 255, 255);
            }
            else if (integer >= 255) {
                return new Color(0, 0, integer - 255, 255);
            }
            else {
                return new Color(0, 0, 0, integer);
            }
        }
        /**
         * Create a new color with passed values
         *
         * @param {number[] | Uint16Array | Float32Array} array
         * @return {Color}
         */
        static fromArray(array) {
            return new Color(array[0], array[1], array[2], array[3]);
        }
        /**
         * Convert hexadecimal representation to RGB representation
         *
         * @param {string | number} hex
         * @return {Color}
         */
        static convert(hex) {
            let rgb;
            if (typeof hex === 'number') {
                rgb = Color.hexIntToRGB(hex);
            }
            else {
                rgb = Color.hexStringToRGB(hex);
            }
            return rgb;
        }
        /**
         * Convert a color component to HEX
         *
         * @param {number} c
         */
        static componentToHex(c) {
            const hex = c.toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        }
        /**
         * Convert RGB to hexadecimal representation
         *
         * @param {number} red - value of the red component
         * @param {number} green - value of the green component
         * @param {number} blue - value of the blue component
         */
        static rgbToHex(red, green, blue) {
            const hexR = Color.componentToHex(red);
            const hexG = Color.componentToHex(green);
            const hexB = Color.componentToHex(blue);
            return `#${hexR}${hexG}${hexB}`;
        }
        /**
         * Convert hexadecimal representation to RGB representation
         *
         * @param {number} hex
         * @return {Color}
         */
        static hexIntToRGB(hex) {
            const r = hex >> 16;
            const g = (hex >> 8) & 0xff;
            const b = hex & 0xff;
            return new Color(r, g, b);
        }
        /**
         * Convert hexadecimal representation to RGB representation
         *
         * @param {string} hex
         * @return {Color}
         */
        static hexStringToRGB(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;
        }
    }

    class Vector3 {
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

    class Vector4 {
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

    /**
     * Class encapsulating math util functions
     */
    class _Math {
        /**
         * Linear interpolation
         *
         * @param {number} t
         * @param {number[]} a
         * @param {number[]} b
         * @param {function} ease
         */
        static lerp(t, a, b, ease) {
            let out = [];
            out.push(((b[0] - a[0]) * ease(t)) + a[0]);
            out.push(((b[1] - a[1]) * ease(t)) + a[1]);
            out.push(((b[2] - a[2]) * ease(t)) + a[2]);
            return out;
        }
        /**
         * Generate a unique identifier.
         * RFC4122 version 4
         *
         * @return {string}
         */
        static UUIDv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
    /**
     * Constant by which multiplications converts degrees to radians
     */
    _Math.deg2Rad = Math.PI / 180;

    class Matrix4 {
        /**
         * Matrix4 constructor
         *
         * @param {number} a00
         * @param {number} a01
         * @param {number} a02
         * @param {number} a03
         * @param {number} a10
         * @param {number} a11
         * @param {number} a12
         * @param {number} a13
         * @param {number} a20
         * @param {number} a21
         * @param {number} a22
         * @param {number} a23
         * @param {number} a30
         * @param {number} a31
         * @param {number} a32
         * @param {number} a33
         */
        constructor(a00 = 1, a01 = 0, a02 = 0, a03 = 0, a10 = 0, a11 = 1, a12 = 0, a13 = 0, a20 = 0, a21 = 0, a22 = 1, a23 = 0, a30 = 0, a31 = 0, a32 = 0, a33 = 1) {
            /**
             * The matrix values
             *
             * @type {number[]}
             * @private
             */
            this._values = [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33];
        }
        /**
         * Set the value in position [row, col] = value
         *
         * @param {number} row
         * @param {number} col
         * @param {number} value
         * @return {Matrix4}
         */
        set(row, col, value) {
            this._values[row * 4 + col] = value;
            return this;
        }
        /**
         * Return the element in position index, matrix represented as an arry
         *
         * @param index
         * @return {number}
         */
        get(index) {
            return this._values[index];
        }
        /**
         * Retruns the values of the matrix as an array of numbers
         *
         * @return {number[]}
         */
        getArray() {
            return this._values;
        }
        /**
         * Returns the values of the matrix as an typed array
         *
         * @return {number[]}
         */
        getFloat32Array() {
            return new Float32Array(this._values);
        }
        /**
         * Translate this matrix by the given vector
         *
         * @return {Matrix4}
         */
        translate(vector) {
            this._values[12] += this._values[0] * vector.x + this._values[4] * vector.y + this._values[8] * vector.z;
            this._values[13] += this._values[1] * vector.x + this._values[5] * vector.y + this._values[9] * vector.z;
            this._values[14] += this._values[2] * vector.x + this._values[6] * vector.y + this._values[10] * vector.z;
            this._values[15] += this._values[3] * vector.x + this._values[7] * vector.y + this._values[11] * vector.z;
            return this;
        }
        /**
         * Rotate this matrix by the given vector angles
         *
         * @return {Matrix4}
         */
        rotate(vector) {
            Matrix4.rotateX(this, vector.x);
            Matrix4.rotateY(this, vector.y);
            Matrix4.rotateZ(this, vector.z);
            return this;
        }
        /**
         * Scale this matrix by the given scale factors
         *
         * @return {Matrix4}
         */
        scale(vector) {
            this._values[0] *= vector.x;
            this._values[4] *= vector.y;
            this._values[8] *= vector.z;
            this._values[1] *= vector.x;
            this._values[5] *= vector.y;
            this._values[9] *= vector.z;
            this._values[2] *= vector.x;
            this._values[6] *= vector.y;
            this._values[10] *= vector.z;
            this._values[3] *= vector.x;
            this._values[7] *= vector.y;
            this._values[11] *= vector.z;
            return this;
        }
        /**
         * Invert this matrix
         *
         * @return {Matrix4}
         */
        invert() {
            let inverse = this.inverse();
            let values = inverse.getArray();
            for (let i = 0; i < 16; i++) {
                this._values[i] = values[i];
            }
            return this;
        }
        /**
         * Get a new matrix inverse of this matrix
         *
         * @return {Matrix4}
         */
        inverse() {
            let result = new Matrix4();
            let m = this._values;
            let r = result.getArray();
            r[0] = m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
            r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
            r[2] = m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
            r[3] = -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6];
            r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
            r[5] = m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
            r[6] = -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
            r[7] = m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6];
            r[8] = m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
            r[9] = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
            r[10] = m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
            r[11] = -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5];
            r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
            r[13] = m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
            r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
            r[15] = m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];
            let det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];
            for (let i = 0; i < 16; i++) {
                r[i] /= det;
            }
            return result;
        }
        /**
         * Returns a new matrix cone of this matrix
         *
         * @return {Matrix4}
         */
        clone() {
            let result = new Matrix4();
            let values = result.getArray();
            for (let i = 0; i < 16; i++) {
                values[i] = this._values[i];
            }
            return result;
        }
        /**
         * Copy this matrix values to the passed matrix reference
         */
        copyTo(matrix) {
            let values = matrix.getArray();
            for (let i = 0; i < 16; i++) {
                values[i] = this._values[i];
            }
        }
        /**
         * Set this matrix to identity matrix
         *
         * @return {Matrix4}
         */
        reset() {
            this._values[0] = 1;
            this._values[1] = 0;
            this._values[2] = 0;
            this._values[3] = 0;
            this._values[4] = 0;
            this._values[5] = 1;
            this._values[6] = 0;
            this._values[7] = 0;
            this._values[8] = 0;
            this._values[9] = 0;
            this._values[10] = 1;
            this._values[11] = 0;
            this._values[12] = 0;
            this._values[13] = 0;
            this._values[14] = 0;
            this._values[15] = 1;
            return this;
        }
        /**
         * Transpose this matrix
         *
         * @return {Matrix4}
         */
        transpose() {
            let a01 = this._values[1], a02 = this._values[2], a03 = this._values[3];
            let a12 = this._values[6], a13 = this._values[7];
            let a23 = this._values[11];
            this._values[1] = this._values[4];
            this._values[2] = this._values[8];
            this._values[3] = this._values[12];
            this._values[4] = a01;
            this._values[6] = this._values[9];
            this._values[7] = this._values[13];
            this._values[8] = a02;
            this._values[9] = a12;
            this._values[11] = this._values[14];
            this._values[12] = a03;
            this._values[13] = a13;
            this._values[14] = a23;
            return this;
        }
        /**
         * Compute the normal transformation matrix from modelViewMatrix
         *
         * @param {Matrix4} matrix
         */
        static normalMatrix3(matrix) {
            let out = new Float32Array(9);
            let val = matrix.getArray();
            let a00 = val[0], a01 = val[1], a02 = val[2], a03 = val[3];
            let a10 = val[4], a11 = val[5], a12 = val[6], a13 = val[7];
            let a20 = val[8], a21 = val[9], a22 = val[10], a23 = val[11];
            let a30 = val[12], a31 = val[13], a32 = val[14], a33 = val[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det)
                return out;
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            return out;
        }
        /**
         * Rotate the matrix around x axis
         *
         * @param {Matrix4} matrix
         * @param {number} degrees
         */
        static rotateX(matrix, degrees) {
            let out = matrix.getArray();
            let s = Math.sin(degrees * _Math.deg2Rad);
            let c = Math.cos(degrees * _Math.deg2Rad);
            let a10 = out[4];
            let a11 = out[5];
            let a12 = out[6];
            let a13 = out[7];
            let a20 = out[8];
            let a21 = out[9];
            let a22 = out[10];
            let a23 = out[11];
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
        }
        /**
         * Rotate the matrix around y axis
         *
         * @param {Matrix4} matrix
         * @param {number} degrees
         */
        static rotateY(matrix, degrees) {
            let out = matrix.getArray();
            let s = Math.sin(degrees * _Math.deg2Rad);
            let c = Math.cos(degrees * _Math.deg2Rad);
            let a00 = out[0];
            let a01 = out[1];
            let a02 = out[2];
            let a03 = out[3];
            let a20 = out[8];
            let a21 = out[9];
            let a22 = out[10];
            let a23 = out[11];
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
        }
        /**
         * Rotate the matrix around z axis
         *
         * @param {Matrix4} matrix
         * @param {number} degrees
         */
        static rotateZ(matrix, degrees) {
            let out = matrix.getArray();
            let s = Math.sin(degrees * _Math.deg2Rad);
            let c = Math.cos(degrees * _Math.deg2Rad);
            let a00 = out[0];
            let a01 = out[1];
            let a02 = out[2];
            let a03 = out[3];
            let a10 = out[4];
            let a11 = out[5];
            let a12 = out[6];
            let a13 = out[7];
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
        }
        /**
         * Carry out matrix by matrix multiplication
         *
         * @param {Matrix4} result
         * @param {Matrix4} m1 - the first operand of the multiplication
         * @param {Matrix4} m2 - the second operand of the multiplication
         */
        static multiply(result, m1, m2) {
            let a = m1.getArray();
            let b = m2.getArray();
            let out = result.getArray();
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        }
        /**
         * Returns the perspective projection matrix computed with the given parameters
         *
         * @param {Matrix4} result
         * @param {number} fovy
         * @param {number} aspect
         * @param {number} near
         * @param {number} far
         */
        static perspective(result, fovy, aspect, near, far) {
            let out = result.getArray();
            let f = 1.0 / Math.tan(fovy / 2), nf;
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[15] = 0;
            if (far != null && far !== Infinity) {
                nf = 1 / (near - far);
                out[10] = (far + near) * nf;
                out[14] = (2 * far * near) * nf;
            }
            else {
                out[10] = -1;
                out[14] = -2 * near;
            }
            return out;
        }
        /**
         * Returns the orthographic projection matrix computed with the given parameters
         *
         * @param {Matrix4} result
         * @param {number} left
         * @param {number} right
         * @param {number} bottom
         * @param {number} top
         * @param {number} near
         * @param {number} far
         */
        static ortho(result, left, right, bottom, top, near, far) {
            let lr = 1 / (left - right);
            let bt = 1 / (bottom - top);
            let nf = 1 / (near - far);
            let out = result.getArray();
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
        }
        /**
         * Compute a transformation matrix looking at the target
         *
         * @param {Matrix4} result
         * @param {Vector3} eye - eye position
         * @param {Vector3} target - target position
         * @param {Vector3} up - up direction
         */
        static targetTo(result, eye, target, up) {
            let matrix = result.getArray();
            let eye_x = eye.x, eye_y = eye.y, eye_z = eye.z, upx = up.x, upy = up.y, upz = up.z;
            let z0 = eye_x - target.x, z1 = eye_y - target.y, z2 = eye_z - target.z;
            let len = z0 * z0 + z1 * z1 + z2 * z2;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                z0 *= len;
                z1 *= len;
                z2 *= len;
            }
            let x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
            len = x0 * x0 + x1 * x1 + x2 * x2;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            matrix[0] = x0;
            matrix[1] = x1;
            matrix[2] = x2;
            matrix[3] = 0;
            matrix[4] = z1 * x2 - z2 * x1;
            matrix[5] = z2 * x0 - z0 * x2;
            matrix[6] = z0 * x1 - z1 * x0;
            matrix[7] = 0;
            matrix[8] = z0;
            matrix[9] = z1;
            matrix[10] = z2;
            matrix[11] = 0;
            matrix[12] = eye_x;
            matrix[13] = eye_y;
            matrix[14] = eye_z;
            matrix[15] = 1;
        }
    }

    class ElementArrayBuffer {
        constructor(data, itemSize) {
            /**
             * Reference to the WebGL API
             *
             * @private
             * @type {WebGLRenderingContext}
             */
            this._gl = getWebGL();
            /**

             * Number of elements
             *
             * @private
             * @type {number}
             */
            this._numItems = data.length / itemSize;
            let buffer = this._gl.createBuffer();
            if (buffer == null) {
                throw new Error("Cannot create Buffer");
            }
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, buffer);
            this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, data, this._gl.STATIC_DRAW);
            /**
             * Reference to the buffer in the GPU
             *
             * @private
             * @type {WebGLBuffer}
             */
            this._buffer = buffer;
        }
        /**
         * Bind the buffer
         */
        bind() {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._buffer);
        }
        /**
         * Unbind the buffer
         */
        unbind() {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
        }
        /**
         * Update the data into the GPU memory buffer
         *
         * @param {Float32Array} data - the new data
         */
        update(data) {
            this._numItems = data.length;
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            this._gl.bufferSubData(this._gl.ELEMENT_ARRAY_BUFFER, 0, data);
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
        }
        /**
         * Number of element
         *
         * @return {number}
         */
        get numItems() {
            return this._numItems;
        }
        /**
         * Reference to the buffer
         *
         * @return {WebGLBuffer}
         */
        get buffer() {
            return this._buffer;
        }
        /**
         * frees the memory
         */
        dispose() {
            this._gl.deleteBuffer(this._buffer);
            delete this._buffer;
        }
    }

    class ArrayBuffer {
        constructor(data, itemSize) {
            /**
             * Reference to the WebGL API
             *
             * @private
             * @type {WebGLRenderingContext}
             */
            this._gl = getWebGL();
            /**
             * Number of items per element
             *
             * @private
             * @type {number}
             */
            this._itemSize = itemSize;
            /**

             * Number of elements
             *
             * @private
             * @type {number}
             */
            this._numItems = data.length / itemSize;
            let buffer = this._gl.createBuffer();
            if (buffer == null) {
                throw new Error("Cannot create Buffer");
            }
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, data, this._gl.STATIC_DRAW);
            /**
             * Reference to the buffer in the GPU
             *
             * @private
             * @type {WebGLBuffer}
             */
            this._buffer = buffer;
        }
        /**
         * Bind the buffer
         */
        bind() {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
        }
        /**
         * Unbind the buffer
         */
        unbind() {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        }
        /**
         * Update the data into the GPU memory buffer
         *
         * @param {Float32Array} data - the new data
         */
        update(data) {
            this._numItems = data.length / this._itemSize;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, data);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        }
        /**
         * Bind the buffer to an attribute
         *
         * @param {GLuint} index
         * @param {GLint} size
         * @param {GLenum} type
         * @param {GLboolean} normalized
         * @param {GLsizei} stride
         * @param {GLintptr} offset
         */
        setAttributePointer(index, size, type, normalized, stride, offset) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
            this._gl.vertexAttribPointer(index, size || this._itemSize, type || this._gl.FLOAT, normalized || false, stride || 0, offset || 0);
            this._gl.enableVertexAttribArray(index);
        }
        /**
         * Number of items per element
         *
         * @return {number}
         */
        get itemSize() {
            return this._itemSize;
        }
        /**
         * Number of element
         *
         * @return {number}
         */
        get numItems() {
            return this._numItems;
        }
        /**
         * Reference to the buffer
         *
         * @return {WebGLBuffer}
         */
        get buffer() {
            return this._buffer;
        }
        /**
         * frees the memory
         */
        dispose() {
            this._gl.deleteBuffer(this._buffer);
            delete this._buffer;
        }
    }

    /**
     * Class representing a generic Geometry
     */
    class Geometry {
        /**
         * Geometry constructor
         *
         * @param {Float32Array} vertices
         * @param {Uint16Array | Uint32Array} indices
         * @param {Float32Array} normals
         * @param {Float32Array} uvs
         * @param {Float32Array} colors
         */
        constructor(vertices, indices, normals, uvs, colors) {
            this._indexBuffer = null;
            this._normalBuffer = null;
            this._uvBuffer = null;
            this._colorBuffer = null;
            this._tangentBuffer = null;
            this._biTangentBuffer = null;
            this._gl = getWebGL();
            this._positionsBuffer = new ArrayBuffer(vertices, 3);
            if (indices) {
                this._indexBuffer = new ElementArrayBuffer(indices, 1);
            }
            if (normals) {
                this._normalBuffer = new ArrayBuffer(normals, 3);
            }
            if (uvs) {
                this._uvBuffer = new ArrayBuffer(uvs, 2);
            }
            if (colors) {
                this._colorBuffer = new ArrayBuffer(colors, 3);
            }
            this._tangentBuffer = null;
            this._biTangentBuffer = null;
        }
        /**
         * Sets the indices data
         *
         * @param {Uint16Array | Uint32Array} indices
         */
        setIndex(indices) {
            if (this._indexBuffer !== null) {
                this._indexBuffer.dispose();
            }
            this._indexBuffer = new ElementArrayBuffer(indices, 1);
        }
        /**
         * Sets the normals
         *
         * @param {Float32Array} normals
         */
        setNormals(normals) {
            if (this._normalBuffer !== null) {
                this._normalBuffer.dispose();
            }
            if (normals.length / 3 !== this._positionsBuffer.numItems) {
                console.warn("Invalid normals data! the normals will not be used");
                return;
            }
            this._normalBuffer = new ArrayBuffer(normals, 3);
        }
        /**
         * Sets the texture coordinates
         *
         * @param {Float32Array} uvs
         */
        setUVs(uvs) {
            if (this._uvBuffer !== null) {
                this._uvBuffer.dispose();
            }
            if (uvs.length / 2 !== this._positionsBuffer.numItems) {
                console.warn("Invalid uvs data! the normals will not be used");
                return;
            }
            this._uvBuffer = new ArrayBuffer(uvs, 2);
        }
        /**
         * Sets the vertices colors
         *
         * @param {Float32Array} colors
         */
        setColors(colors) {
            if (this._colorBuffer !== null) {
                this._colorBuffer.dispose();
            }
            if (colors.length / 3 !== this._positionsBuffer.numItems) {
                console.warn("Invalid colors data! the normals will not be used");
                return;
            }
            this._colorBuffer = new ArrayBuffer(colors, 2);
        }
        // TODO: calculate tangents and bi-tangents
        /*public calculateTangentsAndBitangents(): void {

            if (this._indexBuffer === null) {
                console.warn("Index buffer not defined. Cannot calculate Tangents and Bitangents");
                return;
            }

            if (this._normalBuffer === null) {
                console.warn("Vertex normals buffer not defined. Cannot calculate Tangents and Bitangents");
                return;
            }

            if (this._uvBuffer === null) {
                console.warn("Vertex texture coordinates buffer not defined. Cannot calculate Tangents and Bitangents");
                return;
            }

            const unpacked = {
                tangents: [...new Array(this._positionsBuffer.data.length)].map(_ => 0),
                biTangents: [...new Array(this._positionsBuffer.data.length)].map(_ => 0),
            };

            // Loop through all faces in the whole mesh
            const indices = this._indexBuffer.data;
            const vertices = this._positionsBuffer.data;
            const normals = this._normalBuffer.data;
            const uvs = this._uvBuffer.data;

            for (let i = 0; i < indices.length; i += 3) {
                const i0 = indices[i];
                const i1 = indices[i + 1];
                const i2 = indices[i + 2];

                const x_v0 = vertices[i0 * 3];
                const y_v0 = vertices[i0 * 3 + 1];
                const z_v0 = vertices[i0 * 3 + 2];

                const x_uv0 = uvs[i0 * 2];
                const y_uv0 = uvs[i0 * 2 + 1];

                const x_v1 = vertices[i1 * 3];
                const y_v1 = vertices[i1 * 3 + 1];
                const z_v1 = vertices[i1 * 3 + 2];

                const x_uv1 = uvs[i1 * 2];
                const y_uv1 = uvs[i1 * 2 + 1];

                const x_v2 = vertices[i2 * 3];
                const y_v2 = vertices[i2 * 3 + 1];
                const z_v2 = vertices[i2 * 3 + 2];

                const x_uv2 = uvs[i2 * 2];
                const y_uv2 = uvs[i2 * 2 + 1];

                const x_deltaPos1 = x_v1 - x_v0;
                const y_deltaPos1 = y_v1 - y_v0;
                const z_deltaPos1 = z_v1 - z_v0;

                const x_deltaPos2 = x_v2 - x_v0;
                const y_deltaPos2 = y_v2 - y_v0;
                const z_deltaPos2 = z_v2 - z_v0;

                const x_uvDeltaPos1 = x_uv1 - x_uv0;
                const y_uvDeltaPos1 = y_uv1 - y_uv0;

                const x_uvDeltaPos2 = x_uv2 - x_uv0;
                const y_uvDeltaPos2 = y_uv2 - y_uv0;

                const rInv = x_uvDeltaPos1 * y_uvDeltaPos2 - y_uvDeltaPos1 * x_uvDeltaPos2;
                const r = 1.0 / Math.abs(rInv < 0.0001 ? 1.0 : rInv);

                // Tangent
                const x_tangent = (x_deltaPos1 * y_uvDeltaPos2 - x_deltaPos2 * y_uvDeltaPos1) * r;
                const y_tangent = (y_deltaPos1 * y_uvDeltaPos2 - y_deltaPos2 * y_uvDeltaPos1) * r;
                const z_tangent = (z_deltaPos1 * y_uvDeltaPos2 - z_deltaPos2 * y_uvDeltaPos1) * r;

                // Bitangent
                const x_bitangent = (x_deltaPos2 * x_uvDeltaPos1 - x_deltaPos1 * x_uvDeltaPos2) * r;
                const y_bitangent = (y_deltaPos2 * x_uvDeltaPos1 - y_deltaPos1 * x_uvDeltaPos2) * r;
                const z_bitangent = (z_deltaPos2 * x_uvDeltaPos1 - z_deltaPos1 * x_uvDeltaPos2) * r;

                // Gram-Schmidt orthogonality
                const x_n0 = normals[i0 * 3];
                const y_n0 = normals[i0 * 3 + 1];
                const z_n0 = normals[i0 * 3 + 2];

                const x_n1 = normals[i1 * 3];
                const y_n1 = normals[i1 * 3 + 1];
                const z_n1 = normals[i1 * 3 + 2];

                const x_n2 = normals[i2 * 3];
                const y_n2 = normals[i2 * 3 + 1];
                const z_n2 = normals[i2 * 3 + 2];

                // Tangent
                const n0_dot_t = x_tangent * x_n0 + y_tangent * y_n0 + z_tangent * z_n0;
                const n1_dot_t = x_tangent * x_n1 + y_tangent * y_n1 + z_tangent * z_n1;
                const n2_dot_t = x_tangent * x_n2 + y_tangent * y_n2 + z_tangent * z_n2;

                const x_resTangent0 = x_tangent - x_n0 * n0_dot_t;
                const y_resTangent0 = y_tangent - y_n0 * n0_dot_t;
                const z_resTangent0 = z_tangent - z_n0 * n0_dot_t;

                const x_resTangent1 = x_tangent - x_n1 * n1_dot_t;
                const y_resTangent1 = y_tangent - y_n1 * n1_dot_t;
                const z_resTangent1 = z_tangent - z_n1 * n1_dot_t;

                const x_resTangent2 = x_tangent - x_n2 * n2_dot_t;
                const y_resTangent2 = y_tangent - y_n2 * n2_dot_t;
                const z_resTangent2 = z_tangent - z_n2 * n2_dot_t;

                const magTangent0 = Math.sqrt(
                    x_resTangent0 * x_resTangent0 + y_resTangent0 * y_resTangent0 + z_resTangent0 * z_resTangent0,
                );
                const magTangent1 = Math.sqrt(
                    x_resTangent1 * x_resTangent1 + y_resTangent1 * y_resTangent1 + z_resTangent1 * z_resTangent1,
                );
                const magTangent2 = Math.sqrt(
                    x_resTangent2 * x_resTangent2 + y_resTangent2 * y_resTangent2 + z_resTangent2 * z_resTangent2,
                );

                // Bitangent
                const n0_dot_bt = x_bitangent * x_n0 + y_bitangent * y_n0 + z_bitangent * z_n0;
                const n1_dot_bt = x_bitangent * x_n1 + y_bitangent * y_n1 + z_bitangent * z_n1;
                const n2_dot_bt = x_bitangent * x_n2 + y_bitangent * y_n2 + z_bitangent * z_n2;

                const x_resBitangent0 = x_bitangent - x_n0 * n0_dot_bt;
                const y_resBitangent0 = y_bitangent - y_n0 * n0_dot_bt;
                const z_resBitangent0 = z_bitangent - z_n0 * n0_dot_bt;

                const x_resBitangent1 = x_bitangent - x_n1 * n1_dot_bt;
                const y_resBitangent1 = y_bitangent - y_n1 * n1_dot_bt;
                const z_resBitangent1 = z_bitangent - z_n1 * n1_dot_bt;

                const x_resBitangent2 = x_bitangent - x_n2 * n2_dot_bt;
                const y_resBitangent2 = y_bitangent - y_n2 * n2_dot_bt;
                const z_resBitangent2 = z_bitangent - z_n2 * n2_dot_bt;

                const magBitangent0 = Math.sqrt(
                    x_resBitangent0 * x_resBitangent0 +
                    y_resBitangent0 * y_resBitangent0 +
                    z_resBitangent0 * z_resBitangent0,
                );

                const magBitangent1 = Math.sqrt(
                    x_resBitangent1 * x_resBitangent1 +
                    y_resBitangent1 * y_resBitangent1 +
                    z_resBitangent1 * z_resBitangent1,
                );

                const magBitangent2 = Math.sqrt(
                    x_resBitangent2 * x_resBitangent2 +
                    y_resBitangent2 * y_resBitangent2 +
                    z_resBitangent2 * z_resBitangent2,
                );

                unpacked.tangents[i0 * 3] += x_resTangent0 / magTangent0;
                unpacked.tangents[i0 * 3 + 1] += y_resTangent0 / magTangent0;
                unpacked.tangents[i0 * 3 + 2] += z_resTangent0 / magTangent0;

                unpacked.tangents[i1 * 3] += x_resTangent1 / magTangent1;
                unpacked.tangents[i1 * 3 + 1] += y_resTangent1 / magTangent1;
                unpacked.tangents[i1 * 3 + 2] += z_resTangent1 / magTangent1;

                unpacked.tangents[i2 * 3] += x_resTangent2 / magTangent2;
                unpacked.tangents[i2 * 3 + 1] += y_resTangent2 / magTangent2;
                unpacked.tangents[i2 * 3 + 2] += z_resTangent2 / magTangent2;

                unpacked.biTangents[i0 * 3] += x_resBitangent0 / magBitangent0;
                unpacked.biTangents[i0 * 3 + 1] += y_resBitangent0 / magBitangent0;
                unpacked.biTangents[i0 * 3 + 2] += z_resBitangent0 / magBitangent0;

                unpacked.biTangents[i1 * 3] += x_resBitangent1 / magBitangent1;
                unpacked.biTangents[i1 * 3 + 1] += y_resBitangent1 / magBitangent1;
                unpacked.biTangents[i1 * 3 + 2] += z_resBitangent1 / magBitangent1;

                unpacked.biTangents[i2 * 3] += x_resBitangent2 / magBitangent2;
                unpacked.biTangents[i2 * 3 + 1] += y_resBitangent2 / magBitangent2;
                unpacked.biTangents[i2 * 3 + 2] += z_resBitangent2 / magBitangent2;
            }

            this.setTangents(new Float32Array(unpacked.tangents));
            this.setBiTangents(new Float32Array(unpacked.biTangents));
        }*/
        /**
         * Frees the GPU memory
         */
        dispose() {
            if (this._indexBuffer !== null) {
                this._indexBuffer.dispose();
                this._indexBuffer = null;
            }
            if (this._normalBuffer !== null) {
                this._normalBuffer.dispose();
                this._normalBuffer = null;
            }
            if (this._uvBuffer !== null) {
                this._uvBuffer.dispose();
                this._uvBuffer = null;
            }
            if (this._tangentBuffer !== null) {
                this._tangentBuffer.dispose();
                this._tangentBuffer = null;
            }
            if (this._biTangentBuffer !== null) {
                this._biTangentBuffer.dispose();
                this._biTangentBuffer = null;
            }
            if (this._colorBuffer !== null) {
                this._colorBuffer.dispose();
                this._colorBuffer = null;
            }
        }
        /**
         * Return the reference to the position buffer
         *
         * @return {ArrayBuffer}
         */
        get positionBuffer() {
            return this._positionsBuffer;
        }
        get indexBuffer() {
            return this._indexBuffer;
        }
        /**
         * Return the reference to the normals buffer if defined
         *
         * @return {ArrayBuffer | null}
         */
        get normalBuffer() {
            return this._normalBuffer;
        }
        /**
         * Return the reference to the texture coordinates buffer if defined
         *
         * @return {ArrayBuffer | null}
         */
        get uvBuffer() {
            return this._uvBuffer;
        }
        /**
         * Return the reference to the colors buffer if defined
         *
         * @return {ArrayBuffer | null}
         */
        get colorBuffer() {
            return this._colorBuffer;
        }
        /**
         * Return the reference to the tangents buffer if defined
         *
         * @return {ArrayBuffer | null}
         */
        get tangentBuffer() {
            return this._tangentBuffer;
        }
        /**
         * Return the reference to the bi-tangents buffer if defined
         *
         * @return {ArrayBuffer | null}
         */
        get biTangentBuffer() {
            return this._biTangentBuffer;
        }
        /**
         * Stars the drawing of the geometry
         *
         * @param {GLenum} drawMode
         * @param {Program} program
         */
        draw(drawMode, program) {
            this._positionsBuffer.setAttributePointer(program.vertexPosition);
            if (this._normalBuffer != null && program.vertexNormal !== null) {
                this._normalBuffer.setAttributePointer(program.vertexNormal);
            }
            if (this._uvBuffer != null && program.vertexUV !== null) {
                this._uvBuffer.setAttributePointer(program.vertexUV);
            }
            /*
                    if (this._colorBuffer != null && program.vertexColor !== null) {
                        this._colorBuffer.setAttributePointer(program.vertexColor);
                    }
            
                    if (this._tangentBuffer != null && program.vertexTangent !== null) {
                        this._tangentBuffer.setAttributePointer(program.vertexTangent);
                    }
            
                    if (this._biTangentBuffer != null && program.vertexBiTangent !== null) {
                        this._biTangentBuffer.setAttributePointer(program.vertexBiTangent);
                    }*/
            if (this._indexBuffer) {
                this._indexBuffer.bind();
                this._gl.drawElements(drawMode, this._indexBuffer.numItems, this._gl.UNSIGNED_SHORT, 0);
            }
            else {
                this._positionsBuffer.bind();
                this._gl.drawArrays(drawMode, 0, this._positionsBuffer.numItems);
            }
        }
    }

    /**
     * Class representing a line. It generate data for a line geometry
     */
    class LineGeometry extends Geometry {
        /**
         * LineGeometry constructor
         *
         * @param {number} x1
         * @param {number} y1
         * @param {number} z1
         * @param {number} x2
         * @param {number} y2
         * @param {number} z2
         */
        constructor(x1, y1, z1, x2, y2, z2) {
            super(new Float32Array([x1, y1, z1, x2, y2, z2]));
        }
    }

    /**
     * Class representing a Plane. It generate data for a plane geometry
     */
    class PlaneGeometry extends Geometry {
        /**
         * PlaneGeometry constructor
         *
         * @param {string} axis
         * @param {number} width
         * @param {number} height
         * @param {number} widthSegments
         * @param {number} heightSegments
         * @param {Float32Array} colors
         */
        constructor(axis = "XY", width = 1, height = 1, widthSegments = 1, heightSegments = 1, colors) {
            let plane = PlaneGeometry.generate(axis, width, height, widthSegments, heightSegments);
            super(new Float32Array(plane.vertices), new Uint16Array(plane.indices), new Float32Array(plane.normals), new Float32Array(plane.uvs), colors);
        }
        /**
         * Generate plane data
         *
         * @param {string} axis
         * @param {number} width
         * @param {number} height
         * @param {number} widthSegments
         * @param {number} heightSegments
         */
        static generate(axis = "XY", width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
            let vertices = [];
            let normals = [];
            let uvs = [];
            const indices = [];
            const spacerX = width / widthSegments;
            const spacerY = height / heightSegments;
            const offsetX = -width * 0.5;
            const offsetY = -height * 0.5;
            const spacerU = 1 / widthSegments;
            const spacerV = 1 / heightSegments;
            let index = 0;
            for (let y = 0; y < heightSegments; y += 1) {
                for (let x = 0; x < widthSegments; x += 1) {
                    const triangleX = spacerX * x + offsetX;
                    const triangleY = spacerY * y + offsetY;
                    const u = x / widthSegments;
                    const v = y / heightSegments;
                    switch (axis) {
                        case 'XZ': {
                            vertices = vertices.concat([triangleX, 0, triangleY]);
                            vertices = vertices.concat([triangleX + spacerX, 0, triangleY]);
                            vertices = vertices.concat([
                                triangleX + spacerX,
                                0,
                                triangleY + spacerY
                            ]);
                            vertices = vertices.concat([triangleX, 0, triangleY + spacerY]);
                            normals = normals.concat([0, 1, 0]);
                            normals = normals.concat([0, 1, 0]);
                            normals = normals.concat([0, 1, 0]);
                            normals = normals.concat([0, 1, 0]);
                            uvs = uvs.concat([u, 1 - v]);
                            uvs = uvs.concat([u + spacerU, 1 - v]);
                            uvs = uvs.concat([u + spacerU, 1 - (v + spacerV)]);
                            uvs = uvs.concat([u, 1 - (v + spacerV)]);
                            break;
                        }
                        case 'YZ': {
                            vertices = vertices.concat([0, triangleY, triangleX]);
                            vertices = vertices.concat([0, triangleY, triangleX + spacerX]);
                            vertices = vertices.concat([
                                0,
                                triangleY + spacerY,
                                triangleX + spacerX
                            ]);
                            vertices = vertices.concat([0, triangleY + spacerY, triangleX]);
                            normals = normals.concat([1, 0, 0]);
                            normals = normals.concat([1, 0, 0]);
                            normals = normals.concat([1, 0, 0]);
                            normals = normals.concat([1, 0, 0]);
                            uvs = uvs.concat([1 - u, v]);
                            uvs = uvs.concat([1 - (u + spacerU), v]);
                            uvs = uvs.concat([1 - (u + spacerU), v + spacerV]);
                            uvs = uvs.concat([1 - u, v + spacerV]);
                            break;
                        }
                        default: {
                            vertices = vertices.concat([triangleX, triangleY, 0]);
                            vertices = vertices.concat([triangleX + spacerX, triangleY, 0]);
                            vertices = vertices.concat([
                                triangleX + spacerX,
                                triangleY + spacerY,
                                0
                            ]);
                            vertices = vertices.concat([triangleX, triangleY + spacerY, 0]);
                            normals = normals.concat([0, 0, 1]);
                            normals = normals.concat([0, 0, 1]);
                            normals = normals.concat([0, 0, 1]);
                            normals = normals.concat([0, 0, 1]);
                            uvs = uvs.concat([u, v]);
                            uvs = uvs.concat([u + spacerU, v]);
                            uvs = uvs.concat([u + spacerU, v + spacerV]);
                            uvs = uvs.concat([u, v + spacerV]);
                        }
                    }
                    indices.push(index * 4);
                    indices.push(index * 4 + 1);
                    indices.push(index * 4 + 2);
                    indices.push(index * 4);
                    indices.push(index * 4 + 2);
                    indices.push(index * 4 + 3);
                    index += 1;
                }
            }
            return {
                vertices: vertices,
                indices: indices,
                normals: normals,
                uvs: uvs
            };
        }
    }

    /**
     * Class representing a Plane. It generate data for a box geometry
     */
    class BoxGeometry extends Geometry {
        /**
         * BoxGeometry constructor
         *
         * @param {number} width
         * @param {number} height
         * @param {number} depth
         * @param {number} widthSegments
         * @param {number} heightSegments
         * @param {number} depthSegments
         * @param {Float32Array} colors
         */
        constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1, colors) {
            const vertices = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];
            for (let i = 0; i < vertices.length; i += 3) {
                vertices[i] *= width;
                vertices[i + 1] *= height;
                vertices[i + 2] *= depth;
            }
            const indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
            const normals = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
            const uvs = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
            super(new Float32Array(vertices), new Uint16Array(indices), new Float32Array(normals), new Float32Array(uvs), colors);
        }
    }

    /**
     * Class representing a Sphere. It generate data for a sphere geometry
     */
    class SphereGeometry extends Geometry {
        /**
         * SphereGeometry constructor
         *
         * @param {number} radius
         * @param {number} axisDivisions
         * @param {number} heightDivisions
         * @param {Float32Array} colors
         */
        constructor(radius = 1, axisDivisions = 8, heightDivisions = 8, colors) {
            let sphere = SphereGeometry.generate(radius, axisDivisions, heightDivisions);
            super(new Float32Array(sphere.vertices), new Uint16Array(sphere.indices), new Float32Array(sphere.normals), new Float32Array(sphere.uvs), colors);
        }
        /**
         * Generate sphere data
         *
         * @param {number} radius
         * @param {number} axisDivisions
         * @param {number} heightDivisions
         */
        static generate(radius = 1, axisDivisions = 8, heightDivisions = 8) {
            const vertices = [];
            const normals = [];
            const uvs = [];
            for (let axisNumber = 0; axisNumber <= axisDivisions; axisNumber += 1) {
                const theta = axisNumber * Math.PI / axisDivisions;
                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);
                for (let heightNumber = 0; heightNumber <= heightDivisions; heightNumber += 1) {
                    const phi = heightNumber * 2 * Math.PI / heightDivisions;
                    const sinPhi = Math.sin(phi);
                    const cosPhi = Math.cos(phi);
                    const x = cosPhi * sinTheta;
                    const y = cosTheta;
                    const z = sinPhi * sinTheta;
                    const u = 1 - heightNumber / heightDivisions;
                    const v = 1 - axisNumber / axisDivisions;
                    normals.push(x);
                    normals.push(y);
                    normals.push(z);
                    uvs.push(u);
                    uvs.push(v);
                    vertices.push(radius / 2 * x);
                    vertices.push(radius / 2 * y);
                    vertices.push(radius / 2 * z);
                }
            }
            const indices = [];
            for (let axisNumber = 0; axisNumber < axisDivisions; axisNumber += 1) {
                for (let heightNumber = 0; heightNumber < heightDivisions; heightNumber += 1) {
                    const first = axisNumber * (heightDivisions + 1) + heightNumber;
                    const second = first + heightDivisions + 1;
                    indices.push(first);
                    indices.push(second);
                    indices.push(first + 1);
                    indices.push(second);
                    indices.push(second + 1);
                    indices.push(first + 1);
                }
            }
            return {
                vertices: vertices,
                indices: indices,
                normals: normals,
                uvs: uvs
            };
        }
    }

    /**
     * Class from which every entity in the scene inheres
     */
    class Base {
        /**
         * Base constructor
         *
         * @param {string} name - name of the object
         * @param {number} type - type of the object
         */
        constructor(name, type) {
            /**
             * The type of object of the current Base instance
             *
             * @type {number}
             * @protected
             */
            this._type = type;
            /**
             * The name of object of the current Base instance
             *
             * @type {string}
             * @protected
             */
            this._name = name;
            /**
             * Unique identifier generated at creation time
             *
             * @type {string}
             * @protected
             */
            this._uuid = _Math.UUIDv4();
            /**
             * Unique color used for object selection
             *
             * @type {Color}
             * @protected
             */
            this._pickColor = new Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 255);
        }
        /**
         * Get the UUID of this object
         *
         * @return {string} uuid - the identifier of this object instance
         */
        get uuid() {
            return this._uuid;
        }
        /**
         * Return the name of this object
         *
         * @return {string}
         */
        get name() {
            return this._name;
        }
        /**
         * Sets the name of this object
         *
         * @param {string} name
         */
        set name(name) {
            this._name = name;
        }
        /**
         * Get the type of this object
         *
         * @return {number} type - the type of this object instance
         */
        get type() {
            return this._type;
        }
        /**
         * Get the pick color of this object
         *
         * @return {Color}
         */
        get pickColor() {
            return this._pickColor;
        }
        /**
         * Helper function tu get the nee of the object
         *
         * @param {string} baseName
         * @param {number} count
         * @param {string} name
         */
        static getName(baseName, count, name) {
            if (!name) {
                let name = baseName;
                let counter = count;
                if (counter > 0) {
                    name += " " + counter.toString();
                }
                counter++;
                return { name: name, counter: counter };
            }
            else {
                return { name: name, counter: count };
            }
        }
    }

    /**
     * Class representing a generic node in the hierarchical model
     */
    class Node extends Base {
        /**
         * Node constructor
         *
         * @param {string} name - name of the object
         * @param {number} type - type of the object
         */
        constructor(name, type) {
            super(name, type);
            /**
             * The set of children nodes
             *
             * @type {Node[]}
             * @protected
             */
            this._children = [];
            /**
             * The parent node
             *
             * @type {Node | null}
             * @protected
             */
            this._parent = null;
            /**
             * Indicates tha this node is a root node
             *
             * @type {boolean}
             * @protected
             */
            this._isRoot = true;
            /**
             * Indicates tha this node is hidden
             *
             * @type {boolean}
             * @protected
             */
            this._hidden = false;
            /**
             * Indicates tha this node is selected
             *
             * @type {boolean}
             * @protected
             */
            this._selected = false;
        }
        /**
         * Set the parent node to null. This node became a root node
         *
         * @return {Node | null}
         */
        unsetParent() {
            if (this._parent === null)
                return null;
            let parent = this._parent;
            // remove this child from the list of the parent children
            const childIndex = parent.children.indexOf(this);
            if (childIndex !== -1) {
                parent.children.splice(childIndex, 1);
            }
            // remove the parent
            this._parent = null;
            // make it root
            this._isRoot = true;
            return parent;
        }
        /**
         * Set the parent node of this node. Returns the old parent if was set or null
         *
         * @param {Node} parent
         * @return {Node | null}
         */
        setParent(parent) {
            if (parent.uuid === this.uuid) {
                console.warn("Trying to set a loop parent-child relation");
                return null;
            }
            let oldParent = this.unsetParent();
            parent.children.push(this);
            this._parent = parent;
            this._isRoot = false;
            return oldParent;
        }
        /**
         * Select this node
         */
        select() {
            this._selected = true;
        }
        /**
         * Unselect this node
         */
        unselect() {
            this._selected = false;
            return this;
        }
        /**
         * Make this node visible in the scene
         */
        show() {
            this._hidden = false;
        }
        /**
         * Hide this node in the scene
         */
        hide() {
            this._hidden = true;
        }
        /**
         * Switch from hide to she and vice-versa
         */
        hide_show() {
            this._hidden = !this._hidden;
        }
        /**
         * Return true if this node is a root node
         *
         * @return {boolean}
         */
        get isRoot() {
            return this._isRoot;
        }
        /**
         * Return true if this node is selected
         *
         * @return {boolean}
         */
        get isSelected() {
            return this._selected;
        }
        /**
         * Return true if this node is visible
         *
         * @return {boolean}
         */
        get isVisible() {
            return !this._hidden;
        }
        /**
         * Returns the parent node
         *
         * @return {Node | null}
         */
        get parent() {
            return this._parent;
        }
        /**
         * Returns the list of children nodes
         *
         * @return {Node[]}
         */
        get children() {
            return this._children;
        }
    }

    /**
     * Class representing a generic entity subject to transformations in the scene
     */
    class Object3D extends Node {
        /**
         * Object3D constructor
         *
         * @param {string} name
         * @param {number} type
         */
        constructor(name, type) {
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
        applyTransformations() {
            if (this._target !== null) {
                Matrix4.targetTo(this._localMatrix, this._translation, this._target, this._upDirection.reduce());
                this._localMatrix.translate(this._pivot);
            }
            else {
                this._localMatrix.reset().translate(Vector3.add(this._translation, this._pivot)).rotate(this._rotation).translate(Vector3.sub(new Vector3(), this._pivot)).scale(this._scale);
            }
            this._forwardDirection.set(0, 0, 1, 0).transform(this._localMatrix);
            this._upDirection.set(0, 1, 0, 0).transform(this._localMatrix);
            this._rightDirection.set(1, 0, 0, 0).transform(this._localMatrix);
            if (this._parent != null && this._parent instanceof Object3D) {
                Matrix4.multiply(this._modelMatrix, this._parent.transformationMatrix, this._localMatrix);
            }
            else {
                this._localMatrix.copyTo(this._modelMatrix);
            }
        }
        /**
         * Set the target to look
         *
         * @param {Vector3} target
         */
        setTarget(target) {
            this._target = target;
        }
        /**
         * Set the previously set target to look
         */
        unsetTarget() {
            this._target = null;
        }
        /**
         * Gets the translation vector
         *
         * @return {Vector3}
         */
        get translate() {
            return this._translation;
        }
        /**
         * Gets the rotation vector
         *
         * @return {Vector3}
         */
        get rotate() {
            return this._rotation;
        }
        /**
         * Gets the scales vector
         *
         * @return {Vector3}
         */
        get scale() {
            return this._scale;
        }
        /**
         * Gets the pivot translation vector
         *
         * @return {Vector3}
         */
        get pivot() {
            return this._pivot;
        }
        /**
         * Gets the up direction vector
         *
         * @return {Vector4}
         */
        get upDirection() {
            return this._upDirection;
        }
        /**
         * Gets the right direction vector
         *
         * @return {Vector4}
         */
        get rightDirection() {
            return this._rightDirection;
        }
        /**
         * Gets the forward direction vector
         *
         * @return {Vector4}
         */
        get forwardDirection() {
            return this._forwardDirection;
        }
        /**
         * Gets the global transformation matrix
         *
         * @return {Matrix4}
         */
        get transformationMatrix() {
            return this._modelMatrix;
        }
        /**
         * Reset all properties of the object to initial state
         */
        reset() {
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

    class Program {
        constructor(vertexShaderSource, fragmentShaderSource) {
            this._gl = getWebGL();
            this._shader = Program._createProgram(this._gl, vertexShaderSource, fragmentShaderSource);
            // @ts-ignore
            this._projectionMatrixLoc = this._gl.getUniformLocation(this._shader, "projectionMatrix");
            // @ts-ignore
            this._viewMatrixLoc = this._gl.getUniformLocation(this._shader, "viewMatrix");
            // @ts-ignore
            this._modelMatrixLoc = this._gl.getUniformLocation(this._shader, "modelMatrix");
            // @ts-ignore
            this._vertexPosition = this._gl.getAttribLocation(this._shader, "vertexPosition");
            this._vertexNormal = this._gl.getAttribLocation(this._shader, "vertexNormal");
            this._vertexUV = this._gl.getAttribLocation(this._shader, "vertexUV");
            this._vertexColor = this._gl.getAttribLocation(this._shader, "vertexColor");
            this._vertexTangent = this._gl.getAttribLocation(this._shader, "vertexTangent");
            this._vertexBiTangent = this._gl.getAttribLocation(this._shader, "vertexBiTangent");
            this._normalMatrixLoc = this._gl.getUniformLocation(this._shader, "normalMatrix");
            this._materialAmbient = this._gl.getUniformLocation(this._shader, "materialAmbient");
            this._materialDiffuse = this._gl.getUniformLocation(this._shader, "materialDiffuse");
            this._materialSpecular = this._gl.getUniformLocation(this._shader, "materialSpecular");
            this._materialShininess = this._gl.getUniformLocation(this._shader, "materialShininess");
            this._textureLoc = this._gl.getUniformLocation(this._shader, "texture");
        }
        use() {
            this._gl.useProgram(this._shader);
        }
        getUniformLocation(name) {
            return this._gl.getUniformLocation(this._shader, name);
        }
        getAttributeLocation(name) {
            return this._gl.getAttribLocation(this._shader, name);
        }
        get vertexPosition() {
            return this._vertexPosition;
        }
        get projectionMatrix() {
            return this._projectionMatrixLoc;
        }
        get viewMatrix() {
            return this._viewMatrixLoc;
        }
        get modelMatrix() {
            return this._modelMatrixLoc;
        }
        get vertexNormal() {
            return this._vertexNormal;
        }
        get vertexColor() {
            return this._vertexColor;
        }
        get vertexUV() {
            return this._vertexUV;
        }
        get vertexTangent() {
            return this._vertexTangent;
        }
        get vertexBiTangent() {
            return this._vertexBiTangent;
        }
        get normalMatrix() {
            return this._normalMatrixLoc;
        }
        get materialAmbient() {
            return this._materialAmbient;
        }
        get materialDiffuse() {
            return this._materialDiffuse;
        }
        get materialSpecular() {
            return this._materialSpecular;
        }
        get materialShininess() {
            return this._materialShininess;
        }
        get texture() {
            return this._textureLoc;
        }
        static _createShader(gl, src, type) {
            let shader = gl.createShader(type);
            if (shader == null) {
                throw new Error("Cannot create Shader");
            }
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error("Error compiling shader : " + src + " \nERROR: " + gl.getShaderInfoLog(shader));
            }
            return shader;
        }
        static _createProgram(gl, vertexShaderSrc, fragmentShaderSrc, doValidate = false) {
            let vShader = Program._createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
            let fShader = Program._createShader(gl, fragmentShaderSrc, gl.FRAGMENT_SHADER);
            let program = gl.createProgram();
            if (program == null) {
                throw new Error("Cannot create Program");
            }
            gl.attachShader(program, vShader);
            gl.attachShader(program, fShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error("Error creating shader program: " + gl.getProgramInfoLog(program));
            }
            if (doValidate) {
                gl.validateProgram(program);
                if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                    throw new Error("Error validating program: " + gl.getProgramInfoLog(program));
                }
            }
            gl.detachShader(program, vShader);
            gl.detachShader(program, fShader);
            gl.deleteShader(fShader);
            gl.deleteShader(vShader);
            return program;
        }
    }

    const cameraUniforms = "\n" +
        "uniform mat4 viewMatrix;\n" +
        "uniform mat4 projectionMatrix;\n" +
        "uniform mat4 modelMatrix;\n" +
        "\n";
    function LambertDirectionalLightUniforms(n) {
        return "uniform vec4 DLightsDiffuse[" + n + "];\n";
    }
    function LambertPointLightUniforms(n) {
        return "uniform vec4 PLightsDiffuse[" + n + "];\n";
    }
    function lightDirections(n) {
        return "uniform vec3 DLightsDirection[" + n + "];\n";
    }
    function lightPositions(n) {
        return "uniform vec3 PLightsPosition[" + n + "];\n";
    }

    class Parser {
        static createProgram(geometry, material, lights) {
            let vertexSource = "";
            let fragmentSource = "";
            if (material.type === LAMBERT_MATERIAL) {
                vertexSource = Parser._parseLambertVertexShader(geometry, material, lights);
                fragmentSource = Parser._parseLambertFragmentShader(geometry, material, lights);
            }
            else {
                vertexSource = Parser._parsePhongVertexShader(geometry, material, lights);
                fragmentSource = Parser._parsePhongFragmentShader(geometry, material, lights);
            }
            return new Program(vertexSource, fragmentSource);
        }
        static _parseLambertVertexShader(geometry, material, lights) {
            let source = "attribute vec3 vertexPosition;\n";
            source += cameraUniforms;
            source += "\nuniform vec4 materialDiffuse;\n";
            if (lights && geometry.normalBuffer != null && (lights.isPointLights || lights.isDirectionaLights)) {
                source += "attribute vec3 vertexNormal;\n";
                source += "uniform mat4 normalMatrix;\n\n";
                if (lights.isDirectionaLights) {
                    source += lightDirections(lights.directionalLights.length);
                    source += LambertDirectionalLightUniforms(lights.directionalLights.length);
                }
                if (lights.isPointLights) {
                    source += lightPositions(lights.pointLights.length);
                    source += LambertPointLightUniforms(lights.pointLights.length);
                }
            }
            if (geometry.uvBuffer != null && material.texture !== null) {
                source += "attribute vec2 vertexUV;\n";
                source += "varying vec2 uv;\n";
            }
            if (geometry.colorBuffer !== null) {
                source += "attribute vec4 vertexColor;\n";
            }
            source += "varying vec4 color;\n";
            //===== MAIN ===============
            source += "void main(void){\n";
            if (geometry.uvBuffer != null && material.texture !== null) {
                source += "uv = vertexUV;\n";
            }
            if (lights && (lights.isPointLights || lights.isDirectionaLights) && geometry.normalBuffer != null) {
                source += "\tmat4 modelViewMatrix = viewMatrix * modelMatrix;\n";
                source += "\n\tvec3 N = vec3(normalMatrix * vec4(vertexNormal, 1.0));\n";
                source += "\tvec4 Id = vec4(0,0,0,0);\n";
                if (lights.isDirectionaLights) {
                    source += "\tfor(int i=0; i < " + lights.directionalLights.length + "; i++){\n";
                    source += "\t\tvec3 L = normalize(DLightsDirection[i]);\n";
                    source += "\t\tfloat lambertTerm = dot(N, -L);\n";
                    source += "\t\tId += materialDiffuse * DLightsDiffuse[i] * lambertTerm;\n\t}\n\n";
                }
                if (lights.isPointLights) {
                    source += "\tvec4 position = (modelViewMatrix * vec4(vertexPosition, 1.0));\n";
                    source += "\tfor(int i=0; i < " + lights.pointLights.length + "; i++){\n";
                    source += "\t\tvec3 L = normalize(position.xyz - PLightsPosition[i]);\n";
                    source += "\t\tfloat lambertTerm1 = dot(N, -L);\n";
                    source += "\t\tId += materialDiffuse * PLightsDiffuse[i] * lambertTerm1;\n\t}\n\n";
                }
                source += "\tgl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);\n";
                source += "\tcolor = vec4(Id.xyz, 1.0);\n";
            }
            else {
                source += "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix  * vec4(vertexPosition, 1);\n";
                source += "\tcolor = materialDiffuse;\n";
            }
            source += "}";
            return source;
        }
        static _parseLambertFragmentShader(geometry, material, lights) {
            let source = "precision mediump float;\n";
            source += "varying vec4 color;\n\n";
            if (geometry.uvBuffer != null && material.texture !== null) {
                source += "varying vec2 uv;\n";
                source += "uniform sampler2D texture;\n";
            }
            //===== MAIN ===============
            source += "void main(void){\n" +
                "\tvec4 finalColor = color;\n";
            if (geometry.uvBuffer != null && material.texture !== null) {
                source += "\tfinalColor = texture2D(texture, uv);\n";
            }
            source += "\t\ngl_FragColor = finalColor;" +
                "}";
            return source;
        }
        static _parsePhongVertexShader(geometry, material, lights) {
            let source = "attribute vec3 vertexPosition;\n";
            source += cameraUniforms;
            source += "\nuniform vec4 materialDiffuse;\n";
            if (lights && geometry.normalBuffer != null && (lights.isPointLights || lights.isDirectionaLights)) {
                source += "attribute vec3 vertexNormal;\n";
                source += "uniform mat4 normalMatrix;\n\n";
                if (lights.isDirectionaLights) {
                    source += lightDirections(lights.directionalLights.length);
                    source += LambertDirectionalLightUniforms(lights.directionalLights.length);
                }
                if (lights.isPointLights) {
                    source += lightPositions(lights.pointLights.length);
                    source += LambertPointLightUniforms(lights.pointLights.length);
                }
            }
            if (geometry.uvBuffer != null) {
                source += "attribute vec3 vertexUV;\n";
            }
            if (geometry.colorBuffer !== null) {
                source += "attribute vec4 vertexColor;\n";
            }
            source += "varying vec4 color;\n";
            //===== MAIN ===============
            source += "void main(void){\n";
            if (lights && (lights.isPointLights || lights.isDirectionaLights) && geometry.normalBuffer != null) {
                source += "\tmat4 modelViewMatrix = viewMatrix * modelMatrix;\n";
                source += "\n\tvec3 N = vec3(normalMatrix * vec4(vertexNormal, 1.0));\n";
                source += "\tvec4 Id = vec4(0,0,0,0);\n";
                if (lights.isDirectionaLights) {
                    source += "\tfor(int i=0; i < " + lights.directionalLights.length + "; i++){\n";
                    source += "\t\tvec3 L = normalize(DLightsDirection[i]);\n";
                    source += "\t\tfloat lambertTerm = dot(N, -L);\n";
                    source += "\t\tId += materialDiffuse * DLightsDiffuse[i] * lambertTerm;\n\t}\n\n";
                }
                if (lights.isPointLights) {
                    source += "\tvec4 position = (modelViewMatrix * vec4(vertexPosition, 1.0));\n";
                    source += "\tfor(int i=0; i < " + lights.pointLights.length + "; i++){\n";
                    source += "\t\tvec3 L = normalize(position.xyz - PLightsPosition[i]);\n";
                    source += "\t\tfloat lambertTerm1 = dot(N, -L);\n";
                    source += "\t\tId += materialDiffuse * PLightsDiffuse[i] * lambertTerm1;\n\t}\n\n";
                }
                source += "\tgl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);\n";
                source += "\tcolor = vec4(Id.xyz, 1.0);\n";
            }
            else {
                source += "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix  * vec4(vertexPosition, 1);\n";
                source += "\tcolor = materialDiffuse;\n";
            }
            source += "}";
            //console.log(source);
            return source;
        }
        static _parsePhongFragmentShader(geometry, material, lights) {
            let source = "precision mediump float;\n";
            source += "varying vec4 color;\n\n";
            //===== MAIN ===============
            source += "void main(void){\n" +
                "\t\ngl_FragColor = color;" +
                "}";
            return source;
        }
    }

    /**
     * Class representing entities that can be seen in the scene
     */
    class Renderable extends Object3D {
        constructor(name, type, geometry, material) {
            super(name, type);
            /**
             * Reference to WebGL API
             *
             * @type {WebGLRenderingContext}
             * @protected
             */
            this._gl = getWebGL();
            /**
             * Reference to the object geometry
             *
             * @type{Geometry}
             * @protected
             */
            this._geometry = geometry;
            /**
             * Reference to the object geometry
             *
             * @type{Geometry}
             * @protected
             */
            this._material = material;
            material.renderable = this;
            /**
             * Reference to the instance of shader program used to render this instance of renderable
             *
             * @type {Program}
             * @protected
             */
            this._program = Parser.createProgram(geometry, material);
            /**
             * Temporary reference to the light manager
             *
             * @type {LightsManager}
             * @private
             */
            this._lights = null;
            /**
             * The drawing method
             *
             * @type {GLenum}
             * @private
             */
            this._drawingMode = this._gl.TRIANGLES;
        }
        /**
         * Render the the mesh
         * @param {Camera} camera
         * @param {Light} lights
         */
        render(camera, lights) {
            if (this._hidden)
                return;
            this._program.use();
            this._setCameraUniforms(camera);
            this._gl.uniformMatrix4fv(this._program.modelMatrix, false, this.transformationMatrix.getFloat32Array());
            if (this._type !== POINT_LIGHT && this._type !== DIRECTIONAL_LIGHT) {
                this._setLightsUniforms(lights);
            }
            this._setMaterialUniforms();
            this._setTextures();
            this._geometry.draw(this._drawingMode, this._program);
        }
        /**
         * Send camera data to the GPU uniform locations
         *
         * @param {Camera} camera
         * @private
         */
        _setCameraUniforms(camera) {
            this._gl.uniformMatrix4fv(this._program.viewMatrix, false, camera.viewMatrix.getFloat32Array());
            this._gl.uniformMatrix4fv(this._program.projectionMatrix, false, camera.projectionMatrix.getFloat32Array());
            if (this._program.normalMatrix != null) {
                let normalMatrix = new Matrix4();
                Matrix4.multiply(normalMatrix, camera.viewMatrix, this._modelMatrix);
                this._gl.uniformMatrix4fv(this._program.normalMatrix, false, normalMatrix.transpose().getFloat32Array());
            }
        }
        /**
         * Send lights data to the GPU uniform locations
         *
         * @param {LightsManager} lights
         * @private
         */
        _setLightsUniforms(lights) {
            if (!lights)
                return;
            let dLights = lights.directionalLights;
            for (let i = 0; i < dLights.length; i++) {
                this._gl.uniform3fv(this._program.getUniformLocation("DLightsDirection[" + i + "]"), dLights[i].translate.getFloat32Array());
                this._gl.uniform4fv(this._program.getUniformLocation("DLightsAmbient[" + i + "]"), dLights[i].ambientColor.multiplyScalar(dLights[i].ambientIntensity).clone().normalize().getFloat32Array());
                this._gl.uniform4fv(this._program.getUniformLocation("DLightsDiffuse[" + i + "]"), dLights[i].diffuseColor.multiplyScalar(dLights[i].diffuseIntensity).clone().normalize().getFloat32Array());
                this._gl.uniform4fv(this._program.getUniformLocation("DLightsSpecular[" + i + "]"), dLights[i].specularColor.multiplyScalar(dLights[i].specularIntensity).clone().normalize().getFloat32Array());
            }
            let pLights = lights.pointLights;
            for (let i = 0; i < pLights.length; i++) {
                this._gl.uniform3fv(this._program.getUniformLocation("PLightsPosition[" + i + "]"), pLights[i].translate.getFloat32Array());
                this._gl.uniform4fv(this._program.getUniformLocation("PLightsAmbient[" + i + "]"), pLights[i].ambientColor.multiplyScalar(pLights[i].ambientIntensity).clone().normalize().getFloat32Array());
                this._gl.uniform4fv(this._program.getUniformLocation("PLightsDiffuse[" + i + "]"), pLights[i].diffuseColor.multiplyScalar(pLights[i].diffuseIntensity).clone().normalize().getFloat32Array());
                this._gl.uniform4fv(this._program.getUniformLocation("PLightsSpecular[" + i + "]"), pLights[i].specularColor.multiplyScalar(pLights[i].specularIntensity).clone().normalize().getFloat32Array());
            }
        }
        /**
         * Sets the material uniform in the GPU
         *
         * @private
         */
        _setMaterialUniforms() {
            if (this._material.type === PHONG_MATERIAL) {
                let m = this._material;
                this._gl.uniform4fv(this._program.materialAmbient, m.ambientColor.multiplyScalar(m.ambientIntensity).clone().normalize().getFloat32Array());
                this._gl.uniform4fv(this._program.materialSpecular, m.specularColor.multiplyScalar(m.specularIntensity).clone().normalize().getFloat32Array());
                this._gl.uniform1i(this._program.materialShininess, m.shininess);
            }
            this._gl.uniform4fv(this._program.materialDiffuse, this._material.diffuseColor.multiplyScalar(this._material.diffuseIntensity).clone().normalize().getFloat32Array());
        }
        _setTextures() {
            if (this._material.texture !== null && this._program.texture !== null) {
                console.log("BOUND");
                this._material.texture.use(this._program.texture);
            }
        }
        /**
         * Create a new shader program with base ion the new lights in the scene
         *
         * @param {LightsManager} lights
         */
        processShader(lights) {
            if (lights) {
                this._lights = lights;
            }
            if (this._lights !== null) {
                this._program = Parser.createProgram(this._geometry, this._material, this._lights);
            }
            else {
                this._program = Parser.createProgram(this._geometry, this._material);
            }
        }
        /**
         * Function used for offscreen rendering. Useful for pinking method
         *
         * @param {Camera} camera
         * @param {Program} program
         */
        offScreenRender(camera, program) {
            this._gl.uniformMatrix4fv(program.viewMatrix, false, camera.viewMatrix.getFloat32Array());
            this._gl.uniformMatrix4fv(program.projectionMatrix, false, camera.projectionMatrix.getFloat32Array());
            this._gl.uniformMatrix4fv(program.modelMatrix, false, this.transformationMatrix.getFloat32Array());
            this._gl.uniform4fv(program.materialDiffuse, this._pickColor.clone().normalize().getFloat32Array());
            this._geometry.draw(this._drawingMode, program);
        }
        /**
         * Gets the drawing mode
         *
         * @return {GLenum}
         */
        get drawingMode() {
            return this._drawingMode;
        }
        /**
         * Sets the drawing mode
         *
         * @param {GLenum} value
         */
        set drawingMode(value) {
            this._drawingMode = value;
        }
    }

    class CameraGeometry extends Geometry {
        constructor() {
            super(new Float32Array(CameraGeometry.generateData()));
        }
        static generateData() {
            let vertices = [0, 0, 0, 0.3, 0.2, -0.4, -0.3, 0.2, -0.4];
            // bottom triangle
            vertices.push(0);
            vertices.push(0);
            vertices.push(0);
            vertices.push(0.3);
            vertices.push(-0.2);
            vertices.push(-0.4);
            vertices.push(-0.3);
            vertices.push(-0.2);
            vertices.push(-0.4);
            // left triangle
            vertices.push(0);
            vertices.push(0);
            vertices.push(0);
            vertices.push(0.3);
            vertices.push(0.2);
            vertices.push(-0.4);
            vertices.push(0.3);
            vertices.push(-0.2);
            vertices.push(-0.4);
            // right triangle
            vertices.push(0);
            vertices.push(0);
            vertices.push(0);
            vertices.push(-0.3);
            vertices.push(0.2);
            vertices.push(-0.4);
            vertices.push(-0.3);
            vertices.push(-0.2);
            vertices.push(-0.4);
            // top triangle
            vertices.push(0);
            vertices.push(0.30);
            vertices.push(-0.4);
            vertices.push(0.25);
            vertices.push(0.21);
            vertices.push(-0.4);
            vertices.push(-0.25);
            vertices.push(0.21);
            vertices.push(-0.4);
            return vertices;
        }
    }

    /**
     * Class representing a material
     */
    class Material {
        /**
         * Material constructor
         * @param {number} type
         */
        constructor(type) {
            /**
             * The material type
             *
             * @type {number}
             * @private
             */
            this._type = type;
            /**
             * Reference to the renderable entity to which it was assigned
             *
             * @type {Renderable}
             * @protected
             */
            this._renderable = null;
            /**
             * the real color of the renderable object
             *
             * @type {Color}
             * @protected
             */
            this._diffuseColor = new Color(255, 255, 255, 255);
            /**
             * The number for which the color wil be multiplied
             *
             * @type {number}
             * @protected
             */
            this._diffuseIntensity = 1;
            /**
             * Mesh texture reference
             *
             * @type {TextureImage}
             * @protected
             */
            this._texture = null;
        }
        /**
         * Sets the renderable entity to which this material is assigned
         *
         * @param {Renderable} renderable
         */
        set renderable(renderable) {
            renderable.processShader();
            this._renderable = renderable;
        }
        /**
         * Gets the diffuse color
         *
         * @return {Color}
         */
        get diffuseColor() {
            return this._diffuseColor;
        }
        /**
         * Sets the diffuse color
         *
         * @param {Color} value
         */
        set diffuseColor(value) {
            this._diffuseColor = value;
        }
        /**
         * Gets the diffuse color intensity
         *
         * @return {number}
         */
        get diffuseIntensity() {
            return this._diffuseIntensity;
        }
        /**
         * Sets the diffuse color intensity
         *
         * @param {number} value
         */
        set diffuseIntensity(value) {
            this._diffuseIntensity = value;
        }
        /**
         * Gets the type of material
         *
         * @return {number}
         */
        get type() {
            return this._type;
        }
        /**
         * Set the texture to the mesh
         *
         * @param {TextureImage | null} texture
         */
        set texture(texture) {
            this._texture = texture;
        }
        /**
         * Get the texture assigned to the mesh
         *
         * @return {TextureImage | null}
         */
        get texture() {
            return this._texture;
        }
    }

    /**
     * Class representing a material. The difference between this material and phong material is the of the reflection model.
     * Every mesh having this material type wil be rendered using a lambert reflection model
     */
    class LambertMaterial extends Material {
        /**
         * LambertMaterial constructor
         *
         * @param {Color} diffuseColor
         * @param {number}intensity
         */
        constructor(diffuseColor = new Color(255, 255, 255, 255), intensity = 1) {
            super(LAMBERT_MATERIAL);
            this._diffuseColor = diffuseColor;
            this._diffuseIntensity = intensity;
        }
    }

    /**
     * Class representing a generic camera
     */
    class Camera extends Renderable {
        /**
         * Camera constructor
         *
         * @param {string} name
         * @param {number} type
         * @param {Material} material
         */
        constructor(name, type, material = new LambertMaterial(new Color(0, 0, 0, 255))) {
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
        applyTransformations() {
            super.applyTransformations();
        }
        /**
         * Gets the view matrix
         *
         * @return {Matrix4}
         */
        get viewMatrix() {
            return this._modelMatrix;
        }
        /**
         * Gets the projection matrix
         *
         * @return {Matrix4}
         */
        get projectionMatrix() {
            return this._projectionMatrix;
        }
        /**
         * Move along the right direction by v
         *
         * @param {number} v
         */
        panX(v) {
            if (this._mode)
                return;
            this._translation.x += this._rightDirection.x * v;
            this._translation.y += this._rightDirection.y * v;
            this._translation.z += this._rightDirection.z * v;
        }
        /**
         * Move along the up direction by v
         *
         * @param {number} v
         */
        panY(v) {
            this._translation.y += this._upDirection.y * v;
            if (this._mode)
                return;
            this._translation.x += this._upDirection.x * v;
            this._translation.z += this._upDirection.z * v;
        }
        /**
         * Move along the forward direction by v
         *
         * @param {number} v
         */
        panZ(v) {
            if (!this._mode) {
                this._translation.z += v;
            }
            else {
                this._translation.x += this._forwardDirection.x * v;
                this._translation.y += this._forwardDirection.y * v;
                this._translation.z += this._forwardDirection.z * v;
            }
        }
    }

    /**
     * Class representing a camera in perspective projection
     */
    class PerspectiveCamera extends Camera {
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

    /**
     * Class representing a camera in orthographic projection
     */
    class OrthographicCamera extends Camera {
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

    class LightGeometry extends Geometry {
        constructor() {
            super(new Float32Array(LightGeometry.generateData()));
        }
        static generateData() {
            let vertices = [];
            // top triangle
            vertices.push(0.1);
            vertices.push(0);
            vertices.push(0);
            vertices.push(-0.1);
            vertices.push(0);
            vertices.push(0);
            vertices.push(0);
            vertices.push(0.1);
            vertices.push(0);
            vertices.push(0);
            vertices.push(-0.1);
            vertices.push(0);
            vertices.push(0);
            vertices.push(0);
            vertices.push(0.1);
            vertices.push(0);
            vertices.push(0);
            vertices.push(-0.1);
            vertices.push(0.1 * Math.cos(45));
            vertices.push(0.1 * Math.sin(45));
            vertices.push(0);
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.sin(45));
            vertices.push(0);
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(0.1 * Math.sin(45));
            vertices.push(0);
            vertices.push(0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.sin(45));
            vertices.push(0);
            vertices.push(0);
            vertices.push(0.1 * Math.cos(45));
            vertices.push(0.1 * Math.sin(45));
            vertices.push(0);
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.sin(45));
            vertices.push(0);
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(0.1 * Math.sin(45));
            vertices.push(0);
            vertices.push(0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.sin(45));
            vertices.push(0.1 * Math.cos(45));
            vertices.push(0);
            vertices.push(0.1 * Math.sin(45));
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(0);
            vertices.push(-0.1 * Math.sin(45));
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(0);
            vertices.push(0.1 * Math.sin(45));
            vertices.push(0.1 * Math.cos(45));
            vertices.push(0);
            vertices.push(-0.1 * Math.sin(45));
            vertices.push(0.1 * Math.cos(45));
            vertices.push(0.1 * Math.cos(45));
            vertices.push(0.1 * Math.sin(45));
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.sin(45));
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(0.1 * Math.cos(45));
            vertices.push(0.1 * Math.sin(45));
            vertices.push(0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.cos(45));
            vertices.push(-0.1 * Math.sin(45));
            // TODO:
            return vertices;
        }
    }

    /**
     * Class representing a generic light
     */
    class Light extends Renderable {
        /**
         * Light constructor
         *
         * @param {string} name
         * @param {number} type
         */
        constructor(name, type) {
            super(name, type, new LightGeometry(), new LambertMaterial(new Color(0, 0, 0, 255)));
            /**
             * The diffuse color of the light
             *
             * @type {Color}
             * @protected
             */
            this._diffuseColor = new Color(255, 255, 255, 255);
            /**
             * The diffuse color intensity
             *
             * @type {number}
             * @protected
             */
            this._diffuseIntensity = 1;
            /**
             * The ambient color of the light
             *
             * @type {Color}
             * @protected
             */
            this._ambientColor = new Color(255, 255, 255, 255);
            /**
             * The ambient color intensity
             *
             * @type {number}
             * @protected
             */
            this._ambientIntensity = 1;
            /**
             * The specular color of the light
             *
             * @type {Color}
             * @protected
             */
            this._specularColor = new Color(255, 255, 255, 255);
            /**
             * The specular color intensity
             *
             * @type {number}
             * @protected
             */
            this._specularIntensity = 1;
            this._drawingMode = this._gl.LINES;
        }
        /**
         * Gets the diffuse color
         *
         * @return {Color}
         */
        get diffuseColor() {
            return this._diffuseColor;
        }
        /**
         * Sets the specular color
         *
         * @param {number} value
         */
        set diffuseColor(value) {
            this._diffuseColor = value;
        }
        /**
         * Gets the diffuse color intensity
         *
         * @return {number}
         */
        get diffuseIntensity() {
            return this._diffuseIntensity;
        }
        /**
         * Sets the specular color intensity
         *
         * @param {number} value
         */
        set diffuseIntensity(value) {
            this._diffuseIntensity = value;
        }
        /**
         * Returns the light position or direction
         *
         * @return {Vector3}
         */
        get lightPosition() {
            return this._translation;
        }
        /**
         * Gets the ambient color
         *
         * @return {Color}
         */
        get ambientColor() {
            return this._ambientColor;
        }
        /**
         * Sets the ambient color
         *
         * @param {number} value
         */
        set ambientColor(value) {
            this._ambientColor = value;
        }
        /**
         * Gets the ambient color intensity
         *
         * @return {number}
         */
        get ambientIntensity() {
            return this._ambientIntensity;
        }
        /**
         * Gets the specular color intensity
         *
         * @return {number}
         */
        set ambientIntensity(value) {
            this._ambientIntensity = value;
        }
        /**
         * Gets the specular color
         *
         * @return {Color}
         */
        get specularColor() {
            return this._specularColor;
        }
        /**
         * Sets the specular color
         *
         * @param {number} value
         */
        set specularColor(value) {
            this._specularColor = value;
        }
        /**
         * Gets the specular color intensity
         *
         * @return {number}
         */
        get specularIntensity() {
            return this._specularIntensity;
        }
        /**
         * Sets the specular color intensity
         *
         * @param {number} value
         */
        set specularIntensity(value) {
            this._specularIntensity = value;
        }
    }

    /**
     * Class representing a point light
     */
    class PointLight extends Light {
        /**
         * PointLight constructor
         *
         * @param {Color} diffuseColor
         * @param {number} diffuseIntensity
         * @param {Color} ambientColor
         * @param {number} ambientIntensity
         * @param {Color} specularColor
         * @param {number} specularIntensity
         */
        constructor(diffuseColor = new Color(255, 255, 255, 255), diffuseIntensity = 1, ambientColor = new Color(255, 255, 255, 255), ambientIntensity = 1, specularColor = new Color(255, 255, 255, 255), specularIntensity = 1) {
            let obj = Base.getName("Point Light", PointLight._counter, name);
            PointLight._counter = obj.counter;
            super(obj.name, POINT_LIGHT);
            this._ambientIntensity = ambientIntensity;
            this._ambientColor = ambientColor;
            this._diffuseColor = diffuseColor;
            this._diffuseIntensity = diffuseIntensity;
            this._specularColor = specularColor;
            this._specularIntensity = specularIntensity;
        }
    }
    /**
     * Util counter for point lights naming
     *
     * @type {number}
     * @private
     */
    PointLight._counter = 0;

    /**
     * Class representing a directional light
     */
    class DirectionalLight extends Light {
        /**
         * PointLight constructor
         *
         * @param {Color} diffuseColor
         * @param {number} diffuseIntensity
         * @param {Color} ambientColor
         * @param {number} ambientIntensity
         * @param {Color} specularColor
         * @param {number} specularIntensity
         */
        constructor(diffuseColor = new Color(255, 255, 255, 255), diffuseIntensity = 1, ambientColor = new Color(255, 255, 255, 255), ambientIntensity = 1, specularColor = new Color(255, 255, 255, 255), specularIntensity = 1) {
            let obj = Base.getName("Directional Light", DirectionalLight._counter, name);
            DirectionalLight._counter = obj.counter;
            super(obj.name, DIRECTIONAL_LIGHT);
            this._ambientIntensity = ambientIntensity;
            this._ambientColor = ambientColor;
            this._diffuseColor = diffuseColor;
            this._diffuseIntensity = diffuseIntensity;
            this._specularColor = specularColor;
            this._specularIntensity = specularIntensity;
        }
    }
    /**
     * Util counter for directional lights naming
     *
     * @type {number}
     * @private
     */
    DirectionalLight._counter = 0;

    /**
     * Helper class util to manage the set og lights in the scene
     */
    class LightsManager {
        /**
         * Light constructor
         */
        constructor() {
            /**
             * Reference to the set of directional lights
             *
             * @type {DirectionalLight[]}
             * @private
             */
            this._pointLights = [];
            /**
             * Reference to the set of point lights
             *
             * @type {DirectionalLight[]}
             * @private
             */
            this._directionalLights = [];
        }
        /**
         * Add a light to the set of lights
         *
         * @param light
         */
        add(light) {
            for (let l of this._pointLights) {
                if (light.uuid === l.uuid)
                    return;
            }
            for (let l of this._directionalLights) {
                if (light.uuid === l.uuid)
                    return;
            }
            if (light instanceof DirectionalLight && light.type === DIRECTIONAL_LIGHT) {
                this._directionalLights.push(light);
            }
            if (light instanceof PointLight && light.type === POINT_LIGHT) {
                this._pointLights.push(light);
            }
        }
        /**
         * Remove a light from the set o lights
         *
         * @param {string} uuid
         * @return {Light | null}
         */
        remove(uuid) {
            for (let i = 0; i < this._directionalLights.length; i++) {
                if (this._directionalLights[i].uuid === uuid) {
                    let light = this._directionalLights[i];
                    this._directionalLights.splice(i, 1);
                    return light;
                }
            }
            for (let i = 0; i < this._pointLights.length; i++) {
                if (this._pointLights[i].uuid === uuid) {
                    let light = this._pointLights[i];
                    this._pointLights.splice(i, 1);
                    return light;
                }
            }
            return null;
        }
        /**
         * Get a light if exists
         *
         * @param {string} uuid
         * @return {Light | null}
         */
        get(uuid) {
            for (let i = 0; i < this._directionalLights.length; i++) {
                if (this._directionalLights[i].uuid === uuid) {
                    return this._directionalLights[i];
                }
            }
            for (let i = 0; i < this._pointLights.length; i++) {
                if (this._pointLights[i].uuid === uuid) {
                    return this._pointLights[i];
                }
            }
            return null;
        }
        /**
         * Helper function indicating that there is at least one directional light defined
         *
         * @return {boolean}
         */
        get isDirectionaLights() {
            return this._directionalLights.length > 0;
        }
        /**
         * Helper function indicating that there is at least one point light defined
         *
         * @return {boolean}
         */
        get isPointLights() {
            return this._pointLights.length > 0;
        }
        /**
         * Return the set of directional lights
         *
         * @return {DirectionalLight[]}
         */
        get pointLights() {
            return this._pointLights;
        }
        /**
         * Return the set of point lights
         *
         * @return {PointLight[]}
         */
        get directionalLights() {
            return this._directionalLights;
        }
    }

    /**
     * Class representing a Scene
     */
    class Scene {
        /**
         * Scene constructor
         */
        constructor() {
            /**
             * The set of object in the scene
             *
             * @type {Renderable[]}
             * @private
             */
            this._children = [];
            /**
             * Reference to the lights manager util class
             *
             * @type {LightsManager}
             * @private
             */
            this._lights = new LightsManager();
            /**
             * Reference to the selected object
             *
             * @type {Renderable}
             * @private
             */
            this._selectedObject = null;
        }
        /**
         * Add an object to the scene
         *
         * @param {Renderable} renderable
         */
        add(renderable) {
            for (let child of this._children) {
                if (child.uuid === renderable.uuid) {
                    console.warn("Renderable was already added to the Scene");
                    return;
                }
            }
            this._children.push(renderable);
            if (renderable instanceof Light) {
                this._lights.add(renderable);
                for (let child of this.children) {
                    child.processShader(this._lights);
                }
            }
        }
        /**
         * Remove an object form the scene
         *
         * @param {string} uuid
         * @return {Renderable | null}
         */
        remove(uuid) {
            for (let i = 0; i < this._children.length; i++) {
                if (this._children[i].uuid === uuid) {
                    let child = this._children[i];
                    this._children.splice(i, 1);
                    if (child instanceof Light) {
                        this._lights.remove(child.uuid);
                        for (let child of this.children) {
                            child.processShader(this._lights);
                        }
                    }
                    return child;
                }
            }
            return null;
        }
        /**
         * Get the list of children
         *
         * @return {Renderable[]}
         */
        get children() {
            return this._children;
        }
        /**
         * Return the reference of the lights managers
         *
         * @return {LightsManager}
         */
        get lights() {
            return this._lights;
        }
        /**
         * Get the selected object
         *
         * @return {Renderable | null}
         */
        get selectedObject() {
            return this._selectedObject;
        }
        /**
         * Set th selected object to a new value
         *
         * @param {Renderable | null} value
         */
        set selectedObject(value) {
            this._selectedObject = value;
        }
    }

    /**
     * Class representing a Mesh
     */
    class Mesh extends Renderable {
        /**
         * Mesh constructor
         *
         * @param geometry
         * @param material
         */
        constructor(geometry, material = new LambertMaterial(new Color(123, 123, 123, 255))) {
            let obj = Base.getName("Mesh", Mesh._counter, name);
            Mesh._counter = obj.counter;
            super(obj.name, MESH, geometry, material);
        }
        /**
         * Sets the material of the mesh
         *
         * @param {Material} material
         */
        set material(material) {
            this._material = material;
            this.processShader();
        }
        /**
         * Sets the texture of the mesh
         *
         * @param {Material} texture
         */
        set texture(texture) {
            this._material.texture = texture;
            this.processShader();
        }
        /**
         * Gets the text of this mesh
         *
         * @return {TextureImage | null}
         */
        get textur() {
            return this._material.texture;
        }
    }
    /**
     * Util counter for mesh naming
     *
     * @type {number}
     * @private
     */
    Mesh._counter = 0;

    /**
     * Class representing a group of objects. Can contain any instance of Renderable class.
     */
    class Group extends Renderable {
        /**
         * Group constructor
         *
         * @param {string} name
         */
        constructor(name) {
            let obj = Base.getName("Group", Group._counter, name);
            super(obj.name, GROUP, new LineGeometry(0, 0, 0, 0, 0, 0), new LambertMaterial());
            Group._counter = obj.counter;
        }
        /**
         * Add a renderable to the group
         *
         * @param {Renderable} renderable
         */
        add(renderable) {
            for (let child of this._children) {
                if (child.uuid === renderable.uuid) {
                    console.warn("Renderable was already added to the Scene");
                    return;
                }
            }
            renderable.setParent(this);
        }
        /**
         * Remove a renderable from the group
         *
         * @param {string} uuid
         */
        remove(uuid) {
            for (let i = 0; i < this._children.length; i++) {
                if (this._children[i].uuid === uuid) {
                    let child = this._children[i];
                    this._children[i].unsetParent();
                    return child;
                }
            }
            return null;
        }
        /**
         * Render all object of the group
         *
         * @param {Camera} camera
         * @param {LightsManager} lights
         */
        render(camera, lights) {
            for (let child of this._children) {
                let renderable = child;
                renderable.render(camera, lights);
            }
        }
    }
    /**
     * Util counter for group naming
     *
     * @type {number}
     * @private
     */
    Group._counter = 0;

    /**
     * Class representing a material. The difference between this material and lambert material is the of the reflection model.
     * Every mesh having this material type wil be rendered using a Phong reflection model
     */
    class PhongMaterial extends Material {
        /**
         * PhongMaterial constructor
         *
         * @param {number} shininess
         * @param {Color} ambientColor
         * @param {number} ambientIntensity
         * @param {Color} diffuseColor
         * @param {number} diffuseIntensity
         * @param {Color} specularColor
         * @param {number} specularIntensity
         */
        constructor(shininess = 10, ambientColor = new Color(255, 255, 255, 255), ambientIntensity = 1, diffuseColor = new Color(255, 255, 255, 255), diffuseIntensity = 1, specularColor = new Color(255, 255, 255, 255), specularIntensity = 1) {
            super(PHONG_MATERIAL);
            this._ambientColor = ambientColor;
            this._ambientIntensity = ambientIntensity;
            this._diffuseColor = diffuseColor;
            this._diffuseIntensity = diffuseIntensity;
            this._specularColor = specularColor;
            this._specularIntensity = specularIntensity;
            this._shininess = shininess;
        }
        /**
         * Get the specular color
         *
         * @return {Color}
         */
        get specularColor() {
            return this._specularColor;
        }
        /**
         * Sets the specular color
         *
         * @param {Color} value
         */
        set specularColor(value) {
            this._specularColor = value;
        }
        /**
         * Get the specular intensity
         *
         * @return {Color}
         */
        get specularIntensity() {
            return this._specularIntensity;
        }
        /**
         * Sets the specular intensity value
         *
         * @param {number} value
         */
        set specularIntensity(value) {
            this._specularIntensity = value;
        }
        /**
         * Get the ambient color
         *
         * @return {Color}
         */
        get ambientColor() {
            return this._ambientColor;
        }
        /**
         * Sets the ambient color
         *
         * @param {Color} value
         */
        set ambientColor(value) {
            this._ambientColor = value;
        }
        /**
         * Get the ambient intensity
         *
         * @return {Color}
         */
        get ambientIntensity() {
            return this._ambientIntensity;
        }
        /**
         * Sets the ambient intensity value
         *
         * @param {number} value
         */
        set ambientIntensity(value) {
            this._ambientIntensity = value;
        }
        /**
         * Get the shininess value
         *
         * @return {Color}
         */
        get shininess() {
            return this._shininess;
        }
        /**
         * Sets the shininess value
         *
         * @param {number} value
         */
        set shininess(value) {
            this._shininess = value;
        }
    }

    /**
     * Class representing a generic texture
     */
    class TextureImage {
        /**
         * TextureImage constructor
         *
         * @param {number} type
         */
        constructor(type) {
            this._type = type;
            this._gl = getWebGL();
            this._mag_filter = this._gl.LINEAR;
            this._min_filter = this._gl.LINEAR;
            this._wrap_s_filter = this._gl.CLAMP_TO_EDGE;
            this._wrap_t_filter = this._gl.CLAMP_TO_EDGE;
            this._texture = null;
        }
        /**
         * Update the texture filters
         *
         * @private
         */
        _updateFilters() {
            if (this._type === TEXTURE) {
                this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._wrap_s_filter);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._wrap_t_filter);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._min_filter);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._mag_filter);
                this._gl.bindTexture(this._gl.TEXTURE_2D, null);
            }
        }
        /**
         * Gets the texture type
         *
         * @return {number}
         */
        get type() {
            return this._type;
        }
        get mag_filter() {
            return this._mag_filter;
        }
        set mag_filter(value) {
            this._mag_filter = value;
            this._updateFilters();
        }
        get min_filter() {
            return this._min_filter;
        }
        set min_filter(value) {
            this._min_filter = value;
            this._updateFilters();
        }
        get wrap_s_filter() {
            return this._wrap_s_filter;
        }
        set wrap_s_filter(value) {
            this._wrap_s_filter = value;
            this._updateFilters();
        }
        get wrap_t_filter() {
            return this._wrap_t_filter;
        }
        set wrap_t_filter(value) {
            this._wrap_t_filter = value;
            this._updateFilters();
        }
        use(location) {
        }
    }

    class Texture extends TextureImage {
        constructor(imageURL) {
            super(TEXTURE);
            this._imageURL = imageURL;
            this._texture = this._gl.createTexture();
            if (this._texture === null) {
                console.warn("Cannot load the texture");
            }
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
            this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, 1, 1, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
            this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
            this._gl.generateMipmap(this._gl.TEXTURE_2D);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
            let textureInfo = { width: 1, height: 1, texture: this._texture };
            let img = new Image();
            let gl = this._gl;
            img.addEventListener('load', function () {
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            });
            if ((new URL(imageURL)).origin !== window.location.origin) {
                img.crossOrigin = "";
            }
            img.src = imageURL;
        }
        use(uniform) {
            super.use(uniform);
            this._gl.activeTexture(this._gl.TEXTURE0);
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
            this._gl.uniform1i(uniform, 0);
        }
    }

    class TextureCube extends TextureImage {
        constructor() {
            super(TEXTURE_CUBE);
        }
    }

    const basicVertexShader = "" +
        "attribute vec3 vertexPosition;\n" +
        "\n" +
        "uniform mat4 viewMatrix;\n" +
        "uniform mat4 projectionMatrix;\n" +
        "uniform mat4 modelMatrix;\n" +
        "\n" +
        "void main(void){\n" +
        "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);\n}";
    const basicFragmentShader = "" +
        "precision mediump float;\n" +
        "\n" +
        "uniform vec4 materialDiffuse;" +
        "\n" +
        "void main(void){\n" +
        "\tgl_FragColor = materialDiffuse;\n}";
    const offScreenVertexShader = "" +
        "attribute vec3 vertexPosition;\n" +
        "\n" +
        "uniform mat4 viewMatrix;\n" +
        "uniform mat4 projectionMatrix;\n" +
        "uniform mat4 modelMatrix;\n" +
        "\n" +
        "void main(void){\n" +
        "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);\n}";
    const offScreenFragmentShader = "" +
        "precision mediump float;\n" +
        "\n" +
        "uniform vec4 materialDiffuse;" +
        "\n" +
        "void main(void){\n" +
        "\tgl_FragColor = materialDiffuse;\n}";

    /**
     * Class implementing the picking method
     */
    class Picker {
        /**
         * Picker constructor
         *
         * @param {Renderer} renderer
         */
        constructor(renderer) {
            let gl = getWebGL();
            /**
             * Reference to the WebGL API
             *
             * @type {WebGLRenderingContext}
             * @private
             */
            this._gl = gl;
            /**
             * Reference to the program shader use for off screen rendering
             *
             * @type {Program}
             * @private
             */
            this._shaderProgram = new Program(offScreenVertexShader, offScreenFragmentShader);
            /**
             * Reference to the renderer which contains the reference to the scene
             *
             * @type {Renderer}
             * @private
             */
            this._renderer = renderer;
            /**
             * Canvas on which the uses clicks
             *
             * @type {HTMLCanvasElement}
             * @private
             */
            this._canvas = this._gl.canvas;
            let box = this._canvas.getBoundingClientRect();
            /**
             * The final image of off screen rendering
             *
             * @type {WebGLTexture}
             * @private
             */
            this._texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, box.width, box.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            /**
             * The render buffer
             *
             * @type {WebGLRenderbuffer}
             * @private
             */
            this._renderBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, box.width, box.height);
            /**
             * The final framebuffer
             *
             * @type {WebGLFramebuffer}
             * @private
             */
            this._frameBuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderBuffer);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        /**
         * Update the render buffer dimensions
         *
         * @param {number} width
         * @param {number} height
         */
        update(width, height) {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
            this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, width, height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, null);
            this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, this._renderBuffer);
            this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16, width, height);
        }
        /**
         * Read pixel color from the frame buffer and select the object corresponding to that color
         *
         * @param {number} x
         * @param {number} y
         */
        find(x, y) {
            this._shaderProgram.use();
            let color = this._gl.getParameter(this._gl.COLOR_CLEAR_VALUE);
            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._frameBuffer);
            this._gl.clearColor(0, 0, 0, 1);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            this._renderer.viewer.applyTransformations();
            for (let i = 0; i < this._renderer.scene.children.length; i++) {
                this._renderer.scene.children[i].applyTransformations();
            }
            for (let i = 0; i < this._renderer.scene.children.length; i++) {
                this._renderer.scene.children[i].offScreenRender(this._renderer.viewer, this._shaderProgram);
            }
            const readout = new Uint8Array(4);
            this._gl.readPixels(x, y, 1, 1, this._gl.RGBA, this._gl.UNSIGNED_BYTE, readout);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
            this._gl.clearColor(color[0], color[1], color[2], color[3]);
            for (let i = 0; i < this._renderer.scene.children.length; i++) {
                if (this._renderer.scene.children[i].pickColor.equalTo(Color.fromArray(readout))) {
                    this._renderer.scene.selectedObject = this._renderer.scene.children[i];
                    return;
                }
            }
            this._renderer.scene.selectedObject = null;
        }
    }

    class Controls {
        /**
         * Controls constructor
         *
         * @param {Renderer} renderer
         */
        constructor(renderer) {
            this._onMouseUpHandler = () => {
                this._mouseDown = false;
            };
            // @ts-ignore
            this._onMouseDownHandler = (event) => {
                this._initX = this._prevX = event.pageX - this._offsetX;
                this._initY = this._prevY = event.pageY - this._offsetY;
                this._mouseDown = true;
                if (event.altKey) {
                    let box = this._gl.canvas.getBoundingClientRect();
                    this._picker.update(box.width, box.height);
                    let x = event.clientX;
                    let y = box.bottom - event.clientY;
                    this._picker.find(x, y);
                }
            };
            this._onMouseMoveHandler = (event) => {
                if (!this._mouseDown)
                    return;
                let x = event.pageX - this._offsetX;
                let y = event.pageY - this._offsetY;
                let dx = x - this._prevX;
                let dy = y - this._prevY;
                if (!event.shiftKey) {
                    this._renderer.viewer.rotate.y += (dx * (this._rotateRate / this._canvas.width));
                    this._renderer.viewer.rotate.x += (dy * (this._rotateRate / this._canvas.height));
                }
                else {
                    this._renderer.viewer.panX(-dx * (this._panRate / this._canvas.width));
                    this._renderer.viewer.panY(dy * (this._panRate / this._canvas.height));
                }
                this._prevX = x;
                this._prevY = y;
            };
            this._onWheelHandler = (event) => {
                // @ts-ignore
                let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))); //Try to map wheel movement to a number between -1 and 1
                this._renderer.viewer.panZ(delta * (this._zoomRate / this._canvas.height));
            };
            this._onKeyDownHandler = (event) => {
                switch (event.code) {
                    case "KeyT":
                        this._tKey = true;
                        break;
                    case "KeyR":
                        this._rKey = true;
                        break;
                    case "KeyS":
                        this._sKey = true;
                        break;
                    case "KeyP":
                        this._pKey = true;
                        break;
                    case "KeyX":
                        this._xKey = true;
                        break;
                    case "KeyY":
                        this._yKey = true;
                        break;
                    case "KeyZ":
                        this._zKey = true;
                        break;
                    case "ArrowUp":
                        if (this._renderer.scene.selectedObject === null)
                            break;
                        let obj = this._renderer.scene.selectedObject;
                        if (this._tKey) {
                            if (this._xKey) {
                                obj.translate.x += 0.1;
                            }
                            if (this._yKey) {
                                obj.translate.y += 0.1;
                            }
                            if (this._zKey) {
                                obj.translate.z += 0.1;
                            }
                        }
                        else if (this._rKey) {
                            if (this._xKey) {
                                obj.rotate.x += 1;
                            }
                            if (this._yKey) {
                                obj.rotate.y += 1;
                            }
                            if (this._zKey) {
                                obj.rotate.z += 1;
                            }
                        }
                        else if (this._sKey) {
                            if (this._xKey) {
                                obj.scale.x += 0.1;
                            }
                            if (this._yKey) {
                                obj.scale.y += 0.1;
                            }
                            if (this._zKey) {
                                obj.scale.z += 0.1;
                            }
                        }
                        else if (this._pKey) {
                            if (this._xKey) {
                                obj.pivot.x += 0.1;
                            }
                            if (this._yKey) {
                                obj.pivot.y += 0.1;
                            }
                            if (this._zKey) {
                                obj.pivot.z += 0.1;
                            }
                        }
                        break;
                    case "ArrowDown":
                        if (this._renderer.scene.selectedObject === null)
                            break;
                        let obj1 = this._renderer.scene.selectedObject;
                        if (this._tKey) {
                            if (this._xKey) {
                                obj1.translate.x -= 0.1;
                            }
                            if (this._yKey) {
                                obj1.translate.y -= 0.1;
                            }
                            if (this._zKey) {
                                obj1.translate.z -= 0.1;
                            }
                        }
                        else if (this._rKey) {
                            if (this._xKey) {
                                obj1.rotate.x -= 1;
                            }
                            if (this._yKey) {
                                obj1.rotate.y -= 1;
                            }
                            if (this._zKey) {
                                obj1.rotate.z -= 1;
                            }
                        }
                        else if (this._sKey) {
                            if (this._xKey) {
                                obj1.scale.x -= 0.1;
                            }
                            if (this._yKey) {
                                obj1.scale.y -= 0.1;
                            }
                            if (this._zKey) {
                                obj1.scale.z -= 0.1;
                            }
                        }
                        else if (this._pKey) {
                            if (this._xKey) {
                                obj1.pivot.x -= 0.1;
                            }
                            if (this._yKey) {
                                obj1.pivot.y -= 0.1;
                            }
                            if (this._zKey) {
                                obj1.pivot.z -= 0.1;
                            }
                        }
                        break;
                    default:
                        break;
                }
            };
            this._onKeyUpHandler = (event) => {
                switch (event.code) {
                    case "KeyT":
                        this._tKey = false;
                        break;
                    case "KeyR":
                        this._rKey = false;
                        break;
                    case "KeyS":
                        this._sKey = false;
                        break;
                    case "KeyP":
                        this._pKey = false;
                        break;
                    case "KeyX":
                        this._xKey = false;
                        break;
                    case "KeyY":
                        this._yKey = false;
                        break;
                    case "KeyZ":
                        this._zKey = false;
                        break;
                    default:
                        break;
                }
            };
            this._onKeyPressHandler = (event) => {
                if (event.code === "Digit1") {
                    this._renderer.axis.hide_showX();
                }
                if (event.code === "Digit2") {
                    this._renderer.axis.hide_showY();
                }
                if (event.code === "Digit3") {
                    this._renderer.axis.hide_showZ();
                }
                if (event.code === "Digit4") {
                    this._renderer.hide_show_axis();
                }
                if (event.code === "Digit5") {
                    this._renderer.hide_show_grid();
                }
                if (event.code === "Digit6") {
                    this._renderer.hide_show_grid();
                    this._renderer.hide_show_axis();
                    for (let child of this._renderer.scene.children) {
                        if (!(child instanceof Mesh)) {
                            child.hide_show();
                        }
                    }
                }
            };
            this._renderer = renderer;
            this._gl = getWebGL();
            this._canvas = this._gl.canvas;
            this._picker = new Picker(renderer);
            this._mouseDown = false;
            let box = this._gl.canvas.getBoundingClientRect();
            this._offsetX = box.left;
            this._offsetY = box.top;
            this._zoomRate = 200;
            this._rotateRate = -300;
            this._panRate = 5;
            this._initX = 0;
            this._initY = 0;
            this._prevX = 0;
            this._prevY = 0;
            this._tKey = false;
            this._rKey = false;
            this._sKey = false;
            this._pKey = false;
            this._xKey = false;
            this._yKey = false;
            this._zKey = false;
            this._canvas.addEventListener("mousedown", this._onMouseDownHandler);
            this._canvas.addEventListener("mouseup", this._onMouseUpHandler);
            this._canvas.addEventListener("mousemove", this._onMouseMoveHandler);
            this._canvas.addEventListener("wheel", this._onWheelHandler);
            window.addEventListener("keydown", this._onKeyDownHandler);
            window.addEventListener("keyup", this._onKeyUpHandler);
            window.addEventListener("keypress", this._onKeyPressHandler);
        }
    }

    class GridGeometry extends Geometry {
        /**
         * GridGeometry constructor
         *
         * @param {number} size
         * @param {number} divisions
         */
        constructor(size = 2, divisions = 10) {
            super(new Float32Array(GridGeometry.generateData(size, divisions)));
        }
        /**
         * Generate the grid data
         *
         * @param {number} size
         * @param {number} divisions
         */
        static generateData(size = 2, divisions = 10) {
            let vertices = [];
            let step = size / divisions;
            let half = size / 2;
            let p;
            for (let i = 0; i <= divisions; i++) {
                p = -half + (i * step);
                if (p === 0)
                    continue;
                vertices.push(p); //x1
                vertices.push(0); //y1 vertices.push(half);
                vertices.push(half); //z1 vertices.push(0);
                vertices.push(p); //x2
                vertices.push(0); //y2 vertices.push(-half);
                vertices.push(-half); //z2 vertices.push(0);
                p = half - (i * step);
                if (p === 0)
                    continue;
                vertices.push(-half); //x1
                vertices.push(0); //y1 vertices.push(p);
                vertices.push(p); //z1 vertices.push(0);
                vertices.push(half); //x2
                vertices.push(0); //y2 vertices.push(p);
                vertices.push(p); //z2 vertices.push(0);
            }
            return vertices;
        }
    }

    /**
     * Helper class similar to the mesh class creating a Grid
     */
    class Grid extends Renderable {
        /**
         * Grid constructor
         *
         * @param {number} size
         * @param {number} divisions
         */
        constructor(size = 10, divisions = 20) {
            super("Grid", HELPER, new GridGeometry(size, divisions), new LambertMaterial());
            /**
             * The grid size
             *
             * @type {number}
             * @private
             */
            this._size = size;
            /**
             * The number of the grid subdivisions
             *
             * @type {number}
             * @private
             */
            this._divisions = divisions;
            /**
             * Reference to the shader program used to render the grid
             *
             * @type {Program}
             * @private
             */
            this._program = new Program(basicVertexShader, basicFragmentShader);
            /**
             * Draw lines
             */
            this._drawingMode = this._gl.LINES;
        }
        /**
         * Sets the grid size to a new value
         *
         * @param {number} dim
         */
        set size(dim) {
            this._size = dim;
            this._createGeometry();
        }
        /**
         * Sets the number of subdivisions of the grid to a new value
         *
         * @param {number} num
         */
        set divisions(num) {
            this._divisions = num;
            this._createGeometry();
        }
        /**
         * Sets even the grid size that grid subdivisions
         *
         * @param {number} size
         * @param {number} divisions
         */
        set(size = 2, divisions = 10) {
            this._size = size;
            this._divisions = divisions;
            this._createGeometry();
        }
        /**
         * Generate a new grid data
         *
         * @private
         */
        _createGeometry() {
            this._geometry.dispose();
            this._geometry = new GridGeometry(this._size, this._divisions);
        }
    }

    class Axis {
        /**
         * Axis constructor
         *
         * @param size
         */
        constructor(size = 10) {
            /**
             * The size oof each axis
             *
             * @type {number}
             * @private
             */
            this._size = size;
            /**
             * If true axis x wil be rendered
             *
             * @type {boolean}
             * @private
             */
            this._showX = true;
            /**
             * If true axis y will be rendered
             *
             * @type {boolean}
             * @private
             */
            this._showY = false;
            /**
             * If true axis z will be rendered
             *
             * @type {boolean}
             * @private
             */
            this._showZ = true;
            /**
             * Line geometry for x axis
             *
             * @type {LineGeometry}
             * @private
             */
            this._xAxis = new LineGeometry(-this._size / 2, 0, 0, this._size / 2, 0, 0);
            /**
             * Line geometry for y axis
             *
             * @type {LineGeometry}
             * @private
             */
            this._yAxis = new LineGeometry(0, -this._size / 2, 0, 0, this._size / 2, 0);
            /**
             * Line geometry for z axis
             *
             * @type {LineGeometry}
             * @private
             */
            this._zAxis = new LineGeometry(0, 0, -this._size / 2, 0, 0, this._size / 2);
            /**
             * Reference to the webgl rendering context API
             *
             * @type {WebGLRenderingContext}
             * @private
             */
            this._gl = getWebGL();
            /**
             * Reference to the program with which axis wil be rendered
             *
             * @type {Program}
             * @private
             */
            this._program = new Program(basicVertexShader, basicFragmentShader);
        }
        /**
         * Render axis
         *
         * @param {Camera} camera
         */
        render(camera) {
            this._program.use();
            let gl = getWebGL();
            gl.uniformMatrix4fv(this._program.modelMatrix, false, new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
            gl.uniformMatrix4fv(this._program.viewMatrix, false, camera.viewMatrix.getFloat32Array());
            gl.uniformMatrix4fv(this._program.projectionMatrix, false, camera.projectionMatrix.getFloat32Array());
            if (this._showX) {
                gl.uniform4fv(this._program.materialDiffuse, new Float32Array([1, 0, 0, 1]));
                this._xAxis.positionBuffer.setAttributePointer(0);
                gl.drawArrays(gl.LINES, 0, this._xAxis.positionBuffer.numItems);
            }
            if (this._showY) {
                gl.uniform4fv(this._program.materialDiffuse, new Float32Array([0, 1, 0, 1]));
                this._yAxis.positionBuffer.setAttributePointer(0);
                gl.drawArrays(gl.LINES, 0, this._yAxis.positionBuffer.numItems);
            }
            if (this._showZ) {
                gl.uniform4fv(this._program.materialDiffuse, new Float32Array([0, 0, 1, 1]));
                this._zAxis.positionBuffer.setAttributePointer(0);
                gl.drawArrays(gl.LINES, 0, this._zAxis.positionBuffer.numItems);
            }
        }
        /**
         * Set the a new size to axis
         *
         * @param {number} dim
         */
        set size(dim) {
            if (this._size == dim)
                return;
            this._size = dim;
            this._xAxis.dispose();
            this._yAxis.dispose();
            this._zAxis.dispose();
            this._xAxis = new LineGeometry(-this._size / 2, 0, 0, this._size / 2, 0, 0);
            this._yAxis = new LineGeometry(0, -this._size / 2, 0, 0, this._size / 2, 0);
            this._zAxis = new LineGeometry(0, 0, -this._size / 2, 0, 0, this._size / 2);
        }
        showX() {
            this._showX = true;
        }
        showY() {
            this._showY = true;
        }
        showZ() {
            this._showZ = true;
        }
        hideX() {
            this._showX = false;
        }
        hideY() {
            this._showY = false;
        }
        hideZ() {
            this._showZ = false;
        }
        hide_showX() {
            this._showX = !this._showX;
        }
        hide_showY() {
            this._showY = !this._showY;
        }
        hide_showZ() {
            this._showZ = !this._showZ;
        }
    }

    /**
     * Class used to initially setup the rendering context
     */
    class Renderer {
        /**
         * Renderer constructor
         *
         * @param {Scene} scene
         * @param {Camera} viewer
         */
        constructor(scene, viewer = new PerspectiveCamera("Viewer", CAMERA)) {
            /**
             * Reference to the WebGL API
             *
             * @type {WebGLRenderingContext}
             * @private
             */
            this._gl = getWebGL();
            /**
             * The scene to be rendered
             *
             * @type {Scene}
             * @private
             */
            this._scene = scene;
            /**
             * The viewer of the scene
             *
             * @type {Camera}
             * @private
             */
            this._viewer = viewer;
            this._viewer.translate.set(0, 0, -3);
            /**
             * Mouse and keyboard controls
             *
             * @type {Controls}
             * @private
             */
            this._controls = new Controls(this);
            /**
             * The viewport x starting point
             *
             * @type {number}
             * @private
             */
            this._viewportOffsetX = 0;
            /**
             * The viewport y starting point
             *
             * @type {number}
             * @private
             */
            this._viewportOffsetY = 0;
            /**
             * The viewport width
             *
             * @type {number}
             * @private
             */
            this._viewportWidth = this._gl.canvas.width;
            /**
             * The viewport height
             *
             * @type {number}
             * @private
             */
            this._viewportHeight = this._gl.canvas.height;
            /**
             * Reference to the grid mesh
             *
             * @type {Grid}
             * @private
             */
            this._grid = new Grid();
            /**
             * Indicator variable stating that the grid will be rendered
             *
             * @type {boolean}
             * @private
             */
            this._showGrid = true;
            /**
             * Reference to the axis mesh
             *
             * @type {Grid}
             * @private
             */
            this._axis = new Axis();
            /**
             * Indicator variable stating that the axis will be rendered
             *
             * @type {boolean}
             * @private
             */
            this._showAxis = true;
            this._gl.viewport(this._viewportOffsetX, this._viewportOffsetY, this._viewportWidth, this._viewportHeight);
            this._gl.clearColor(Renderer._clearColor.red / 255, Renderer._clearColor.green / 255, Renderer._clearColor.blue / 255, Renderer._clearColor.alpha / 255);
            this._gl.enable(this._gl.DEPTH_TEST);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
        }
        /**
         * Enables WebGL functions
         *
         * @param {GLenum} cap
         */
        enable(cap) {
            this._gl.enable(cap);
        }
        /**
         * Disables WebGL functions
         *
         * @param {GLenum} cap
         */
        disable(cap) {
            this._gl.disable(cap);
        }
        /**
         * Set the viewport
         *
         * @param {number} offsetX
         * @param {number} offsetY
         * @param {number} width
         * @param {number} height
         */
        setViewport(offsetX, offsetY, width, height) {
            this._viewportOffsetX = offsetX;
            this._viewportOffsetY = offsetY;
            this._viewportWidth = width;
            this._viewportHeight = height;
            this._gl.viewport(this._viewportOffsetX, this._viewportOffsetY, this._viewportWidth, this._viewportHeight);
            this.render();
        }
        /**
         * Sets the clear color
         *
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         */
        static setClearColor(red = 0, green = 0, blue = 0) {
            Renderer._clearColor.red = red;
            Renderer._clearColor.green = green;
            Renderer._clearColor.blue = blue;
            Renderer._clearColor.alpha = 255;
        }
        /**
         * Render the scene
         */
        render() {
            this._gl.clearColor(Renderer._clearColor.red / 255, Renderer._clearColor.green / 255, Renderer._clearColor.blue / 255, 255);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            this._viewer.applyTransformations();
            for (let renderable of this._scene.children) {
                renderable.applyTransformations();
                renderable.render(this._viewer, this._scene.lights);
            }
            if (this._showGrid) {
                this._grid.render(this.viewer);
            }
            if (this._showAxis) {
                this._axis.render(this._viewer);
            }
        }
        /**
         * Gets the scene
         *
         * @return {Scene}
         */
        get scene() {
            return this._scene;
        }
        /**
         * Gets thew viewer
         *
         * @return {Camera}
         */
        get viewer() {
            return this._viewer;
        }
        /**
         * Gets the grid
         *
         * @return {Grid}
         */
        get grid() {
            return this._grid;
        }
        /**
         * Gets axis
         *
         * @return {Axis}
         */
        get axis() {
            return this._axis;
        }
        /**
         * Sets a new viewer
         *
         * @param {Camera} value
         */
        set viewer(value) {
            this._viewer = value;
        }
        /**
         * Gets the starting coordinate x of the viewport
         *
         * @return {number}
         */
        get viewportOffsetX() {
            return this._viewportOffsetX;
        }
        /**
         * Gets the starting coordinate y of the viewport
         *
         * @return {number}
         */
        get viewportOffsetY() {
            return this._viewportOffsetY;
        }
        /**
         * Gets the viewport width
         *
         * @return {number}
         */
        get viewportWidth() {
            return this._viewportWidth;
        }
        /**
         * Gets the viewport height
         *
         * @return {number}
         */
        get viewportHeight() {
            return this._viewportHeight;
        }
        /**
         * Utility method. Sets the indicator variable showGrid to true
         */
        showGrid() {
            this._showGrid = true;
        }
        /**
         * Utility method. Sets the indicator variable showGrid to false
         */
        hideGrid() {
            this._showGrid = false;
        }
        /**
         * Utility method. Sets the indicator variable showAxis to true
         */
        showAxis() {
            this._showAxis = true;
        }
        /**
         * Utility method. Sets the indicator variable showAxis to false
         */
        hideAxis() {
            this._showAxis = false;
        }
        /**
         * Switch between hide an show the axis
         */
        hide_show_axis() {
            this._showAxis = !this._showAxis;
        }
        /**
         * Switch between hide an show the grid
         */
        hide_show_grid() {
            this._showGrid = !this._showGrid;
        }
        /**
         * Returns tre if axis are visible
         *
         * @return {boolean}
         */
        get axisVisible() {
            return this._showAxis;
        }
        /**
         * Returns tre if grid is visible
         *
         * @return {boolean}
         */
        get gridVisible() {
            return this._showAxis;
        }
    }
    /**
     * The clearing color
     *
     * @type {Color}
     * @private
     */
    Renderer._clearColor = new Color(80, 80, 80, 255);

    /**
     * Class taking tracks an creating animations
     */
    class AnimationClip {
        /**
         * AnimationClip constructor
         *
         * @param {Renderer} renderer
         */
        constructor(renderer) {
            /**
             * Reference to the renderer
             *
             * @type {Renderer}
             * @private
             */
            this._renderer = renderer;
            /**
             * The list of tracks
             *
             * @type {KeyframeTrack[]}
             * @private
             */
            this._tracks = [];
            /**
             * Indicator property. Indicates the the animation will be in loop
             *
             * @type {boolean}
             * @private
             */
            this._loop = false;
            /**
             * The starting time
             *
             * @type {number}
             * @private
             */
            this._startTime = 0;
            /**
             * Elapsed time since starting time
             *
             * @type {number}
             * @private
             */
            this._elapsedTime = 0;
            /**
             * Animation rate
             *
             * @type {number}
             * @private
             */
            this._animationRate = 60; // 60 times per second
            /**
             * Number of frame per second
             *
             * @type {number}
             * @private
             */
            this._fps = 1000 / this._animationRate;
            /**
             * Reference to the requestAnimationFrame. Helpful for the stop action
             *
             * @type {number}
             * @private
             */
            this._requestID = 0;
            /**
             * Animation lower bound time
             *
             * @type {number}
             * @private
             */
            this._rangeMin = 0;
            /**
             * Animation lupper bound time
             *
             * @type {number}
             * @private
             */
            this._rangeMax = 0;
        }
        /**
         * Add a new track to the animation
         *
         * @param {KeyframeTrack} track
         */
        addTrack(track) {
            this._tracks.push(track);
            this._findRange();
        }
        /**
         * Remove a track from the animation
         *
         * @param {Renderable} renderable
         */
        removeTrack(renderable) {
            for (let i = 0; i < this._tracks.length; i++) {
                if (this._tracks[i].renderable.uuid === renderable.uuid) {
                    this._tracks.splice(i, 1);
                    this._findRange();
                }
            }
        }
        /**
         * Gets a track in the animation
         *
         * @param {Renderable} renderable
         */
        getTrack(renderable) {
            for (let i = 0; i < this._tracks.length; i++) {
                if (this._tracks[i].renderable.uuid === renderable.uuid) {
                    return this._tracks[i];
                }
            }
        }
        /**
         * Start the animation
         */
        start() {
            this._startTime = (new Date()).getTime();
            this._elapsedTime = 0;
            this._animate();
        }
        /**
         * Stops the animation
         */
        stop() {
            cancelAnimationFrame(this._requestID);
        }
        /**
         * Mack the animation restarting ech time
         */
        loop() {
            this._loop = !this._loop;
        }
        /**
         * Do animation
         *
         * @private
         */
        _animate() {
            let elapsedTime = (new Date()).getTime() - this._startTime;
            let deltaTime = elapsedTime - this._elapsedTime;
            if (deltaTime > this._fps) {
                this._tracks.forEach(function (track) {
                    track.update(elapsedTime);
                });
                this._renderer.render();
                this._elapsedTime = elapsedTime;
            }
            if (elapsedTime > this._rangeMax) {
                cancelAnimationFrame(this._requestID);
                this._tracks.forEach(function (track) {
                    track.reset();
                });
                if (this._loop) {
                    this.start();
                }
            }
            else {
                this._requestID = requestAnimationFrame(this._animate.bind(this));
            }
        }
        /**
         * Fin the min a max time of the animation
         *
         * @private
         */
        _findRange() {
            if (this._tracks.length === 0)
                return;
            this._rangeMin = this._tracks[0].minTime;
            this._rangeMax = this._tracks[0].maxTime;
            for (let i = 0; i < this._tracks.length; i++) {
                if (this._tracks[i].minTime < this._rangeMin) {
                    this._rangeMin = this._tracks[i].minTime;
                }
                if (this._tracks[i].maxTime < this._rangeMax) {
                    this._rangeMax = this._tracks[i].maxTime;
                }
            }
        }
    }

    /**
     * Class encapsulating easing functions
     */
    class Ease {
        /**
         * No easing, no acceleration
         *
         * @param {number} t
         */
        static linear(t) {
            return t;
        }
        /**
         * Accelerating from zero velocity
         *
         * @param {number} t
         */
        static easeInQuad(t) {
            return t * t;
        }
        /**
         * Decelerating to zero velocity
         *
         * @param {number} t
         */
        static easeOutQuad(t) {
            return t * (2 - t);
        }
        /**
         * Acceleration until halfway, then deceleration
         *
         * @param {number} t
         */
        static easeInOutQuad(t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        /**
         * Accelerating from zero velocity
         *
         * @param {number} t
         */
        static easeInCubic(t) {
            return t * t * t;
        }
        /**
         * Decelerating to zero velocity
         *
         * @param {number} t
         */
        static easeOutCubic(t) {
            return (--t) * t * t + 1;
        }
        /**
         * Acceleration until halfway, then deceleration
         *
         * @param {number} t
         */
        static easeInOutCubic(t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
        /**
         * Accelerating from zero velocity
         *
         * @param {number} t
         */
        static easeInQuart(t) {
            return t * t * t * t;
        }
        /**
         * Decelerating to zero velocity
         *
         * @param {number} t
         */
        static easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }
        /**
         * Acceleration until halfway, then deceleration
         *
         * @param {number} t
         */
        static easeInOutQuart(t) {
            return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        }
        /**
         * Accelerating from zero velocity
         *
         * @param {number} t
         */
        static easeInQuint(t) {
            return t * t * t * t * t;
        }
        /**
         * Decelerating to zero velocity
         *
         * @param {number} t
         */
        static easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
        }
        /**
         * Acceleration until halfway, then deceleration
         *
         * @param {number} t
         */
        static easeInOutQuint(t) {
            return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        }
        /**
         * Elastic bounce effect at the beginning and end
         *
         * @param {number} t
         */
        static easeOutElastic(t) {
            return .04 * t / (--t) * Math.sin(25 * t);
        }
        /**
         * Elastic bounce effect at the beginning and end
         *
         * @param {number} t
         */
        static easeInOutElastic(t) {
            return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;
        }
        /**
         * Sinusoidal effect at the beginning
         *
         * @param {number} t
         */
        static easeInSin(t) {
            return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
        }
        /**
         * Sinusoidal effect at the end
         *
         * @param {number} t
         */
        static easeOutSin(t) {
            return Math.sin(Math.PI / 2 * t);
        }
        /**
         * Sinusoidal effect at the beginning and end
         *
         * @param {number} t
         */
        static easeInOutSin(t) {
            return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
        }
    }

    /**
     * Class representing a key frame
     */
    class Keyframe {
        /**
         * Keyframe constructor
         *
         * @param {number} time
         * @param {number[]} controlPoint
         * @param {number} ease
         */
        constructor(time, controlPoint, ease = exports.EASE.LINEAR) {
            /**
             * The time of the keyframe
             *
             * @type {number}
             * @private
             */
            this._time = time;
            /**
             * Coordinates of the keyframe
             *
             * @type {number[]}
             * @private
             */
            this._controlPoint = controlPoint;
            /**
             * The easing function
             *
             * @type {EASE}
             * @private
             */
            this._ease = Keyframe._easingFunctionConversion(ease);
        }
        /**
         * Return the reference to the easing function
         *
         * @return {Function}
         */
        getEase() {
            return this._ease;
        }
        /**
         * Set te easing type
         *
         * @param {EASE} value
         */
        setEase(value) {
            this._ease = Keyframe._easingFunctionConversion(value);
        }
        /**
         * Return the instant of this keyframe
         *
         * @return {number}
         */
        get time() {
            return this._time;
        }
        /**
         * Ste the instant to a new time
         *
         * @param {number} value
         */
        set time(value) {
            this._time = value;
        }
        /**
         * Return the control point
         *
         * @return {number[]}
         */
        get controlPoint() {
            return this._controlPoint;
        }
        /**
         * Modify the control point
         *
         * @param {number[] }value
         */
        set controlPoint(value) {
            this._controlPoint = value;
        }
        /**
         * Helper function to choose the easing function
         *
         * @param {EASE} ease
         * @private
         */
        static _easingFunctionConversion(ease) {
            switch (ease) {
                case exports.EASE.IN_OUT_QUAD:
                    return Ease.easeInOutQuad;
                case exports.EASE.OUT_QUAD:
                    return Ease.easeOutQuad;
                case exports.EASE.IN_QUAD:
                    return Ease.easeInQuad;
                case exports.EASE.IN_OUT_CUBIC:
                    return Ease.easeInOutCubic;
                case exports.EASE.OUT_CUBIC:
                    return Ease.easeOutCubic;
                case exports.EASE.IN_CUBIC:
                    return Ease.easeInCubic;
                case exports.EASE.IN_OUT_QUART:
                    return Ease.easeInQuart;
                case exports.EASE.OUT_QUART:
                    return Ease.easeOutQuart;
                case exports.EASE.IN_QUART:
                    return Ease.easeInQuart;
                case exports.EASE.IN_OUT_QUINT:
                    return Ease.easeInOutQuint;
                case exports.EASE.OUT_QUINT:
                    return Ease.easeOutQuint;
                case exports.EASE.IN_QUINT:
                    return Ease.easeInQuint;
                case exports.EASE.IN_OUT_ELASTIC:
                    return Ease.easeInOutElastic;
                case exports.EASE.OUT_ELASTIC:
                    return Ease.easeOutElastic;
                case exports.EASE.IN_OUT_SIN:
                    return Ease.easeInOutSin;
                case exports.EASE.OUT_SIN:
                    return Ease.easeInOutSin;
                case exports.EASE.IN_SIN:
                    return Ease.easeInSin;
                case exports.EASE.LINEAR:
                    return Ease.linear;
                default:
                    return Ease.linear;
            }
        }
    }

    /**
     * Manager class of keyframes
     */
    class KeyframeTrack {
        /**
         * KeyframeTrack contructor
         *
         * @param {Renderable} renderable
         * @param interpolationType
         */
        constructor(renderable, interpolationType = exports.INTERPOLATION.LINEAR) {
            /**
             * Reference to to the object that will bwe animated
             *
             * @type {Renderable}
             * @protected
             */
            this._renderable = renderable;
            /**
             * The type of interpolation of keyframes
             *
             * @type {INTERPOLATION}
             * @protected
             */
            this._interpolationType = interpolationType;
            /**
             * A list of keyframes
             *
             * @type {Keyframe []}
             * @protected
             */
            this._controlPoints = [];
            /**
             * Save the current keyframe index fo the animation
             *
             * @type {number}
             * @protected
             */
            this._currentKeyframeIndex = 0;
            /**
             * The time
             *
             * @type {number}
             * @protected
             */
            this._t = 0;
            /**
             * Lower bound of the animation range
             *
             * @type {number}
             * @protected
             */
            this._minTime = 0;
            /**
             * Upper bound of the animation range
             *
             * @type {number}
             * @protected
             */
            this._maxTime = 0;
            /**
             * Reference to the BSplice instance if the interpolation is of type BSpline
             *
             * @type {BSpline | null}
             * @protected
             */
            this._bSpline = null;
            this._point = [];
        }
        /**
         * Add a new keyframe to the track
         *
         * @param {number} time
         * @param {number []}controlPoint
         * @param {EASE} ease
         */
        add(time, controlPoint, ease = exports.EASE.LINEAR) {
            for (let i = 0; i < this._controlPoints.length; i++) {
                if (this._controlPoints[i].time === time) {
                    this._controlPoints[i] = new Keyframe(time, controlPoint, ease);
                    return;
                }
            }
            this._controlPoints.push(new Keyframe(time, controlPoint, ease));
            this._sort();
            this._calcParameters();
        }
        /**
         * Remove the keyframe at time t
         *
         * @param {number}time
         */
        remove(time) {
            for (let i = 0; i < this._controlPoints.length; i++) {
                if (this._controlPoints[i].time === time) {
                    let controlPoint = this._controlPoints[i];
                    this._controlPoints.splice(i, 1);
                    this._calcParameters();
                    return controlPoint;
                }
            }
            return null;
        }
        /**
         * Calculate the interpolated property at time elapsed time
         *
         * @param {number} elapsedTime
         */
        update(elapsedTime) {
            if (elapsedTime < this._minTime || elapsedTime > this._maxTime || this._controlPoints.length < 2)
                return;
            let l = this._controlPoints[this._currentKeyframeIndex].time;
            let r = this._controlPoints[this._currentKeyframeIndex + 1].time;
            let delta = elapsedTime - l;
            if (l + delta < r) {
                this._t = delta / (r - l);
                if (this._interpolationType === exports.INTERPOLATION.LINEAR && this._currentKeyframeIndex < this._controlPoints.length - 1) {
                    this._point = _Math.lerp(this._t, this._controlPoints[this._currentKeyframeIndex].controlPoint, this._controlPoints[this._currentKeyframeIndex + 1].controlPoint, this._controlPoints[this._currentKeyframeIndex].getEase());
                }
                else {
                    if (this._bSpline !== null) {
                        let delta = this._controlPoints[this._controlPoints.length - 1].time - this._controlPoints[0].time;
                        this._point = this._bSpline.calcAt(this._controlPoints[this._currentKeyframeIndex].getEase()((elapsedTime - this._controlPoints[0].time) / delta));
                    }
                }
            }
            else {
                this._currentKeyframeIndex++;
            }
        }
        /**
         * Resat to the starting time animation
         */
        reset() {
            this._currentKeyframeIndex = 0;
        }
        /**
         * Sort keyframes base on time
         *
         * @private
         */
        _sort() {
            if (this._controlPoints.length < 2)
                return;
            for (let i = this._controlPoints.length; i >= 0; i--) {
                for (let j = 1; j < i; j++) {
                    if (this._controlPoints[j - 1].time > this._controlPoints[j].time) {
                        let temp = this._controlPoints[j - 1];
                        this._controlPoints[j - 1] = this._controlPoints[j];
                        this._controlPoints[j] = temp;
                    }
                }
            }
        }
        /**
         * Calculate the upper and lower bound
         *
         * @private
         */
        _calcParameters() {
            if (this._controlPoints.length === 0)
                return;
            this._minTime = this._controlPoints[0].time;
            this._maxTime = this._controlPoints[0].time;
            for (let i = 0; i < this._controlPoints.length; i++) {
                if (this._controlPoints[i].time < this._minTime) {
                    this._minTime = this._controlPoints[i].time;
                }
                if (this._controlPoints[i].time > this._maxTime) {
                    this._maxTime = this._controlPoints[i].time;
                }
            }
        }
        /**
         * Gets the reference to the renderable object
         *
         * @return {Renderable}
         */
        get renderable() {
            return this._renderable;
        }
        /**
         * Return the lower bound
         *
         * @return {number}
         */
        get minTime() {
            return this._minTime;
        }
        /**
         * Return the upper bound
         *
         * @return {number}
         */
        get maxTime() {
            return this._maxTime;
        }
        /**
         * Set the interpolation type
         *
         * @param {INTERPOLATION} type
         */
        set interpolationType(type) {
            this._interpolationType = type;
        }
        /**
         * Return the interpolation type
         *
         * @return {number}
         */
        get interpolationType() {
            return this._interpolationType;
        }
    }

    /**
     * Class encapsulating function fro BSpline interpolation
     */
    class BSpline {
        /**
         * BSpline constructor
         *
         * @param {number[][]}controlPoints
         * @param degree
         */
        constructor(controlPoints, degree) {
            this._basisDeg4 = function (x) {
                if (-1.5 <= x && x < -0.5) {
                    return 55.0 / 96.0 + x * (-(5.0 / 24.0) + x * (-(5.0 / 4.0) + (-(5.0 / 6.0) - x / 6.0) * x));
                }
                else if (0.5 <= x && x < 1.5) {
                    return 55.0 / 96.0 + x * (5.0 / 24.0 + x * (-(5.0 / 4.0) + (5.0 / 6.0 - x / 6.0) * x));
                }
                else if (1.5 <= x && x <= 2.5) {
                    return 625.0 / 384.0 + x * (-(125.0 / 48.0) + x * (25.0 / 16.0 + (-(5.0 / 12.0) + x / 24.0) * x));
                }
                else if (-2.5 <= x && x <= -1.5) {
                    return 625.0 / 384.0 + x * (125.0 / 48.0 + x * (25.0 / 16.0 + (5.0 / 12.0 + x / 24.0) * x));
                }
                else if (-1.5 <= x && x < 1.5) {
                    return 115.0 / 192.0 + x * x * (-(5.0 / 8.0) + x * x / 4.0);
                }
                else {
                    return 0;
                }
            };
            this._controlPoints = controlPoints;
            this._degree = degree;
            if (degree == 2) {
                this._baseFunction = this._basisDeg2;
                this._baseFunctionRangeInt = 2;
            }
            else if (degree == 3) {
                this._baseFunction = this._basisDeg3;
                this._baseFunctionRangeInt = 2;
            }
            else if (degree == 4) {
                this._baseFunction = this._basisDeg4;
                this._baseFunctionRangeInt = 3;
            }
            else {
                this._baseFunction = this._basisDeg5;
                this._baseFunctionRangeInt = 3;
            }
        }
        _basisDeg2(x) {
            if (-0.5 <= x && x < 0.5) {
                return 0.75 - x * x;
            }
            else if (0.5 <= x && x <= 1.5) {
                return 1.125 + (-1.5 + x / 2.0) * x;
            }
            else if (-1.5 <= x && x < -0.5) {
                return 1.125 + (1.5 + x / 2.0) * x;
            }
            else {
                return 0;
            }
        }
        _basisDeg3(x) {
            if (-1 <= x && x < 0) {
                return 2.0 / 3.0 + (-1.0 - x / 2.0) * x * x;
            }
            else if (1 <= x && x <= 2) {
                return 4.0 / 3.0 + x * (-2.0 + (1.0 - x / 6.0) * x);
            }
            else if (-2 <= x && x < -1) {
                return 4.0 / 3.0 + x * (2.0 + (1.0 + x / 6.0) * x);
            }
            else if (0 <= x && x < 1) {
                return 2.0 / 3.0 + (-1.0 + x / 2.0) * x * x;
            }
            else {
                return 0;
            }
        }
        _basisDeg5(x) {
            if (-2 <= x && x < -1) {
                return 17.0 / 40.0 + x * (-(5.0 / 8.0) + x * (-(7.0 / 4.0) + x * (-(5.0 / 4.0) + (-(3.0 / 8.0) - x / 24.0) * x)));
            }
            else if (0 <= x && x < 1) {
                return 11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 - x / 12.0) * x * x);
            }
            else if (2 <= x && x <= 3) {
                return 81.0 / 40.0 + x * (-(27.0 / 8.0) + x * (9.0 / 4.0 + x * (-(3.0 / 4.0) + (1.0 / 8.0 - x / 120.0) * x)));
            }
            else if (-3 <= x && x < -2) {
                return 81.0 / 40.0 + x * (27.0 / 8.0 + x * (9.0 / 4.0 + x * (3.0 / 4.0 + (1.0 / 8.0 + x / 120.0) * x)));
            }
            else if (1 <= x && x < 2) {
                return 17.0 / 40.0 + x * (5.0 / 8.0 + x * (-(7.0 / 4.0) + x * (5.0 / 4.0 + (-(3.0 / 8.0) + x / 24.0) * x)));
            }
            else if (-1 <= x && x < 0) {
                return 11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 + x / 12.0) * x * x);
            }
            else {
                return 0;
            }
        }
        _seqAt(dim) {
            let points = this._controlPoints;
            let margin = this._degree + 1;
            return function (n) {
                if (n < margin) {
                    return points[0][dim];
                }
                else if (points.length + margin <= n) {
                    return points[points.length - 1][dim];
                }
                else {
                    return points[n - margin][dim];
                }
            };
        }
        ;
        _getInterpol(seq, t) {
            let f = this._baseFunction;
            let rangeInt = this._baseFunctionRangeInt;
            let tInt = Math.floor(t);
            let result = 0;
            for (let i = tInt - rangeInt; i <= tInt + rangeInt; i++) {
                result += seq(i) * f(t - i);
            }
            return result;
        }
        ;
        calcAt(t) {
            t = t * ((this._degree + 1) * 2 + this._controlPoints.length); //t must be in [0,1]
            return [this._getInterpol(this._seqAt(0), t), this._getInterpol(this._seqAt(1), t), this._getInterpol(this._seqAt(2), t)];
        }
    }

    /**
     * Class managing the pivot position
     */
    class PivotTrack extends KeyframeTrack {
        /**
         * PivotTrack constructor
         *
         * @param {Renderable} renderable
         */
        constructor(renderable) {
            super(renderable);
        }
        /**
         * Add a new keyframe to the track
         *
         * @param {number} time
         * @param {EASE} ease
         */
        addKeyframe(time, ease = exports.EASE.LINEAR) {
            super.add(time, this._renderable.pivot.getArray(), ease);
            if (this._controlPoints.length >= 2) {
                let points = [];
                for (let i = 0; i < this._controlPoints.length; i++) {
                    points.push(this._controlPoints[i].controlPoint);
                }
                this._bSpline = new BSpline(points, 4);
            }
        }
        /**
         * Calculate the interpolated property at time elapsed time
         *
         * @param {number} elapsedTime
         */
        update(elapsedTime) {
            super.update(elapsedTime);
            this._renderable.pivot.set(this._point[0], this._point[1], this._point[2]);
        }
    }

    /**
     * Class managing the position
     */
    class PositionsTrack extends KeyframeTrack {
        /**
         * PositionTrack constructor
         *
         * @param {Renderable} renderable
         */
        constructor(renderable) {
            super(renderable);
        }
        /**
         * Add a new keyframe to the track
         *
         * @param {number} time
         * @param {EASE} ease
         */
        addKeyframe(time, ease = exports.EASE.LINEAR) {
            super.add(time, this._renderable.translate.getArray(), ease);
            if (this._controlPoints.length >= 2) {
                let points = [];
                for (let i = 0; i < this._controlPoints.length; i++) {
                    points.push(this._controlPoints[i].controlPoint);
                }
                this._bSpline = new BSpline(points, 4);
            }
        }
        /**
         * Calculate the interpolated property at time elapsed time
         *
         * @param {number} elapsedTime
         */
        update(elapsedTime) {
            super.update(elapsedTime);
            this._renderable.translate.set(this._point[0], this._point[1], this._point[2]);
        }
    }

    /**
     * Class managing the orientation
     */
    class RotationsTrack extends KeyframeTrack {
        /**
         * RotationTrack constructor
         *
         * @param {Renderable} renderable
         */
        constructor(renderable) {
            super(renderable);
        }
        /**
         * Add a new keyframe to the track
         *
         * @param {number} time
         * @param {EASE} ease
         */
        addKeyframe(time, ease = exports.EASE.LINEAR) {
            super.add(time, this._renderable.rotate.getArray(), ease);
            if (this._controlPoints.length >= 2) {
                let points = [];
                for (let i = 0; i < this._controlPoints.length; i++) {
                    points.push(this._controlPoints[i].controlPoint);
                }
                this._bSpline = new BSpline(points, 4);
            }
        }
        /**
         * Calculate the interpolated property at time elapsed time
         *
         * @param {number} elapsedTime
         */
        update(elapsedTime) {
            super.update(elapsedTime);
            this._renderable.rotate.set(this._point[0], this._point[1], this._point[2]);
        }
    }

    /**
     * Class managing the dimensions
     */
    class ScalesTrack extends KeyframeTrack {
        /**
         * ScalesTrack constructor
         *
         * @param {Renderable} renderable
         */
        constructor(renderable) {
            super(renderable);
        }
        /**
         * Add a new keyframe to the track
         *
         * @param {number} time
         * @param {EASE} ease
         */
        addKeyframe(time, ease = exports.EASE.LINEAR) {
            super.add(time, this._renderable.scale.getArray(), ease);
            if (this._controlPoints.length >= 2) {
                let points = [];
                for (let i = 0; i < this._controlPoints.length; i++) {
                    points.push(this._controlPoints[i].controlPoint);
                }
                this._bSpline = new BSpline(points, 4);
            }
        }
        /**
         * Calculate the interpolated property at time elapsed time
         *
         * @param {number} elapsedTime
         */
        update(elapsedTime) {
            super.update(elapsedTime);
            this._renderable.scale.set(this._point[0], this._point[1], this._point[2]);
        }
    }

    exports.AnimationClip = AnimationClip;
    exports.BoxGeometry = BoxGeometry;
    exports.Color = Color;
    exports.DirectionalLight = DirectionalLight;
    exports.Group = Group;
    exports.LambertMaterial = LambertMaterial;
    exports.LineGeometry = LineGeometry;
    exports.Matrix4 = Matrix4;
    exports.Mesh = Mesh;
    exports.OrthographicCamera = OrthographicCamera;
    exports.PerspectiveCamera = PerspectiveCamera;
    exports.PhongMaterial = PhongMaterial;
    exports.PivotTrack = PivotTrack;
    exports.PlaneGeometry = PlaneGeometry;
    exports.PointLight = PointLight;
    exports.PositionsTrack = PositionsTrack;
    exports.Renderer = Renderer;
    exports.RotationsTrack = RotationsTrack;
    exports.ScalesTrack = ScalesTrack;
    exports.Scene = Scene;
    exports.SphereGeometry = SphereGeometry;
    exports.Texture = Texture;
    exports.TextureCube = TextureCube;
    exports.Vector3 = Vector3;
    exports.Vector4 = Vector4;
    exports.getWebGL = getWebGL;
    exports.initialize = initialize;

    return exports;

}({}));
