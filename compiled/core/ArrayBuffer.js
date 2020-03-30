import { getWebGL } from "./GL";
export default class ArrayBuffer {
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
