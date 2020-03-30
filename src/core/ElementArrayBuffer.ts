import {getWebGL} from "./GL";

export default class ElementArrayBuffer {

    private _gl: WebGLRenderingContext;

    private _numItems: number;

    private _buffer: WebGLBuffer;

    public constructor(data: Uint16Array | Uint32Array, itemSize: number) {
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
    public bind(): void {
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    }

    /**
     * Unbind the buffer
     */
    public unbind(): void {
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
    }

    /**
     * Update the data into the GPU memory buffer
     *
     * @param {Float32Array} data - the new data
     */
    public update(data: Float32Array): void {
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