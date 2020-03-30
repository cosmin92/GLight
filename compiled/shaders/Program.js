import { getWebGL } from "../core/GL";
export default class Program {
    constructor(vertexShaderSource, fragmentShaderSource) {
        this._gl = getWebGL();
        this._shader = Program._createProgram(this._gl, vertexShaderSource, fragmentShaderSource);
        // @ts-ignore
        this._projectionMatrixLoc = this._gl.getUniformLocation(this._shader, "projectionMatrix");
        // @ts-ignore
        this._viewMatrixLoc = this._gl.getUniformLocation(this._shader, "viewMatrix");
        // @ts-ignore
        this._modelMatrixLoc = this._gl.getUniformLocation(this._shader, "modelMatrix");
        // @ts-ignore
        this._vertexPosition = this._gl.getAttribLocation(this._shader, "vertexPosition");
        this._vertexNormal = this._gl.getAttribLocation(this._shader, "vertexNormal");
        this._vertexUV = this._gl.getAttribLocation(this._shader, "vertexUV");
        this._vertexColor = this._gl.getAttribLocation(this._shader, "vertexColor");
        this._vertexTangent = this._gl.getAttribLocation(this._shader, "vertexTangent");
        this._vertexBiTangent = this._gl.getAttribLocation(this._shader, "vertexBiTangent");
        this._normalMatrixLoc = this._gl.getUniformLocation(this._shader, "normalMatrix");
        this._materialAmbient = this._gl.getUniformLocation(this._shader, "materialAmbient");
        this._materialDiffuse = this._gl.getUniformLocation(this._shader, "materialDiffuse");
        this._materialSpecular = this._gl.getUniformLocation(this._shader, "materialSpecular");
        this._materialShininess = this._gl.getUniformLocation(this._shader, "materialShininess");
        this._textureLoc = this._gl.getUniformLocation(this._shader, "texture");
    }
    use() {
        this._gl.useProgram(this._shader);
    }
    getUniformLocation(name) {
        return this._gl.getUniformLocation(this._shader, name);
    }
    getAttributeLocation(name) {
        return this._gl.getAttribLocation(this._shader, name);
    }
    get vertexPosition() {
        return this._vertexPosition;
    }
    get projectionMatrix() {
        return this._projectionMatrixLoc;
    }
    get viewMatrix() {
        return this._viewMatrixLoc;
    }
    get modelMatrix() {
        return this._modelMatrixLoc;
    }
    get vertexNormal() {
        return this._vertexNormal;
    }
    get vertexColor() {
        return this._vertexColor;
    }
    get vertexUV() {
        return this._vertexUV;
    }
    get vertexTangent() {
        return this._vertexTangent;
    }
    get vertexBiTangent() {
        return this._vertexBiTangent;
    }
    get normalMatrix() {
        return this._normalMatrixLoc;
    }
    get materialAmbient() {
        return this._materialAmbient;
    }
    get materialDiffuse() {
        return this._materialDiffuse;
    }
    get materialSpecular() {
        return this._materialSpecular;
    }
    get materialShininess() {
        return this._materialShininess;
    }
    get texture() {
        return this._textureLoc;
    }
    static _createShader(gl, src, type) {
        let shader = gl.createShader(type);
        if (shader == null) {
            throw new Error("Cannot create Shader");
        }
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error("Error compiling shader : " + src + " \nERROR: " + gl.getShaderInfoLog(shader));
        }
        return shader;
    }
    static _createProgram(gl, vertexShaderSrc, fragmentShaderSrc, doValidate = false) {
        let vShader = Program._createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
        let fShader = Program._createShader(gl, fragmentShaderSrc, gl.FRAGMENT_SHADER);
        let program = gl.createProgram();
        if (program == null) {
            throw new Error("Cannot create Program");
        }
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error("Error creating shader program: " + gl.getProgramInfoLog(program));
        }
        if (doValidate) {
            gl.validateProgram(program);
            if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                throw new Error("Error validating program: " + gl.getProgramInfoLog(program));
            }
        }
        gl.detachShader(program, vShader);
        gl.detachShader(program, fShader);
        gl.deleteShader(fShader);
        gl.deleteShader(vShader);
        return program;
    }
}
