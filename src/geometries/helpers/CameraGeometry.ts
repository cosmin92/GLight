import Geometry from "../Geometry";

export default class CameraGeometry extends Geometry {

    public constructor() {
        super(new Float32Array(CameraGeometry.generateData()));
    }

    public static generateData(): number[] {
        let vertices = [0, 0, 0, 0.3, 0.2, -0.4, -0.3, 0.2, -0.4];

        // bottom triangle
        vertices.push(0);
        vertices.push(0);
        vertices.push(0);

        vertices.push(0.3);
        vertices.push(-0.2);
        vertices.push(-0.4);

        vertices.push(-0.3);
        vertices.push(-0.2);
        vertices.push(-0.4);

        // left triangle
        vertices.push(0);
        vertices.push(0);
        vertices.push(0);

        vertices.push(0.3);
        vertices.push(0.2);
        vertices.push(-0.4);

        vertices.push(0.3);
        vertices.push(-0.2);
        vertices.push(-0.4);


        // right triangle
        vertices.push(0);
        vertices.push(0);
        vertices.push(0);

        vertices.push(-0.3);
        vertices.push(0.2);
        vertices.push(-0.4);

        vertices.push(-0.3);
        vertices.push(-0.2);
        vertices.push(-0.4);

        // top triangle
        vertices.push(0);
        vertices.push(0.30);
        vertices.push(-0.4);

        vertices.push(0.25);
        vertices.push(0.21);
        vertices.push(-0.4);

        vertices.push(-0.25);
        vertices.push(0.21);
        vertices.push(-0.4);

        return vertices;
    }
}