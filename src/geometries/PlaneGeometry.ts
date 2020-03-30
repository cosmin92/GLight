import Geometry from "./Geometry";

/**
 * Class representing a Plane. It generate data for a plane geometry
 */
export default class PlaneGeometry extends Geometry {

    /**
     * PlaneGeometry constructor
     *
     * @param {string} axis
     * @param {number} width
     * @param {number} height
     * @param {number} widthSegments
     * @param {number} heightSegments
     * @param {Float32Array} colors
     */
    public constructor(axis: string = "XY", width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1, colors?: Float32Array) {

        let plane = PlaneGeometry.generate(axis, width, height, widthSegments, heightSegments);

        super(new Float32Array(plane.vertices), new Uint16Array(plane.indices), new Float32Array(plane.normals), new Float32Array(plane.uvs), colors);
    }

    /**
     * Generate plane data
     *
     * @param {string} axis
     * @param {number} width
     * @param {number} height
     * @param {number} widthSegments
     * @param {number} heightSegments
     */
    public static generate(axis: string = "XY", width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1) {

        let vertices: number[] = [];
        let normals: number[] = [];
        let uvs: number[] = [];
        const indices: number[] = [];

        const spacerX = width / widthSegments;
        const spacerY = height / heightSegments;
        const offsetX = -width * 0.5;
        const offsetY = -height * 0.5;
        const spacerU = 1 / widthSegments;
        const spacerV = 1 / heightSegments;

        let index = 0;

        for (let y = 0; y < heightSegments; y += 1) {
            for (let x = 0; x < widthSegments; x += 1) {
                const triangleX = spacerX * x + offsetX;
                const triangleY = spacerY * y + offsetY;

                const u = x / widthSegments;
                const v = y / heightSegments;

                switch (axis) {
                    case 'XZ': {
                        vertices = vertices.concat([triangleX, 0, triangleY]);
                        vertices = vertices.concat([triangleX + spacerX, 0, triangleY]);
                        vertices = vertices.concat([
                            triangleX + spacerX,
                            0,
                            triangleY + spacerY
                        ]);
                        vertices = vertices.concat([triangleX, 0, triangleY + spacerY]);

                        normals = normals.concat([0, 1, 0]);
                        normals = normals.concat([0, 1, 0]);
                        normals = normals.concat([0, 1, 0]);
                        normals = normals.concat([0, 1, 0]);

                        uvs = uvs.concat([u, 1 - v]);
                        uvs = uvs.concat([u + spacerU, 1 - v]);
                        uvs = uvs.concat([u + spacerU, 1 - (v + spacerV)]);
                        uvs = uvs.concat([u, 1 - (v + spacerV)]);
                        break;
                    }
                    case 'YZ': {
                        vertices = vertices.concat([0, triangleY, triangleX]);
                        vertices = vertices.concat([0, triangleY, triangleX + spacerX]);
                        vertices = vertices.concat([
                            0,
                            triangleY + spacerY,
                            triangleX + spacerX
                        ]);
                        vertices = vertices.concat([0, triangleY + spacerY, triangleX]);

                        normals = normals.concat([1, 0, 0]);
                        normals = normals.concat([1, 0, 0]);
                        normals = normals.concat([1, 0, 0]);
                        normals = normals.concat([1, 0, 0]);

                        uvs = uvs.concat([1 - u, v]);
                        uvs = uvs.concat([1 - (u + spacerU), v]);
                        uvs = uvs.concat([1 - (u + spacerU), v + spacerV]);
                        uvs = uvs.concat([1 - u, v + spacerV]);
                        break;
                    }
                    default: {
                        vertices = vertices.concat([triangleX, triangleY, 0]);
                        vertices = vertices.concat([triangleX + spacerX, triangleY, 0]);
                        vertices = vertices.concat([
                            triangleX + spacerX,
                            triangleY + spacerY,
                            0
                        ]);
                        vertices = vertices.concat([triangleX, triangleY + spacerY, 0]);

                        normals = normals.concat([0, 0, 1]);
                        normals = normals.concat([0, 0, 1]);
                        normals = normals.concat([0, 0, 1]);
                        normals = normals.concat([0, 0, 1]);

                        uvs = uvs.concat([u, v]);
                        uvs = uvs.concat([u + spacerU, v]);
                        uvs = uvs.concat([u + spacerU, v + spacerV]);
                        uvs = uvs.concat([u, v + spacerV]);
                    }
                }

                indices.push(index * 4);
                indices.push(index * 4 + 1);
                indices.push(index * 4 + 2);
                indices.push(index * 4);
                indices.push(index * 4 + 2);
                indices.push(index * 4 + 3);

                index += 1;
            }
        }

        return {
            vertices: vertices,
            indices: indices,
            normals: normals,
            uvs: uvs
        }
    }
}