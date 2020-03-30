import { EASE, INTERPOLATION } from "../Constants";
import Keyframe from "./Keyframe";
import _Math from "../math/_Math";
/**
 * Manager class of keyframes
 */
export default class KeyframeTrack {
    /**
     * KeyframeTrack contructor
     *
     * @param {Renderable} renderable
     * @param interpolationType
     */
    constructor(renderable, interpolationType = INTERPOLATION.LINEAR) {
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
    add(time, controlPoint, ease = EASE.LINEAR) {
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
            if (this._interpolationType === INTERPOLATION.LINEAR && this._currentKeyframeIndex < this._controlPoints.length - 1) {
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
