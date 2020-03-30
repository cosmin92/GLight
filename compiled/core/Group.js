import Base from "./Base";
import Renderable from "./Renderable";
import LineGeometry from "../geometries/LineGeometry";
import LambertMaterial from "../materials/LambertMaterial";
import { GROUP } from "../Constants";
/**
 * Class representing a group of objects. Can contain any instance of Renderable class.
 */
export default class Group extends Renderable {
    /**
     * Group constructor
     *
     * @param {string} name
     */
    constructor(name) {
        let obj = Base.getName("Group", Group._counter, name);
        super(obj.name, GROUP, new LineGeometry(0, 0, 0, 0, 0, 0), new LambertMaterial());
        Group._counter = obj.counter;
    }
    /**
     * Add a renderable to the group
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
        renderable.setParent(this);
    }
    /**
     * Remove a renderable from the group
     *
     * @param {string} uuid
     */
    remove(uuid) {
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].uuid === uuid) {
                let child = this._children[i];
                this._children[i].unsetParent();
                return child;
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
    render(camera, lights) {
        for (let child of this._children) {
            let renderable = child;
            renderable.render(camera, lights);
        }
    }
}
/**
 * Util counter for group naming
 *
 * @type {number}
 * @private
 */
Group._counter = 0;
