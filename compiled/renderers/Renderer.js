import Color from "../core/Color";
import PerspectiveCamera from "../cameras/PerspectiveCamera";
import Controls from "../input/Controls";
import { CAMERA } from "../Constants";
import { getWebGL } from "../core/GL";
import Grid from "../helpers/Grid";
import Axis from "../helpers/Axis";
/**
 * Class used to initially setup the rendering context
 */
export default class Renderer {
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
