import Renderable from "../core/Renderable";
import Color from "../core/Color";
import TextureImage from "./TextureImage";

/**
 * Class representing a material
 */
export default class Material {

    protected _renderable: Renderable | null;

    protected _diffuseColor: Color;
    protected _diffuseIntensity: number;

    private readonly _type: number;

    protected _texture: TextureImage | null;

    /**
     * Material constructor
     * @param {number} type
     */
    public constructor(type: number) {

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
    public set renderable(renderable: Renderable) {
        renderable.processShader();
        this._renderable = renderable;
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
     * Sets the diffuse color
     *
     * @param {Color} value
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
     * Sets the diffuse color intensity
     *
     * @param {number} value
     */
    public set diffuseIntensity(value: number) {
        this._diffuseIntensity = value;
    }

    /**
     * Gets the type of material
     *
     * @return {number}
     */
    public get type(): number {
        return this._type;
    }

    /**
     * Set the texture to the mesh
     *
     * @param {TextureImage | null} texture
     */
    public set texture(texture: TextureImage | null){
        this._texture = texture;
    }

    /**
     * Get the texture assigned to the mesh
     *
     * @return {TextureImage | null}
     */
    public get texture(): TextureImage | null{
        return this._texture;
    }
}