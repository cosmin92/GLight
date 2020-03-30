/**
 * Class encapsulating easing functions
 */
export default class Ease {
    /**
     * No easing, no acceleration
     *
     * @param {number} t
     */
    static linear(t) {
        return t;
    }
    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    static easeInQuad(t) {
        return t * t;
    }
    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    static easeOutQuad(t) {
        return t * (2 - t);
    }
    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    static easeInOutQuad(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    static easeInCubic(t) {
        return t * t * t;
    }
    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    static easeOutCubic(t) {
        return (--t) * t * t + 1;
    }
    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    static easeInOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    static easeInQuart(t) {
        return t * t * t * t;
    }
    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    static easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    static easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    static easeInQuint(t) {
        return t * t * t * t * t;
    }
    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    static easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
    }
    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    static easeInOutQuint(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
    /**
     * Elastic bounce effect at the beginning and end
     *
     * @param {number} t
     */
    static easeOutElastic(t) {
        return .04 * t / (--t) * Math.sin(25 * t);
    }
    /**
     * Elastic bounce effect at the beginning and end
     *
     * @param {number} t
     */
    static easeInOutElastic(t) {
        return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;
    }
    /**
     * Sinusoidal effect at the beginning
     *
     * @param {number} t
     */
    static easeInSin(t) {
        return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
    }
    /**
     * Sinusoidal effect at the end
     *
     * @param {number} t
     */
    static easeOutSin(t) {
        return Math.sin(Math.PI / 2 * t);
    }
    /**
     * Sinusoidal effect at the beginning and end
     *
     * @param {number} t
     */
    static easeInOutSin(t) {
        return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
    }
}
