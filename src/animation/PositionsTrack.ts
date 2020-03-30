import KeyframeTrack from "./KeyframeTrack";
import {EASE, INTERPOLATION} from "../Constants";
import _Math from "../math/_Math";
import BSpline from "../math/BSpline";
import Renderable from "../core/Renderable";

/**
 * Class managing the position
 */
export default class PositionsTrack extends KeyframeTrack {

    /**
     * PositionTrack constructor
     *
     * @param {Renderable} renderable
     */
    public constructor(renderable: Renderable) {
        super(renderable);
    }

    /**
     * Add a new keyframe to the track
     *
     * @param {number} time
     * @param {EASE} ease
     */
    public addKeyframe(time: number, ease: EASE = EASE.LINEAR) {
        super.add(time, this._renderable.translate.getArray(), ease);

        if (this._controlPoints.length >= 2) {
            let points: number[][] = [];
            for (let i = 0; i < this._controlPoints.length; i++) {
                points.push(this._controlPoints[i].controlPoint);
            }
            this._bSpline = new BSpline(points, 4);
        }
    }

    /**
     * Calculate the interpolated property at time elapsed time
     *
     * @param {number} elapsedTime
     */
    public update(elapsedTime: number) {
        super.update(elapsedTime);
        this._renderable.translate.set(this._point[0], this._point[1], this._point[2]);
    }
}