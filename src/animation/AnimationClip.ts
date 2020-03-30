import KeyframeTrack from "./KeyframeTrack";
import Renderer from "../renderers/Renderer";
import Renderable from "../core/Renderable";

/**
 * Class taking tracks an creating animations
 */
export default class AnimationClip {

    private readonly _tracks: KeyframeTrack[];

    private _loop: boolean;
    private _startTime: number;
    private _elapsedTime: number;
    private readonly _animationRate: number;
    private readonly _fps: number;
    private _renderer: Renderer;
    private _requestID: number;
    private _rangeMin: number;
    private _rangeMax: number;

    /**
     * AnimationClip constructor
     *
     * @param {Renderer} renderer
     */
    public constructor(renderer: Renderer) {

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
    public addTrack(track: KeyframeTrack) {
        this._tracks.push(track);
        this._findRange();
    }

    /**
     * Remove a track from the animation
     *
     * @param {Renderable} renderable
     */
    public removeTrack(renderable: Renderable) {
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
    public getTrack(renderable: Renderable) {
        for (let i = 0; i < this._tracks.length; i++) {
            if (this._tracks[i].renderable.uuid === renderable.uuid) {
                return this._tracks[i];
            }
        }
    }

    /**
     * Start the animation
     */
    public start() {
        this._startTime = (new Date()).getTime();
        this._elapsedTime = 0;
        this._animate();
    }

    /**
     * Stops the animation
     */
    public stop() {
        cancelAnimationFrame(this._requestID);
    }

    /**
     * Mack the animation restarting ech time
     */
    public loop() {
        this._loop = !this._loop;
    }

    /**
     * Do animation
     *
     * @private
     */
    private _animate() {
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

        } else {
            this._requestID = requestAnimationFrame(this._animate.bind(this));
        }

    }

    /**
     * Fin the min a max time of the animation
     *
     * @private
     */
    private _findRange() {
        if (this._tracks.length === 0) return;

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