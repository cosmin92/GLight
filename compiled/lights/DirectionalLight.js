import Light from "./Light";
import Color from "../core/Color";
import Base from "../core/Base";
import { DIRECTIONAL_LIGHT } from "../Constants";
/**
 * Class representing a directional light
 */
export default class DirectionalLight extends Light {
    /**
     * PointLight constructor
     *
     * @param {Color} diffuseColor
     * @param {number} diffuseIntensity
     * @param {Color} ambientColor
     * @param {number} ambientIntensity
     * @param {Color} specularColor
     * @param {number} specularIntensity
     */
    constructor(diffuseColor = new Color(255, 255, 255, 255), diffuseIntensity = 1, ambientColor = new Color(255, 255, 255, 255), ambientIntensity = 1, specularColor = new Color(255, 255, 255, 255), specularIntensity = 1) {
        let obj = Base.getName("Directional Light", DirectionalLight._counter, name);
        DirectionalLight._counter = obj.counter;
        super(obj.name, DIRECTIONAL_LIGHT);
        this._ambientIntensity = ambientIntensity;
        this._ambientColor = ambientColor;
        this._diffuseColor = diffuseColor;
        this._diffuseIntensity = diffuseIntensity;
        this._specularColor = specularColor;
        this._specularIntensity = specularIntensity;
    }
}
/**
 * Util counter for directional lights naming
 *
 * @type {number}
 * @private
 */
DirectionalLight._counter = 0;
