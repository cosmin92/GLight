import Material from "./Material";
import Color from "../core/Color";
import {PHONG_MATERIAL} from "../Constants";

/**
 * Class representing a material. The difference between this material and lambert material is the of the reflection model.
 * Every mesh having this material type wil be rendered using a Phong reflection model
 */
export default class PhongMaterial extends Material {

    private _specularColor: Color;
    private _specularIntensity: number;

    private _ambientColor: Color;
    private _ambientIntensity: number;

    private _shininess: number;

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
    public constructor(shininess: number = 10,
                       ambientColor: Color = new Color(255, 255, 255, 255),
                       ambientIntensity: number = 1,
                       diffuseColor: Color = new Color(255, 255, 255, 255),
                       diffuseIntensity: number = 1,
                       specularColor: Color = new Color(255, 255, 255, 255),
                       specularIntensity: number = 1) {
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
    public get specularColor(): Color {
        return this._specularColor;
    }

    /**
     * Sets the specular color
     *
     * @param {Color} value
     */
    public set specularColor(value: Color) {
        this._specularColor = value;
    }

    /**
     * Get the specular intensity
     *
     * @return {Color}
     */
    public get specularIntensity(): number {
        return this._specularIntensity;
    }

    /**
     * Sets the specular intensity value
     *
     * @param {number} value
     */
    public set specularIntensity(value: number) {
        this._specularIntensity = value;
    }

    /**
     * Get the ambient color
     *
     * @return {Color}
     */
    public get ambientColor(): Color {
        return this._ambientColor;
    }

    /**
     * Sets the ambient color
     *
     * @param {Color} value
     */
    public set ambientColor(value: Color) {
        this._ambientColor = value;
    }

    /**
     * Get the ambient intensity
     *
     * @return {Color}
     */
    public get ambientIntensity(): number {
        return this._ambientIntensity;
    }

    /**
     * Sets the ambient intensity value
     *
     * @param {number} value
     */
    public set ambientIntensity(value: number) {
        this._ambientIntensity = value;
    }

    /**
     * Get the shininess value
     *
     * @return {Color}
     */
    public get shininess(): number {
        return this._shininess;
    }

    /**
     * Sets the shininess value
     *
     * @param {number} value
     */
    public set shininess(value: number) {
        this._shininess = value;
    }
}