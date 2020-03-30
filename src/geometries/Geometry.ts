import ElementArrayBuffer from "../core/ElementArrayBuffer";
import ArrayBuffer from "../core/ArrayBuffer";
import {getWebGL} from "../core/GL";
import Program from "../shaders/Program";

/**
 * Class representing a generic Geometry
 */
export default class Geometry {

    private _gl: WebGLRenderingContext;

    private readonly _positionsBuffer: ArrayBuffer;

    private _indexBuffer: ElementArrayBuffer | null = null;
    private _normalBuffer: ArrayBuffer | null = null;
    private _uvBuffer: ArrayBuffer | null = null;
    private _colorBuffer: ArrayBuffer | null = null;

    private _tangentBuffer: ArrayBuffer | null = null;
    private _biTangentBuffer: ArrayBuffer | null = null;

    /**
     * Geometry constructor
     *
     * @param {Float32Array} vertices
     * @param {Uint16Array | Uint32Array} indices
     * @param {Float32Array} normals
     * @param {Float32Array} uvs
     * @param {Float32Array} colors
     */
    public constructor(vertices: Float32Array, indices?: Uint16Array | Uint32Array, normals?: Float32Array, uvs?: Float32Array, colors?: Float32Array) {

        this._gl = getWebGL();

        this._positionsBuffer = new ArrayBuffer(vertices, 3);

        if (indices) {
            this._indexBuffer = new ElementArrayBuffer(indices, 1);
        }

        if (normals) {
            this._normalBuffer = new ArrayBuffer(normals, 3);
        }

        if (uvs) {
            this._uvBuffer = new ArrayBuffer(uvs, 2);
        }

        if (colors) {
            this._colorBuffer = new ArrayBuffer(colors, 3);
        }

        this._tangentBuffer = null;
        this._biTangentBuffer = null;
    }

    /**
     * Sets the indices data
     *
     * @param {Uint16Array | Uint32Array} indices
     */
    public setIndex(indices: Uint16Array | Uint32Array): void {
        if (this._indexBuffer !== null) {
            this._indexBuffer.dispose();
        }
        this._indexBuffer = new ElementArrayBuffer(indices, 1);
    }

    /**
     * Sets the normals
     *
     * @param {Float32Array} normals
     */
    public setNormals(normals: Float32Array) {

        if (this._normalBuffer !== null) {
            this._normalBuffer.dispose();
        }

        if (normals.length / 3 !== this._positionsBuffer.numItems) {
            console.warn("Invalid normals data! the normals will not be used");
            return;
        }

        this._normalBuffer = new ArrayBuffer(normals, 3);
    }

    /**
     * Sets the texture coordinates
     *
     * @param {Float32Array} uvs
     */
    public setUVs(uvs: Float32Array) {

        if (this._uvBuffer !== null) {
            this._uvBuffer.dispose();
        }

        if (uvs.length / 2 !== this._positionsBuffer.numItems) {
            console.warn("Invalid uvs data! the normals will not be used");
            return;
        }

        this._uvBuffer = new ArrayBuffer(uvs, 2);
    }

    /**
     * Sets the vertices colors
     *
     * @param {Float32Array} colors
     */
    public setColors(colors: Float32Array) {

        if (this._colorBuffer !== null) {
            this._colorBuffer.dispose();
        }

        if (colors.length / 3 !== this._positionsBuffer.numItems) {
            console.warn("Invalid colors data! the normals will not be used");
            return;
        }

        this._colorBuffer = new ArrayBuffer(colors, 2);
    }

    // TODO: calculate tangents and bi-tangents
    /*public calculateTangentsAndBitangents(): void {

        if (this._indexBuffer === null) {
            console.warn("Index buffer not defined. Cannot calculate Tangents and Bitangents");
            return;
        }

        if (this._normalBuffer === null) {
            console.warn("Vertex normals buffer not defined. Cannot calculate Tangents and Bitangents");
            return;
        }

        if (this._uvBuffer === null) {
            console.warn("Vertex texture coordinates buffer not defined. Cannot calculate Tangents and Bitangents");
            return;
        }

        const unpacked = {
            tangents: [...new Array(this._positionsBuffer.data.length)].map(_ => 0),
            biTangents: [...new Array(this._positionsBuffer.data.length)].map(_ => 0),
        };

        // Loop through all faces in the whole mesh
        const indices = this._indexBuffer.data;
        const vertices = this._positionsBuffer.data;
        const normals = this._normalBuffer.data;
        const uvs = this._uvBuffer.data;

        for (let i = 0; i < indices.length; i += 3) {
            const i0 = indices[i];
            const i1 = indices[i + 1];
            const i2 = indices[i + 2];

            const x_v0 = vertices[i0 * 3];
            const y_v0 = vertices[i0 * 3 + 1];
            const z_v0 = vertices[i0 * 3 + 2];

            const x_uv0 = uvs[i0 * 2];
            const y_uv0 = uvs[i0 * 2 + 1];

            const x_v1 = vertices[i1 * 3];
            const y_v1 = vertices[i1 * 3 + 1];
            const z_v1 = vertices[i1 * 3 + 2];

            const x_uv1 = uvs[i1 * 2];
            const y_uv1 = uvs[i1 * 2 + 1];

            const x_v2 = vertices[i2 * 3];
            const y_v2 = vertices[i2 * 3 + 1];
            const z_v2 = vertices[i2 * 3 + 2];

            const x_uv2 = uvs[i2 * 2];
            const y_uv2 = uvs[i2 * 2 + 1];

            const x_deltaPos1 = x_v1 - x_v0;
            const y_deltaPos1 = y_v1 - y_v0;
            const z_deltaPos1 = z_v1 - z_v0;

            const x_deltaPos2 = x_v2 - x_v0;
            const y_deltaPos2 = y_v2 - y_v0;
            const z_deltaPos2 = z_v2 - z_v0;

            const x_uvDeltaPos1 = x_uv1 - x_uv0;
            const y_uvDeltaPos1 = y_uv1 - y_uv0;

            const x_uvDeltaPos2 = x_uv2 - x_uv0;
            const y_uvDeltaPos2 = y_uv2 - y_uv0;

            const rInv = x_uvDeltaPos1 * y_uvDeltaPos2 - y_uvDeltaPos1 * x_uvDeltaPos2;
            const r = 1.0 / Math.abs(rInv < 0.0001 ? 1.0 : rInv);

            // Tangent
            const x_tangent = (x_deltaPos1 * y_uvDeltaPos2 - x_deltaPos2 * y_uvDeltaPos1) * r;
            const y_tangent = (y_deltaPos1 * y_uvDeltaPos2 - y_deltaPos2 * y_uvDeltaPos1) * r;
            const z_tangent = (z_deltaPos1 * y_uvDeltaPos2 - z_deltaPos2 * y_uvDeltaPos1) * r;

            // Bitangent
            const x_bitangent = (x_deltaPos2 * x_uvDeltaPos1 - x_deltaPos1 * x_uvDeltaPos2) * r;
            const y_bitangent = (y_deltaPos2 * x_uvDeltaPos1 - y_deltaPos1 * x_uvDeltaPos2) * r;
            const z_bitangent = (z_deltaPos2 * x_uvDeltaPos1 - z_deltaPos1 * x_uvDeltaPos2) * r;

            // Gram-Schmidt orthogonality
            const x_n0 = normals[i0 * 3];
            const y_n0 = normals[i0 * 3 + 1];
            const z_n0 = normals[i0 * 3 + 2];

            const x_n1 = normals[i1 * 3];
            const y_n1 = normals[i1 * 3 + 1];
            const z_n1 = normals[i1 * 3 + 2];

            const x_n2 = normals[i2 * 3];
            const y_n2 = normals[i2 * 3 + 1];
            const z_n2 = normals[i2 * 3 + 2];

            // Tangent
            const n0_dot_t = x_tangent * x_n0 + y_tangent * y_n0 + z_tangent * z_n0;
            const n1_dot_t = x_tangent * x_n1 + y_tangent * y_n1 + z_tangent * z_n1;
            const n2_dot_t = x_tangent * x_n2 + y_tangent * y_n2 + z_tangent * z_n2;

            const x_resTangent0 = x_tangent - x_n0 * n0_dot_t;
            const y_resTangent0 = y_tangent - y_n0 * n0_dot_t;
            const z_resTangent0 = z_tangent - z_n0 * n0_dot_t;

            const x_resTangent1 = x_tangent - x_n1 * n1_dot_t;
            const y_resTangent1 = y_tangent - y_n1 * n1_dot_t;
            const z_resTangent1 = z_tangent - z_n1 * n1_dot_t;

            const x_resTangent2 = x_tangent - x_n2 * n2_dot_t;
            const y_resTangent2 = y_tangent - y_n2 * n2_dot_t;
            const z_resTangent2 = z_tangent - z_n2 * n2_dot_t;

            const magTangent0 = Math.sqrt(
                x_resTangent0 * x_resTangent0 + y_resTangent0 * y_resTangent0 + z_resTangent0 * z_resTangent0,
            );
            const magTangent1 = Math.sqrt(
                x_resTangent1 * x_resTangent1 + y_resTangent1 * y_resTangent1 + z_resTangent1 * z_resTangent1,
            );
            const magTangent2 = Math.sqrt(
                x_resTangent2 * x_resTangent2 + y_resTangent2 * y_resTangent2 + z_resTangent2 * z_resTangent2,
            );

            // Bitangent
            const n0_dot_bt = x_bitangent * x_n0 + y_bitangent * y_n0 + z_bitangent * z_n0;
            const n1_dot_bt = x_bitangent * x_n1 + y_bitangent * y_n1 + z_bitangent * z_n1;
            const n2_dot_bt = x_bitangent * x_n2 + y_bitangent * y_n2 + z_bitangent * z_n2;

            const x_resBitangent0 = x_bitangent - x_n0 * n0_dot_bt;
            const y_resBitangent0 = y_bitangent - y_n0 * n0_dot_bt;
            const z_resBitangent0 = z_bitangent - z_n0 * n0_dot_bt;

            const x_resBitangent1 = x_bitangent - x_n1 * n1_dot_bt;
            const y_resBitangent1 = y_bitangent - y_n1 * n1_dot_bt;
            const z_resBitangent1 = z_bitangent - z_n1 * n1_dot_bt;

            const x_resBitangent2 = x_bitangent - x_n2 * n2_dot_bt;
            const y_resBitangent2 = y_bitangent - y_n2 * n2_dot_bt;
            const z_resBitangent2 = z_bitangent - z_n2 * n2_dot_bt;

            const magBitangent0 = Math.sqrt(
                x_resBitangent0 * x_resBitangent0 +
                y_resBitangent0 * y_resBitangent0 +
                z_resBitangent0 * z_resBitangent0,
            );

            const magBitangent1 = Math.sqrt(
                x_resBitangent1 * x_resBitangent1 +
                y_resBitangent1 * y_resBitangent1 +
                z_resBitangent1 * z_resBitangent1,
            );

            const magBitangent2 = Math.sqrt(
                x_resBitangent2 * x_resBitangent2 +
                y_resBitangent2 * y_resBitangent2 +
                z_resBitangent2 * z_resBitangent2,
            );

            unpacked.tangents[i0 * 3] += x_resTangent0 / magTangent0;
            unpacked.tangents[i0 * 3 + 1] += y_resTangent0 / magTangent0;
            unpacked.tangents[i0 * 3 + 2] += z_resTangent0 / magTangent0;

            unpacked.tangents[i1 * 3] += x_resTangent1 / magTangent1;
            unpacked.tangents[i1 * 3 + 1] += y_resTangent1 / magTangent1;
            unpacked.tangents[i1 * 3 + 2] += z_resTangent1 / magTangent1;

            unpacked.tangents[i2 * 3] += x_resTangent2 / magTangent2;
            unpacked.tangents[i2 * 3 + 1] += y_resTangent2 / magTangent2;
            unpacked.tangents[i2 * 3 + 2] += z_resTangent2 / magTangent2;

            unpacked.biTangents[i0 * 3] += x_resBitangent0 / magBitangent0;
            unpacked.biTangents[i0 * 3 + 1] += y_resBitangent0 / magBitangent0;
            unpacked.biTangents[i0 * 3 + 2] += z_resBitangent0 / magBitangent0;

            unpacked.biTangents[i1 * 3] += x_resBitangent1 / magBitangent1;
            unpacked.biTangents[i1 * 3 + 1] += y_resBitangent1 / magBitangent1;
            unpacked.biTangents[i1 * 3 + 2] += z_resBitangent1 / magBitangent1;

            unpacked.biTangents[i2 * 3] += x_resBitangent2 / magBitangent2;
            unpacked.biTangents[i2 * 3 + 1] += y_resBitangent2 / magBitangent2;
            unpacked.biTangents[i2 * 3 + 2] += z_resBitangent2 / magBitangent2;
        }

        this.setTangents(new Float32Array(unpacked.tangents));
        this.setBiTangents(new Float32Array(unpacked.biTangents));
    }*/

    /**
     * Frees the GPU memory
     */
    public dispose() {
        if (this._indexBuffer !== null) {
            this._indexBuffer.dispose();
            this._indexBuffer = null;
        }

        if (this._normalBuffer !== null) {
            this._normalBuffer.dispose();
            this._normalBuffer = null;
        }

        if (this._uvBuffer !== null) {
            this._uvBuffer.dispose();
            this._uvBuffer = null;
        }

        if (this._tangentBuffer !== null) {
            this._tangentBuffer.dispose();
            this._tangentBuffer = null;
        }

        if (this._biTangentBuffer !== null) {
            this._biTangentBuffer.dispose();
            this._biTangentBuffer = null;
        }

        if (this._colorBuffer !== null) {
            this._colorBuffer.dispose();
            this._colorBuffer = null;
        }
    }

    /**
     * Return the reference to the position buffer
     *
     * @return {ArrayBuffer}
     */
    public get positionBuffer(): ArrayBuffer {
        return this._positionsBuffer;
    }


    public get indexBuffer(): ElementArrayBuffer | null {
        return this._indexBuffer;
    }

    /**
     * Return the reference to the normals buffer if defined
     *
     * @return {ArrayBuffer | null}
     */
    public get normalBuffer(): ArrayBuffer | null {
        return this._normalBuffer;
    }

    /**
     * Return the reference to the texture coordinates buffer if defined
     *
     * @return {ArrayBuffer | null}
     */
    public get uvBuffer(): ArrayBuffer | null {
        return this._uvBuffer;
    }

    /**
     * Return the reference to the colors buffer if defined
     *
     * @return {ArrayBuffer | null}
     */
    public get colorBuffer(): ArrayBuffer | null {
        return this._colorBuffer;
    }

    /**
     * Return the reference to the tangents buffer if defined
     *
     * @return {ArrayBuffer | null}
     */
    public get tangentBuffer(): ArrayBuffer | null {
        return this._tangentBuffer;
    }

    /**
     * Return the reference to the bi-tangents buffer if defined
     *
     * @return {ArrayBuffer | null}
     */
    public get biTangentBuffer(): ArrayBuffer | null {
        return this._biTangentBuffer;
    }

    /**
     * Stars the drawing of the geometry
     *
     * @param {GLenum} drawMode
     * @param {Program} program
     */
    public draw(drawMode: GLenum, program: Program) {

        this._positionsBuffer.setAttributePointer(program.vertexPosition);

        if (this._normalBuffer != null && program.vertexNormal !== null) {
            this._normalBuffer.setAttributePointer(program.vertexNormal);
        }

        if (this._uvBuffer != null && program.vertexUV !== null) {
            this._uvBuffer.setAttributePointer(program.vertexUV);
        }
/*
        if (this._colorBuffer != null && program.vertexColor !== null) {
            this._colorBuffer.setAttributePointer(program.vertexColor);
        }

        if (this._tangentBuffer != null && program.vertexTangent !== null) {
            this._tangentBuffer.setAttributePointer(program.vertexTangent);
        }

        if (this._biTangentBuffer != null && program.vertexBiTangent !== null) {
            this._biTangentBuffer.setAttributePointer(program.vertexBiTangent);
        }*/

        if (this._indexBuffer) {
            this._indexBuffer.bind();
            this._gl.drawElements(drawMode, this._indexBuffer.numItems, this._gl.UNSIGNED_SHORT, 0);
        } else {
            this._positionsBuffer.bind();
            this._gl.drawArrays(drawMode, 0, this._positionsBuffer.numItems);
        }
    }
}