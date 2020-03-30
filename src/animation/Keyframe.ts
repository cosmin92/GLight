import Ease from "./Ease";
import {EASE} from "../Constants";

/**
 * Class representing a key frame
 */
export default class Keyframe {

    private _ease: (t: number) => any;

    private _time: number;
    private _controlPoint: number[];

    /**
     * Keyframe constructor
     *
     * @param {number} time
     * @param {number[]} controlPoint
     * @param {number} ease
     */
    public constructor(time: number, controlPoint: number[], ease: EASE = EASE.LINEAR) {
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
    public getEase(): (t: number) => any {
        return this._ease;
    }

    /**
     * Set te easing type
     *
     * @param {EASE} value
     */
    public setEase(value: EASE) {
        this._ease = Keyframe._easingFunctionConversion(value);
    }

    /**
     * Return the instant of this keyframe
     *
     * @return {number}
     */
    public get time(): number {
        return this._time;
    }

    /**
     * Ste the instant to a new time
     *
     * @param {number} value
     */
    public set time(value: number) {
        this._time = value;
    }

    /**
     * Return the control point
     *
     * @return {number[]}
     */
    public get controlPoint(): number[] {
        return this._controlPoint;
    }

    /**
     * Modify the control point
     *
     * @param {number[] }value
     */
    public set controlPoint(value: number[]) {
        this._controlPoint = value;
    }

    /**
     * Helper function to choose the easing function
     *
     * @param {EASE} ease
     * @private
     */
    private static _easingFunctionConversion(ease: EASE): (t: number) => any {
        switch (ease) {
            case EASE.IN_OUT_QUAD:
                return Ease.easeInOutQuad;
            case EASE.OUT_QUAD:
                return Ease.easeOutQuad;
            case EASE.IN_QUAD:
                return Ease.easeInQuad;
            case EASE.IN_OUT_CUBIC:
                return Ease.easeInOutCubic;
            case EASE.OUT_CUBIC:
                return Ease.easeOutCubic;
            case EASE.IN_CUBIC:
                return Ease.easeInCubic;
            case EASE.IN_OUT_QUART:
                return Ease.easeInQuart;
            case EASE.OUT_QUART:
                return Ease.easeOutQuart;
            case EASE.IN_QUART:
                return Ease.easeInQuart;
            case EASE.IN_OUT_QUINT:
                return Ease.easeInOutQuint;
            case EASE.OUT_QUINT:
                return Ease.easeOutQuint;
            case EASE.IN_QUINT:
                return Ease.easeInQuint;
            case EASE.IN_OUT_ELASTIC:
                return Ease.easeInOutElastic;
            case EASE.OUT_ELASTIC:
                return Ease.easeOutElastic;
            case EASE.IN_OUT_SIN:
                return Ease.easeInOutSin;
            case EASE.OUT_SIN:
                return Ease.easeInOutSin;
            case EASE.IN_SIN:
                return Ease.easeInSin;
            case EASE.LINEAR:
                return Ease.linear;
            default :
                return Ease.linear;
        }
    }
}