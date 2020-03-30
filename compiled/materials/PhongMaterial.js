import Material from "./Material";
import Color from "../core/Color";
import { PHONG_MATERIAL } from "../Constants";
/**
 * Class representing a material. The difference between this material and lambert material is the of the reflection model.
 * Every mesh having this material type wil be rendered using a Phong reflection model
 */
export default class PhongMaterial extends Material {
    /**
     * PhongMaterial constructor
     *
     * @param {number} shininess
     * @param {Color} ambientColor
     * @param {number} ambientIntensity
     * @param {Color} diffuseColor
     * @param {number} diffuseIntensity
     * @param {Color} specularColor
     * @param {number} specularIntensity
     */
    constructor(shininess = 10, ambientColor = new Color(255, 255, 255, 255), ambientIntensity = 1, diffuseColor = new Color(255, 255, 255, 255), diffuseIntensity = 1, specularColor = new Color(255, 255, 255, 255), specularIntensity = 1) {
        super(PHONG_MATERIAL);
        this._ambientColor = ambientColor;
        this._ambientIntensity = ambientIntensity;
        this._diffuseColor = diffuseColor;
        this._diffuseIntensity = diffuseIntensity;
        this._specularColor = specularColor;
        this._specularIntensity = specularIntensity;
        this._shininess = shininess;
    }
    /**
     * Get the specular color
     *
     * @return {Color}
     */
    get specularColor() {
        return this._specularColor;
    }
    /**
     * Sets the specular color
     *
     * @param {Color} value
     */
    set specularColor(value) {
        this._specularColor = value;
    }
    /**
     * Get the specular intensity
     *
     * @return {Color}
     */
    get specularIntensity() {
        return this._specularIntensity;
    }
    /**
     * Sets the specular intensity value
     *
     * @param {number} value
     */
    set specularIntensity(value) {
        this._specularIntensity = value;
    }
    /**
     * Get the ambient color
     *
     * @return {Color}
     */
    get ambientColor() {
        return this._ambientColor;
    }
    /**
     * Sets the ambient color
     *
     * @param {Color} value
     */
    set ambientColor(value) {
        this._ambientColor = value;
    }
    /**
     * Get the ambient intensity
     *
     * @return {Color}
     */
    get ambientIntensity() {
        return this._ambientIntensity;
    }
    /**
     * Sets the ambient intensity value
     *
     * @param {number} value
     */
    set ambientIntensity(value) {
        this._ambientIntensity = value;
    }
    /**
     * Get the shininess value
     *
     * @return {Color}
     */
    get shininess() {
        return this._shininess;
    }
    /**
     * Sets the shininess value
     *
     * @param {number} value
     */
    set shininess(value) {
        this._shininess = value;
    }
}
