import Material from "./Material";
import Color from "../core/Color";
import {LAMBERT_MATERIAL} from "../Constants";

/**
 * Class representing a material. The difference between this material and phong material is the of the reflection model.
 * Every mesh having this material type wil be rendered using a lambert reflection model
 */
export default class LambertMaterial extends Material {

    /**
     * LambertMaterial constructor
     *
     * @param {Color} diffuseColor
     * @param {number}intensity
     */
    public constructor(diffuseColor: Color = new Color(255, 255, 255, 255), intensity: number = 1) {
        super(LAMBERT_MATERIAL);

        this._diffuseColor = diffuseColor;
        this._diffuseIntensity = intensity;
    }
}