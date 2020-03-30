/**
 * Class encapsulating easing functions
 */
export default class Ease {

    /**
     * No easing, no acceleration
     *
     * @param {number} t
     */
    public static linear(t: number) {
        return t;
    }

    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    public static easeInQuad(t: number) {
        return t * t;
    }

    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    public static easeOutQuad(t: number) {
        return t * (2 - t);
    }

    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    public static easeInOutQuad(t: number) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    public static easeInCubic(t: number) {
        return t * t * t
    }

    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    public static easeOutCubic(t: number) {
        return (--t) * t * t + 1;
    }

    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    public static easeInOutCubic(t: number) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    public static easeInQuart(t: number) {
        return t * t * t * t;
    }

    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    public static easeOutQuart(t: number) {
        return 1 - (--t) * t * t * t;
    }

    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    public static easeInOutQuart(t: number) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    /**
     * Accelerating from zero velocity
     *
     * @param {number} t
     */
    public static easeInQuint(t: number) {
        return t * t * t * t * t
    }

    /**
     * Decelerating to zero velocity
     *
     * @param {number} t
     */
    public static easeOutQuint(t: number) {
        return 1 + (--t) * t * t * t * t;
    }

    /**
     * Acceleration until halfway, then deceleration
     *
     * @param {number} t
     */
    public static easeInOutQuint(t: number) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }

    /**
     * Elastic bounce effect at the beginning and end
     *
     * @param {number} t
     */
    public static easeOutElastic(t: number) {
        return .04 * t / (--t) * Math.sin(25 * t)
    }

    /**
     * Elastic bounce effect at the beginning and end
     *
     * @param {number} t
     */
    public static easeInOutElastic(t: number) {
        return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
    }

    /**
     * Sinusoidal effect at the beginning
     *
     * @param {number} t
     */
    public static easeInSin(t: number) {
        return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
    }

    /**
     * Sinusoidal effect at the end
     *
     * @param {number} t
     */
    public static easeOutSin(t: number) {
        return Math.sin(Math.PI / 2 * t);
    }

    /**
     * Sinusoidal effect at the beginning and end
     *
     * @param {number} t
     */
    public static easeInOutSin(t: number) {
        return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
    }
}