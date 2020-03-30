import KeyframeTrack from "./KeyframeTrack";
import { EASE } from "../Constants";
import BSpline from "../math/BSpline";
/**
 * Class managing the orientation
 */
export default class RotationsTrack extends KeyframeTrack {
    /**
     * RotationTrack constructor
     *
     * @param {Renderable} renderable
     */
    constructor(renderable) {
        super(renderable);
    }
    /**
     * Add a new keyframe to the track
     *
     * @param {number} time
     * @param {EASE} ease
     */
    addKeyframe(time, ease = EASE.LINEAR) {
        super.add(time, this._renderable.rotate.getArray(), ease);
        if (this._controlPoints.length >= 2) {
            let points = [];
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
    update(elapsedTime) {
        super.update(elapsedTime);
        this._renderable.rotate.set(this._point[0], this._point[1], this._point[2]);
    }
}
