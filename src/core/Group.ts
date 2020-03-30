import Base from "./Base";
import Renderable from "./Renderable";
import LineGeometry from "../geometries/LineGeometry";
import LambertMaterial from "../materials/LambertMaterial";
import {GROUP} from "../Constants";
import LightsManager from "../lights/LightsManager";
import Camera from "../cameras/Camera";

/**
 * Class representing a group of objects. Can contain any instance of Renderable class.
 */
export default class Group extends Renderable { //TODO: implement

    /**
     * Util counter for group naming
     *
     * @type {number}
     * @private
     */
    private static _counter: number = 0;

    /**
     * Group constructor
     *
     * @param {string} name
     */
    public constructor(name?: string) {
        let obj = Base.getName("Group", Group._counter, name);
        super(obj.name, GROUP, new LineGeometry(0, 0, 0, 0, 0, 0), new LambertMaterial());
        Group._counter = obj.counter;
    }

    /**
     * Add a renderable to the group
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

        renderable.setParent(this);
    }

    /**
     * Remove a renderable from the group
     *
     * @param {string} uuid
     */
    public remove(uuid: string): Renderable | null {
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].uuid === uuid) {
                let child = this._children[i];
                this._children[i].unsetParent();
                return <Renderable>child;
            }
        }

        return null;
    }

    /**
     * Render all object of the group
     *
     * @param {Camera} camera
     * @param {LightsManager} lights
     */
    public render(camera: Camera, lights?: LightsManager): void {
        for (let child of this._children) {
            let renderable = <Renderable>child;
            renderable.render(camera, lights);
        }
    }
}