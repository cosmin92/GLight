import { getWebGL } from "../core/GL";
import Program from "../shaders/Program";
import { offScreenFragmentShader, offScreenVertexShader } from "../shaders/basicShaders";
import Color from "../core/Color";
/**
 * Class implementing the picking method
 */
export default class Picker {
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
