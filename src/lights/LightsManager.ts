import PointLight from "./PointLight";
import Light from "./Light";
import DirectionalLight from "./DirectionalLight";
import {DIRECTIONAL_LIGHT, POINT_LIGHT} from "../Constants";

/**
 * Helper class util to manage the set og lights in the scene
 */
export default class LightsManager {

    private readonly _pointLights: PointLight[];
    private readonly _directionalLights: DirectionalLight[];

    /**
     * Light constructor
     */
    public constructor() {

        /**
         * Reference to the set of directional lights
         *
         * @type {DirectionalLight[]}
         * @private
         */
        this._pointLights = [];

        /**
         * Reference to the set of point lights
         *
         * @type {DirectionalLight[]}
         * @private
         */
        this._directionalLights = [];
    }

    /**
     * Add a light to the set of lights
     *
     * @param light
     */
    public add(light: Light) {
        for (let l of this._pointLights) {
            if (light.uuid === l.uuid) return;
        }

        for (let l of this._directionalLights) {
            if (light.uuid === l.uuid) return;
        }


        if (light instanceof DirectionalLight && light.type === DIRECTIONAL_LIGHT) {
            this._directionalLights.push(<DirectionalLight>light);
        }

        if (light instanceof PointLight && light.type === POINT_LIGHT) {
            this._pointLights.push(<PointLight>light);
        }
    }

    /**
     * Remove a light from the set o lights
     *
     * @param {string} uuid
     * @return {Light | null}
     */
    public remove(uuid: string): Light | null {
        for (let i = 0; i < this._directionalLights.length; i++) {
            if (this._directionalLights[i].uuid === uuid) {
                let light = this._directionalLights[i];
                this._directionalLights.splice(i, 1);
                return light;
            }
        }

        for (let i = 0; i < this._pointLights.length; i++) {
            if (this._pointLights[i].uuid === uuid) {
                let light = this._pointLights[i];
                this._pointLights.splice(i, 1);
                return light;
            }
        }

        return null;
    }

    /**
     * Get a light if exists
     *
     * @param {string} uuid
     * @return {Light | null}
     */
    public get(uuid: string) {
        for (let i = 0; i < this._directionalLights.length; i++) {
            if (this._directionalLights[i].uuid === uuid) {
                return this._directionalLights[i];
            }
        }

        for (let i = 0; i < this._pointLights.length; i++) {
            if (this._pointLights[i].uuid === uuid) {
                return this._pointLights[i];
            }
        }

        return null;
    }

    /**
     * Helper function indicating that there is at least one directional light defined
     *
     * @return {boolean}
     */
    public get isDirectionaLights(): boolean {
        return this._directionalLights.length > 0;
    }

    /**
     * Helper function indicating that there is at least one point light defined
     *
     * @return {boolean}
     */
    public get isPointLights(): boolean {
        return this._pointLights.length > 0;
    }


    /**
     * Return the set of directional lights
     *
     * @return {DirectionalLight[]}
     */
    public get pointLights(): PointLight[] {
        return this._pointLights;
    }

    /**
     * Return the set of point lights
     *
     * @return {PointLight[]}
     */
    public get directionalLights(): DirectionalLight[] {
        return this._directionalLights;
    }
}