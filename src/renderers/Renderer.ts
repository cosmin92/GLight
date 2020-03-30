import Camera from "../cameras/Camera";
import Scene from "../core/Scene";
import Color from "../core/Color";
import PerspectiveCamera from "../cameras/PerspectiveCamera";
import Controls from "../input/Controls";
import {CAMERA} from "../Constants";
import {getWebGL} from "../core/GL";
import Grid from "../helpers/Grid";
import Axis from "../helpers/Axis";

/**
 * Class used to initially setup the rendering context
 */
export default class Renderer {

    private _gl: WebGLRenderingContext;

    private readonly _scene: Scene;
    private _viewer: Camera;
    private _controls: Controls;

    private _grid: Grid;
    private _showGrid: boolean;

    private _axis: Axis;
    private _showAxis: boolean;

    private _viewportOffsetX: number;
    private _viewportOffsetY: number;
    private _viewportWidth: number;
    private _viewportHeight: number;

    /**
     * The clearing color
     *
     * @type {Color}
     * @private
     */
    private static _clearColor: Color = new Color(80, 80, 80, 255);

    /**
     * Renderer constructor
     *
     * @param {Scene} scene
     * @param {Camera} viewer
     */
    public constructor(scene: Scene, viewer: Camera = new PerspectiveCamera("Viewer", CAMERA)) {

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
    public enable(cap: GLenum) {
        this._gl.enable(cap);
    }

    /**
     * Disables WebGL functions
     *
     * @param {GLenum} cap
     */
    public disable(cap: GLenum) {
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
    public setViewport(offsetX: number, offsetY: number, width: number, height: number) {

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
    public static setClearColor(red: number = 0, green: number = 0, blue: number = 0) {
        Renderer._clearColor.red = red;
        Renderer._clearColor.green = green;
        Renderer._clearColor.blue = blue;
        Renderer._clearColor.alpha = 255;
    }

    /**
     * Render the scene
     */
    public render() {
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
    public get scene(): Scene {
        return this._scene;
    }

    /**
     * Gets thew viewer
     *
     * @return {Camera}
     */
    public get viewer(): Camera {
        return this._viewer;
    }


    /**
     * Gets the grid
     *
     * @return {Grid}
     */
    public get grid(): Grid {
        return this._grid;
    }

    /**
     * Gets axis
     *
     * @return {Axis}
     */
    public get axis(): Axis {
        return this._axis;
    }

    /**
     * Sets a new viewer
     *
     * @param {Camera} value
     */
    public set viewer(value: Camera) {
        this._viewer = value;
    }

    /**
     * Gets the starting coordinate x of the viewport
     *
     * @return {number}
     */
    public get viewportOffsetX(): number {
        return this._viewportOffsetX;
    }

    /**
     * Gets the starting coordinate y of the viewport
     *
     * @return {number}
     */
    public get viewportOffsetY(): number {
        return this._viewportOffsetY;
    }

    /**
     * Gets the viewport width
     *
     * @return {number}
     */
    public get viewportWidth(): number {
        return this._viewportWidth;
    }

    /**
     * Gets the viewport height
     *
     * @return {number}
     */
    public get viewportHeight(): number {
        return this._viewportHeight;
    }

    /**
     * Utility method. Sets the indicator variable showGrid to true
     */
    public showGrid(): void {
        this._showGrid = true;
    }
    /**
     * Utility method. Sets the indicator variable showGrid to false
     */
    public hideGrid(): void {
        this._showGrid = false;
    }

    /**
     * Utility method. Sets the indicator variable showAxis to true
     */
    public showAxis(): void {
        this._showAxis = true;
    }

    /**
     * Utility method. Sets the indicator variable showAxis to false
     */
    public hideAxis() {
        this._showAxis = false;
    }

    /**
     * Switch between hide an show the axis
     */
    public hide_show_axis(){
        this._showAxis =!this._showAxis;
    }

    /**
     * Switch between hide an show the grid
     */
    public hide_show_grid(){
        this._showGrid =!this._showGrid;
    }

    /**
     * Returns tre if axis are visible
     *
     * @return {boolean}
     */
    public get axisVisible(): boolean{
        return this._showAxis
    }

    /**
     * Returns tre if grid is visible
     *
     * @return {boolean}
     */
    public get gridVisible(): boolean{
        return this._showAxis
    }
}