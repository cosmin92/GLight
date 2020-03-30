/**
 * Class encapsulating math util functions
 */
export default class _Math {
    /**
     * Linear interpolation
     *
     * @param {number} t
     * @param {number[]} a
     * @param {number[]} b
     * @param {function} ease
     */
    static lerp(t, a, b, ease) {
        let out = [];
        out.push(((b[0] - a[0]) * ease(t)) + a[0]);
        out.push(((b[1] - a[1]) * ease(t)) + a[1]);
        out.push(((b[2] - a[2]) * ease(t)) + a[2]);
        return out;
    }
    /**
     * Generate a unique identifier.
     * RFC4122 version 4
     *
     * @return {string}
     */
    static UUIDv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
/**
 * Constant by which multiplications converts degrees to radians
 */
_Math.deg2Rad = Math.PI / 180;
