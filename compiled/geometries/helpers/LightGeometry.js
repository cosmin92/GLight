import Geometry from "../Geometry";
export default class LightGeometry extends Geometry {
    constructor() {
        super(new Float32Array(LightGeometry.generateData()));
    }
    static generateData() {
        let vertices = [];
        // top triangle
        vertices.push(0.1);
        vertices.push(0);
        vertices.push(0);
        vertices.push(-0.1);
        vertices.push(0);
        vertices.push(0);
        vertices.push(0);
        vertices.push(0.1);
        vertices.push(0);
        vertices.push(0);
        vertices.push(-0.1);
        vertices.push(0);
        vertices.push(0);
        vertices.push(0);
        vertices.push(0.1);
        vertices.push(0);
        vertices.push(0);
        vertices.push(-0.1);
        vertices.push(0.1 * Math.cos(45));
        vertices.push(0.1 * Math.sin(45));
        vertices.push(0);
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.sin(45));
        vertices.push(0);
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(0.1 * Math.sin(45));
        vertices.push(0);
        vertices.push(0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.sin(45));
        vertices.push(0);
        vertices.push(0);
        vertices.push(0.1 * Math.cos(45));
        vertices.push(0.1 * Math.sin(45));
        vertices.push(0);
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.sin(45));
        vertices.push(0);
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(0.1 * Math.sin(45));
        vertices.push(0);
        vertices.push(0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.sin(45));
        vertices.push(0.1 * Math.cos(45));
        vertices.push(0);
        vertices.push(0.1 * Math.sin(45));
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(0);
        vertices.push(-0.1 * Math.sin(45));
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(0);
        vertices.push(0.1 * Math.sin(45));
        vertices.push(0.1 * Math.cos(45));
        vertices.push(0);
        vertices.push(-0.1 * Math.sin(45));
        vertices.push(0.1 * Math.cos(45));
        vertices.push(0.1 * Math.cos(45));
        vertices.push(0.1 * Math.sin(45));
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.sin(45));
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(0.1 * Math.cos(45));
        vertices.push(0.1 * Math.sin(45));
        vertices.push(0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.cos(45));
        vertices.push(-0.1 * Math.sin(45));
        // TODO:
        return vertices;
    }
}
