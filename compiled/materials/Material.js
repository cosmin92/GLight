import Color from "../core/Color";
/**
 * Class representing a material
 */
export default class Material {
    /**
     * Material constructor
     * @param {number} type
     */
    constructor(type) {
        /**
         * The material type
         *
         * @type {number}
         * @private
         */
        this._type = type;
        /**
         * Reference to the renderable entity to which it was assigned
         *
         * @type {Renderable}
         * @protected
         */
        this._renderable = null;
        /**
         * the real color of the renderable object
         *
         * @type {Color}
         * @protected
         */
        this._diffuseColor = new Color(255, 255, 255, 255);
        /**
         * The number for which the color wil be multiplied
         *
         * @type {number}
         * @protected
         */
        this._diffuseIntensity = 1;
        /**
         * Mesh texture reference
         *
         * @type {TextureImage}
         * @protected
         */
        this._texture = null;
    }
    /**
     * Sets the renderable entity to which this material is assigned
     *
     * @param {Renderable} renderable
     */
    set renderable(renderable) {
        renderable.processShader();
        this._renderable = renderable;
    }
    /**
     * Gets the diffuse color
     *
     * @return {Color}
     */
    get diffuseColor() {
        return this._diffuseColor;
    }
    /**
     * Sets the diffuse color
     *
     * @param {Color} value
     */
    set diffuseColor(value) {
        this._diffuseColor = value;
    }
    /**
     * Gets the diffuse color intensity
     *
     * @return {number}
     */
    get diffuseIntensity() {
        return this._diffuseIntensity;
    }
    /**
     * Sets the diffuse color intensity
     *
     * @param {number} value
     */
    set diffuseIntensity(value) {
        this._diffuseIntensity = value;
    }
    /**
     * Gets the type of material
     *
     * @return {number}
     */
    get type() {
        return this._type;
    }
    /**
     * Set the texture to the mesh
     *
     * @param {TextureImage | null} texture
     */
    set texture(texture) {
        this._texture = texture;
    }
    /**
     * Get the texture assigned to the mesh
     *
     * @return {TextureImage | null}
     */
    get texture() {
        return this._texture;
    }
}
