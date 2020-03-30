import Renderable from "../core/Renderable";
import LightGeometry from "../geometries/helpers/LightGeometry";
import Color from "../core/Color";
import LambertMaterial from "../materials/LambertMaterial";
/**
 * Class representing a generic light
 */
export default class Light extends Renderable {
    /**
     * Light constructor
     *
     * @param {string} name
     * @param {number} type
     */
    constructor(name, type) {
        super(name, type, new LightGeometry(), new LambertMaterial(new Color(0, 0, 0, 255)));
        /**
         * The diffuse color of the light
         *
         * @type {Color}
         * @protected
         */
        this._diffuseColor = new Color(255, 255, 255, 255);
        /**
         * The diffuse color intensity
         *
         * @type {number}
         * @protected
         */
        this._diffuseIntensity = 1;
        /**
         * The ambient color of the light
         *
         * @type {Color}
         * @protected
         */
        this._ambientColor = new Color(255, 255, 255, 255);
        /**
         * The ambient color intensity
         *
         * @type {number}
         * @protected
         */
        this._ambientIntensity = 1;
        /**
         * The specular color of the light
         *
         * @type {Color}
         * @protected
         */
        this._specularColor = new Color(255, 255, 255, 255);
        /**
         * The specular color intensity
         *
         * @type {number}
         * @protected
         */
        this._specularIntensity = 1;
        this._drawingMode = this._gl.LINES;
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
     * Sets the specular color
     *
     * @param {number} value
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
     * Sets the specular color intensity
     *
     * @param {number} value
     */
    set diffuseIntensity(value) {
        this._diffuseIntensity = value;
    }
    /**
     * Returns the light position or direction
     *
     * @return {Vector3}
     */
    get lightPosition() {
        return this._translation;
    }
    /**
     * Gets the ambient color
     *
     * @return {Color}
     */
    get ambientColor() {
        return this._ambientColor;
    }
    /**
     * Sets the ambient color
     *
     * @param {number} value
     */
    set ambientColor(value) {
        this._ambientColor = value;
    }
    /**
     * Gets the ambient color intensity
     *
     * @return {number}
     */
    get ambientIntensity() {
        return this._ambientIntensity;
    }
    /**
     * Gets the specular color intensity
     *
     * @return {number}
     */
    set ambientIntensity(value) {
        this._ambientIntensity = value;
    }
    /**
     * Gets the specular color
     *
     * @return {Color}
     */
    get specularColor() {
        return this._specularColor;
    }
    /**
     * Sets the specular color
     *
     * @param {number} value
     */
    set specularColor(value) {
        this._specularColor = value;
    }
    /**
     * Gets the specular color intensity
     *
     * @return {number}
     */
    get specularIntensity() {
        return this._specularIntensity;
    }
    /**
     * Sets the specular color intensity
     *
     * @param {number} value
     */
    set specularIntensity(value) {
        this._specularIntensity = value;
    }
}
