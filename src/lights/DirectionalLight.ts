import Light from "./Light";
import Color from "../core/Color";
import Base from "../core/Base";
import {DIRECTIONAL_LIGHT} from "../Constants";

/**
 * Class representing a directional light
 */
export default class DirectionalLight extends Light {

    /**
     * Util counter for directional lights naming
     *
     * @type {number}
     * @private
     */
    private static _counter: number = 0;

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
    public constructor(diffuseColor: Color = new Color(255,255,255,255),
                       diffuseIntensity: number = 1,
                       ambientColor: Color = new Color(255,255,255,255),
                       ambientIntensity: number = 1,
                       specularColor: Color = new Color(255,255,255,255),
                       specularIntensity: number = 1) {
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