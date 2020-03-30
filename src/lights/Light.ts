import Renderable from "../core/Renderable";
import LightGeometry from "../geometries/helpers/LightGeometry";
import Color from "../core/Color";
import LambertMaterial from "../materials/LambertMaterial";
import Vector3 from "../math/Vector3";

/**
 * Class representing a generic light
 */
export default class Light extends Renderable {

    protected _diffuseColor: Color;
    protected _diffuseIntensity: number;

    protected _ambientColor: Color;
    protected _ambientIntensity: number;

    protected _specularColor: Color;
    protected _specularIntensity: number;

    /**
     * Light constructor
     *
     * @param {string} name
     * @param {number} type
     */
    public constructor(name: string, type: number) {
        super(name, type, new LightGeometry(), new LambertMaterial(new Color(0,0,0,255)));

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
    public get diffuseColor(): Color {
        return this._diffuseColor;
    }

    /**
     * Sets the specular color
     *
     * @param {number} value
     */
    public set diffuseColor(value: Color) {
        this._diffuseColor = value;
    }

    /**
     * Gets the diffuse color intensity
     *
     * @return {number}
     */
    public get diffuseIntensity(): number {
        return this._diffuseIntensity;
    }

    /**
     * Sets the specular color intensity
     *
     * @param {number} value
     */
    public set diffuseIntensity(value: number) {
        this._diffuseIntensity = value;
    }

    /**
     * Returns the light position or direction
     *
     * @return {Vector3}
     */
    public get lightPosition(): Vector3 {
        return this._translation;
    }

    /**
     * Gets the ambient color
     *
     * @return {Color}
     */
    public get ambientColor(): Color {
        return this._ambientColor;
    }

    /**
     * Sets the ambient color
     *
     * @param {number} value
     */
    public set ambientColor(value: Color) {
        this._ambientColor = value;
    }

    /**
     * Gets the ambient color intensity
     *
     * @return {number}
     */
    public get ambientIntensity(): number {
        return this._ambientIntensity;
    }

    /**
     * Gets the specular color intensity
     *
     * @return {number}
     */
    public set ambientIntensity(value: number) {
        this._ambientIntensity = value;
    }

    /**
     * Gets the specular color
     *
     * @return {Color}
     */
    public get specularColor(): Color {
        return this._specularColor;
    }

    /**
     * Sets the specular color
     *
     * @param {number} value
     */
    public set specularColor(value: Color) {
        this._specularColor = value;
    }

    /**
     * Gets the specular color intensity
     *
     * @return {number}
     */
    public get specularIntensity(): number {
        return this._specularIntensity;
    }

    /**
     * Sets the specular color intensity
     *
     * @param {number} value
     */
    public set specularIntensity(value: number) {
        this._specularIntensity = value;
    }
}