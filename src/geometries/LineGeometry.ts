import Geometry from "./Geometry";

/**
 * Class representing a line. It generate data for a line geometry
 */
export default class LineGeometry extends Geometry {

    /**
     * LineGeometry constructor
     *
     * @param {number} x1
     * @param {number} y1
     * @param {number} z1
     * @param {number} x2
     * @param {number} y2
     * @param {number} z2
     */
    public constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
        super(new Float32Array([x1, y1, z1, x2, y2, z2]));
    }
}