import Geometry from "../Geometry";

export default class LightGeometry extends Geometry {

    public constructor() {
        super(new Float32Array(LightGeometry.generateData()));
    }

    public static generateData(): number[] {
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