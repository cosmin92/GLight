import LightsManager from "../lights/LightsManager";
import Light from "../lights/Light";
/**
 * Class representing a Scene
 */
export default class Scene {
    /**
     * Scene constructor
     */
    constructor() {
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
    add(renderable) {
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
    remove(uuid) {
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
    get children() {
        return this._children;
    }
    /**
     * Return the reference of the lights managers
     *
     * @return {LightsManager}
     */
    get lights() {
        return this._lights;
    }
    /**
     * Get the selected object
     *
     * @return {Renderable | null}
     */
    get selectedObject() {
        return this._selectedObject;
    }
    /**
     * Set th selected object to a new value
     *
     * @param {Renderable | null} value
     */
    set selectedObject(value) {
        this._selectedObject = value;
    }
}
