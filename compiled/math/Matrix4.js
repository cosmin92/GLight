import _Math from "./_Math";
export default class Matrix4 {
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
