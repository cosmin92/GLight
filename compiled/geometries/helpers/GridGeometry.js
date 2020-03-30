import Geometry from "../Geometry";
export default class GridGeometry extends Geometry {
    /**
     * GridGeometry constructor
     *
     * @param {number} size
     * @param {number} divisions
     */
    constructor(size = 2, divisions = 10) {
        super(new Float32Array(GridGeometry.generateData(size, divisions)));
    }
    /**
     * Generate the grid data
     *
     * @param {number} size
     * @param {number} divisions
     */
    static generateData(size = 2, divisions = 10) {
        let vertices = [];
        let step = size / divisions;
        let half = size / 2;
        let p;
        for (let i = 0; i <= divisions; i++) {
            p = -half + (i * step);
            if (p === 0)
                continue;
            vertices.push(p); //x1
            vertices.push(0); //y1 vertices.push(half);
            vertices.push(half); //z1 vertices.push(0);
            vertices.push(p); //x2
            vertices.push(0); //y2 vertices.push(-half);
            vertices.push(-half); //z2 vertices.push(0);
            p = half - (i * step);
            if (p === 0)
                continue;
            vertices.push(-half); //x1
            vertices.push(0); //y1 vertices.push(p);
            vertices.push(p); //z1 vertices.push(0);
            vertices.push(half); //x2
            vertices.push(0); //y2 vertices.push(p);
            vertices.push(p); //z2 vertices.push(0);
        }
        return vertices;
    }
}
