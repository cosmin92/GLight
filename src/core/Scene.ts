import Renderable from "./Renderable";
import LightsManager from "../lights/LightsManager";
import Light from "../lights/Light";

/**
 * Class representing a Scene
 */
export default class Scene {

    private readonly _children: Renderable[];
    private readonly _lights: LightsManager;

    private _selectedObject: Renderable | null;

    /**
     * Scene constructor
     */
    public constructor() {
        /**
         * The set of object in the scene
         *
         * @type {Renderable[]}
         * @private
         */
        this._children = [];

        /**
         * Reference to the lights manager util class
         *
         * @type {LightsManager}
         * @private
         */
        this._lights = new LightsManager();

        /**
         * Reference to the selected object
         *
         * @type {Renderable}
         * @private
         */
        this._selectedObject = null;
    }

    /**
     * Add an object to the scene
     *
     * @param {Renderable} renderable
     */
    public add(renderable: Renderable): void {

        for (let child of this._children) {
            if (child.uuid === renderable.uuid) {
                console.warn("Renderable was already added to the Scene");
                return;
            }
        }

        this._children.push(renderable);
        if (renderable instanceof Light) {
            this._lights.add(renderable);
            for (let child of this.children) {
                child.processShader(this._lights);
            }
        }
    }

    /**
     * Remove an object form the scene
     *
     * @param {string} uuid
     * @return {Renderable | null}
     */
    public remove(uuid: string): Renderable | null {
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].uuid === uuid) {
                let child = this._children[i];
                this._children.splice(i, 1);

                if (child instanceof Light) {
                    this._lights.remove(child.uuid);
                    for (let child of this.children) {
                        child.processShader(this._lights);
                    }
                }
                return child;
            }
        }

        return null;
    }

    /**
     * Get the list of children
     *
     * @return {Renderable[]}
     */
    public get children(): Renderable[] {
        return this._children;
    }

    /**
     * Return the reference of the lights managers
     *
     * @return {LightsManager}
     */
    public get lights(): LightsManager {
        return this._lights;
    }

    /**
     * Get the selected object
     *
     * @return {Renderable | null}
     */
    public get selectedObject(): Renderable | null {
        return this._selectedObject;
    }

    /**
     * Set th selected object to a new value
     *
     * @param {Renderable | null} value
     */
    public set selectedObject(value: Renderable | null) {
        this._selectedObject = value;
    }
}