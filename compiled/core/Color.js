/**
 * Class encapsulating all color operations
 */
export default class Color {
    /**
     * Color constructor
     *
     * @param {number} red - the red component [0..255]. Default value equal to 0
     * @param {number} green - the green component [0..255]. Default value equal to 0
     * @param {number} blue - the blue component [0..255]. Default value equal to 0
     * @param {number} alpha - the alpha component [0..255]. Default value equal to 255
     */
    constructor(red = 0, green = 0, blue = 0, alpha = 255) {
        /**
         * Return the color as an array of numbers
         *
         * @return {number[]}
         */
        this.getArray = () => [this._red, this._green, this._blue, this._alpha];
        /**
         * Return the color as a Float32Array
         *
         * @return {Float32Array}
         */
        this.getFloat32Array = () => new Float32Array([this._red, this._green, this._blue, this._alpha]);
        /**
         * Returns the hexadecimal representation of this color
         *
         * @return {string}
         */
        this.getHexadecimal = () => Color.rgbToHex(this._red, this._green, this._blue);
        /**
         * Returns true if each component of this color is equal to each component of the passed color
         *
         * @param {Color} color - color to be compared
         *
         * @return {boolean}
         */
        this.equalTo = (color) => (this._red === color.red && this._green === color.green && this._blue === color.blue && this._alpha === color.alpha);
        /**
         * Returns a new Color, clone of this color
         *
         * @return {Color}
         */
        this.clone = () => new Color(this._red, this._green, this._blue, this._alpha);
        /**
         * The red component of the color
         *
         * @type {number}
         */
        this._red = red;
        /**
         * The green component of the color
         *
         * @type {number}
         */
        this._green = green;
        /**
         * The blue component of the color
         *
         * @type {number}
         */
        this._blue = blue;
        /**
         * The alpha component of the color
         *
         * @type {number}
         */
        this._alpha = alpha;
    }
    /**
     * Set the color components to new values
     *
     * @param {number} red - the red component. default value equal to 0
     * @param {number} green - the green component. default value equal to 0
     * @param {number} blue - the blue component. default value equal to 0
     * @param {number} alpha - the alpha component. default value equal to 255
     *
     * @return {Color}
     */
    set(red = 0, green = 0, blue = 0, alpha = 255) {
        this._red = red;
        this._green = green;
        this._blue = blue;
        this._alpha = alpha;
        return this;
    }
    /**
     * Returns the red component
     *
     * @return {number}
     */
    get red() {
        return this._red;
    }
    /**
     * Sets the red component
     *
     * @param {number} value - the new value
     */
    set red(value) {
        this._red = value;
    }
    /**
     * Returns the green component
     *
     * @return {number}
     */
    get green() {
        return this._green;
    }
    /**
     * Sets the green component
     *
     * @param {number} value - the new value
     */
    set green(value) {
        this._green = value;
    }
    /**
     * Returns the blue component
     *
     * @return {number}
     */
    get blue() {
        return this._blue;
    }
    /**
     * Sets the blue component
     *
     * @param {number} value - the new value
     */
    set blue(value) {
        this._blue = value;
    }
    /**
     * Returns the alpha component
     *
     * @return {number}
     */
    get alpha() {
        return this._alpha;
    }
    /**
     * Sets the alpha component
     *
     * @param {number} value - the new value
     */
    set alpha(value) {
        this._alpha = value;
    }
    /**
     * Normalize the color ([0..255], [0..255], [0..255], [0..255]) --> ([0..1], [0..1], [0..1], [0..1])
     *
     * @return {Color}
     */
    normalize() {
        this._red = this._red < 1 ? this._red : Math.abs(this._red / 255);
        this._green = this._green < 1 ? this._green : Math.abs(this._green / 255);
        this._blue = this._blue < 1 ? this._blue : Math.abs(this._blue / 255);
        this._alpha = this._alpha < 1 ? this._alpha : Math.abs(this._alpha / 255);
        return this;
    }
    /**
     * Return a new normalized color ([0..255], [0..255], [0..255], [0..255]) --> ([0..1], [0..1], [0..1], [0..1])
     *
     * @return {Color}
     */
    normalized() {
        return this.clone().normalize();
    }
    /**
     * Multiply each component of this color by the scalar value
     *
     * @param {number} scalar
     */
    multiplyScalar(scalar) {
        this._red *= scalar;
        this._green *= scalar;
        this._blue *= scalar;
        return this;
    }
    //==================================================================================================================
    // STATIC METHODS
    //==================================================================================================================
    /**
     * Create a color from an integer. All values grater than 255^4 will be white
     *
     * @param {number} integer
     * @return {Color}
     */
    static fromInteger(integer) {
        let powThree = 255 * 255 * 255;
        let powTwo = 255 * 255;
        if (integer >= powThree * 255) {
            return new Color(255, 255, 255, 255);
        }
        else if (integer >= powThree) {
            return new Color(integer - powThree, 255, 255, 255);
        }
        else if (integer >= powTwo) {
            return new Color(0, integer - powTwo, 255, 255);
        }
        else if (integer >= 255) {
            return new Color(0, 0, integer - 255, 255);
        }
        else {
            return new Color(0, 0, 0, integer);
        }
    }
    /**
     * Create a new color with passed values
     *
     * @param {number[] | Uint16Array | Float32Array} array
     * @return {Color}
     */
    static fromArray(array) {
        return new Color(array[0], array[1], array[2], array[3]);
    }
    /**
     * Convert hexadecimal representation to RGB representation
     *
     * @param {string | number} hex
     * @return {Color}
     */
    static convert(hex) {
        let rgb;
        if (typeof hex === 'number') {
            rgb = Color.hexIntToRGB(hex);
        }
        else {
            rgb = Color.hexStringToRGB(hex);
        }
        return rgb;
    }
    /**
     * Convert a color component to HEX
     *
     * @param {number} c
     */
    static componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }
    /**
     * Convert RGB to hexadecimal representation
     *
     * @param {number} red - value of the red component
     * @param {number} green - value of the green component
     * @param {number} blue - value of the blue component
     */
    static rgbToHex(red, green, blue) {
        const hexR = Color.componentToHex(red);
        const hexG = Color.componentToHex(green);
        const hexB = Color.componentToHex(blue);
        return `#${hexR}${hexG}${hexB}`;
    }
    /**
     * Convert hexadecimal representation to RGB representation
     *
     * @param {number} hex
     * @return {Color}
     */
    static hexIntToRGB(hex) {
        const r = hex >> 16;
        const g = (hex >> 8) & 0xff;
        const b = hex & 0xff;
        return new Color(r, g, b);
    }
    /**
     * Convert hexadecimal representation to RGB representation
     *
     * @param {string} hex
     * @return {Color}
     */
    static hexStringToRGB(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;
    }
}
