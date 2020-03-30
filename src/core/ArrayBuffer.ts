import {getWebGL} from "./GL";

export default class ArrayBuffer {

    private _gl: WebGLRenderingContext;

    private readonly _itemSize: number;
    private _numItems: number;

    private _buffer: WebGLBuffer;

    public constructor(data: Float32Array, itemSize: number) {
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
    public bind(): void {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
    }

    /**
     * Unbind the buffer
     */
    public unbind(): void {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
    }

    /**
     * Update the data into the GPU memory buffer
     *
     * @param {Float32Array} data - the new data
     */
    public update(data: Float32Array): void {
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
    public setAttributePointer(index: GLuint, size?: GLint, type?: GLenum, normalized?: GLboolean, stride?: GLsizei, offset?: GLintptr): void {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
        this._gl.vertexAttribPointer(index, size || this._itemSize, type || this._gl.FLOAT, normalized || false, stride || 0, offset || 0);
        this._gl.enableVertexAttribArray(index);
    }

    /**
     * Number of items per element
     *
     * @return {number}
     */
    public get itemSize(): number {
        return this._itemSize;
    }

    /**
     * Number of element
     *
     * @return {number}
     */
    public get numItems(): number {
        return this._numItems;
    }

    /**
     * Reference to the buffer
     *
     * @return {WebGLBuffer}
     */
    public get buffer(): WebGLBuffer {
        return this._buffer;
    }

    /**
     * frees the memory
     */
    public dispose(): void {
        this._gl.deleteBuffer(this._buffer);
        delete this._buffer;
    }
}