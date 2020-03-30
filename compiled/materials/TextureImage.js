import { getWebGL } from "../core/GL";
import { TEXTURE } from "../Constants";
/**
 * Class representing a generic texture
 */
export default class TextureImage {
    /**
     * TextureImage constructor
     *
     * @param {number} type
     */
    constructor(type) {
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
    _updateFilters() {
        if (this._type === TEXTURE) {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._wrap_s_filter);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._wrap_t_filter);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._min_filter);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._mag_filter);
            this._gl.bindTexture(this._gl.TEXTURE_2D, null);
        }
        else {
            // TODO:
        }
    }
    /**
     * Gets the texture type
     *
     * @return {number}
     */
    get type() {
        return this._type;
    }
    get mag_filter() {
        return this._mag_filter;
    }
    set mag_filter(value) {
        this._mag_filter = value;
        this._updateFilters();
    }
    get min_filter() {
        return this._min_filter;
    }
    set min_filter(value) {
        this._min_filter = value;
        this._updateFilters();
    }
    get wrap_s_filter() {
        return this._wrap_s_filter;
    }
    set wrap_s_filter(value) {
        this._wrap_s_filter = value;
        this._updateFilters();
    }
    get wrap_t_filter() {
        return this._wrap_t_filter;
    }
    set wrap_t_filter(value) {
        this._wrap_t_filter = value;
        this._updateFilters();
    }
    use(location) {
    }
}
