import Light from "./Light";
import Color from "../core/Color";
import Base from "../core/Base";
import { POINT_LIGHT } from "../Constants";
/**
 * Class representing a point light
 */
export default class PointLight extends Light {
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
        let obj = Base.getName("Point Light", PointLight._counter, name);
        PointLight._counter = obj.counter;
        super(obj.name, POINT_LIGHT);
        this._ambientIntensity = ambientIntensity;
        this._ambientColor = ambientColor;
        this._diffuseColor = diffuseColor;
        this._diffuseIntensity = diffuseIntensity;
        this._specularColor = specularColor;
        this._specularIntensity = specularIntensity;
    }
}
/**
 * Util counter for point lights naming
 *
 * @type {number}
 * @private
 */
PointLight._counter = 0;
