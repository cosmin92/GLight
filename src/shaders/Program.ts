import {getWebGL} from "../core/GL";

export default class Program {

    private readonly _gl: WebGLRenderingContext;
    private readonly _shader: WebGLProgram;

    private _viewMatrixLoc: WebGLUniformLocation;
    private _projectionMatrixLoc: WebGLUniformLocation;
    private _modelMatrixLoc: WebGLUniformLocation;

    private readonly _vertexPosition: GLuint;

    private readonly _vertexNormal: GLuint | null;
    private readonly _vertexColor: GLuint | null;
    private readonly _vertexUV: GLuint | null;
    private readonly _vertexTangent: GLuint | null;
    private readonly _vertexBiTangent: GLuint | null;

    private readonly _normalMatrixLoc: WebGLUniformLocation | null;

    private readonly _materialAmbient: WebGLUniformLocation | null;
    private readonly _materialDiffuse: WebGLUniformLocation | null;
    private readonly _materialSpecular: WebGLUniformLocation | null;
    private readonly _materialShininess: WebGLUniformLocation | null;
    private readonly _textureLoc: WebGLUniformLocation | null;

    public constructor(vertexShaderSource: string, fragmentShaderSource: string) {
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

    public use() {
        this._gl.useProgram(this._shader);
    }

    public getUniformLocation(name: string): WebGLUniformLocation | null {
        return this._gl.getUniformLocation(this._shader, name);
    }

    public getAttributeLocation(name: string): GLuint {
        return this._gl.getAttribLocation(this._shader, name);
    }

    public get vertexPosition(): GLuint {
        return this._vertexPosition;
    }

    public get projectionMatrix(): WebGLUniformLocation {
        return this._projectionMatrixLoc;
    }

    public get viewMatrix(): WebGLUniformLocation {
        return this._viewMatrixLoc;
    }

    public get modelMatrix(): WebGLUniformLocation {
        return this._modelMatrixLoc;
    }

    public get vertexNormal(): GLuint | null {
        return this._vertexNormal;
    }

    public get vertexColor(): GLuint | null {
        return this._vertexColor;
    }

    public get vertexUV(): GLuint | null {
        return this._vertexUV;
    }

    public get vertexTangent(): GLuint | null {
        return this._vertexTangent;
    }

    public get vertexBiTangent(): GLuint | null {
        return this._vertexBiTangent;
    }

    public get normalMatrix(): WebGLUniformLocation | null {
        return this._normalMatrixLoc;
    }

    public get materialAmbient(): WebGLUniformLocation | null {
        return this._materialAmbient;
    }

    public get materialDiffuse(): WebGLUniformLocation | null {
        return this._materialDiffuse;
    }

    public get materialSpecular(): WebGLUniformLocation | null {
        return this._materialSpecular;
    }

    public get materialShininess(): WebGLUniformLocation | null {
        return this._materialShininess;
    }

    public get texture(): WebGLUniformLocation | null{
        return this._textureLoc;
    }
    private static _createShader(gl: WebGLRenderingContext, src: string, type: number) {
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

    private static _createProgram(gl: WebGLRenderingContext, vertexShaderSrc: string, fragmentShaderSrc: string, doValidate: boolean = false): WebGLProgram {
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