import Geometry from './Geometry';
/**
 * Class representing a Sphere. It generate data for a sphere geometry
 */
export default class SphereGeometry extends Geometry {
    /**
     * SphereGeometry constructor
     *
     * @param {number} radius
     * @param {number} axisDivisions
     * @param {number} heightDivisions
     * @param {Float32Array} colors
     */
    constructor(radius = 1, axisDivisions = 8, heightDivisions = 8, colors) {
        let sphere = SphereGeometry.generate(radius, axisDivisions, heightDivisions);
        super(new Float32Array(sphere.vertices), new Uint16Array(sphere.indices), new Float32Array(sphere.normals), new Float32Array(sphere.uvs), colors);
    }
    /**
     * Generate sphere data
     *
     * @param {number} radius
     * @param {number} axisDivisions
     * @param {number} heightDivisions
     */
    static generate(radius = 1, axisDivisions = 8, heightDivisions = 8) {
        const vertices = [];
        const normals = [];
        const uvs = [];
        for (let axisNumber = 0; axisNumber <= axisDivisions; axisNumber += 1) {
            const theta = axisNumber * Math.PI / axisDivisions;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            for (let heightNumber = 0; heightNumber <= heightDivisions; heightNumber += 1) {
                const phi = heightNumber * 2 * Math.PI / heightDivisions;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;
                const u = 1 - heightNumber / heightDivisions;
                const v = 1 - axisNumber / axisDivisions;
                normals.push(x);
                normals.push(y);
                normals.push(z);
                uvs.push(u);
                uvs.push(v);
                vertices.push(radius / 2 * x);
                vertices.push(radius / 2 * y);
                vertices.push(radius / 2 * z);
            }
        }
        const indices = [];
        for (let axisNumber = 0; axisNumber < axisDivisions; axisNumber += 1) {
            for (let heightNumber = 0; heightNumber < heightDivisions; heightNumber += 1) {
                const first = axisNumber * (heightDivisions + 1) + heightNumber;
                const second = first + heightDivisions + 1;
                indices.push(first);
                indices.push(second);
                indices.push(first + 1);
                indices.push(second);
                indices.push(second + 1);
                indices.push(first + 1);
            }
        }
        return {
            vertices: vertices,
            indices: indices,
            normals: normals,
            uvs: uvs
        };
    }
}
