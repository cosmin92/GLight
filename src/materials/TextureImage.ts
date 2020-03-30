import {getWebGL} from "../core/GL";
import {TEXTURE} from "../Constants";

/**
 * Class representing a generic texture
 */
export default class TextureImage {

    protected _type: number;
    protected _gl: WebGLRenderingContext;
    private _mag_filter: GLenum;
    private _min_filter: GLenum;
    private _wrap_s_filter: GLenum;
    private _wrap_t_filter: GLenum;

    protected _texture: WebGLTexture | null;

    /**
     * TextureImage constructor
     *
     * @param {number} type
     */
    public constructor(type: number) {
        this._type = type;
        this._gl = getWebGL();

        this._mag_filter = this._gl.LINEAR;
        this._min_filter = this._gl.LINEAR;

        this._wrap_s_filter = this._gl.CLAMP_TO_EDGE;
        this._wrap_t_filter = this._gl.CLAMP_TO_EDGE;

        this._texture = null;
    }

    /**
     * Update the texture filters
     *
     * @private
     */
    protected _updateFilters() {
        if (this._type === TEXTURE) {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._wrap_s_filter);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._wrap_t_filter);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._min_filter);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._mag_filter);
            this._gl.bindTexture(this._gl.TEXTURE_2D, null);
        } else {
            // TODO:
        }

    }

    /**
     * Gets the texture type
     *
     * @return {number}
     */
    public get type(){
        return this._type;
    }

    public get mag_filter(): number {
        return this._mag_filter;
    }

    public set mag_filter(value: number) {
        this._mag_filter = value;
        this._updateFilters();
    }

    public get min_filter(): number {
        return this._min_filter;
    }

    public set min_filter(value: number) {
        this._min_filter = value;
        this._updateFilters();
    }

    public get wrap_s_filter(): number {
        return this._wrap_s_filter;
    }

    public set wrap_s_filter(value: number) {
        this._wrap_s_filter = value;
        this._updateFilters();
    }

    public get wrap_t_filter(): number {
        return this._wrap_t_filter;
    }

    public set wrap_t_filter(value: number) {
        this._wrap_t_filter = value;
        this._updateFilters();
    }

    public use(location: WebGLUniformLocation){

    }
}