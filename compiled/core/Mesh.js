import Base from "./Base";
import Renderable from "./Renderable";
import LambertMaterial from "../materials/LambertMaterial";
import { MESH } from "../Constants";
import Color from "./Color";
/**
 * Class representing a Mesh
 */
export default class Mesh extends Renderable {
    /**
     * Mesh constructor
     *
     * @param geometry
     * @param material
     */
    constructor(geometry, material = new LambertMaterial(new Color(123, 123, 123, 255))) {
        let obj = Base.getName("Mesh", Mesh._counter, name);
        Mesh._counter = obj.counter;
        super(obj.name, MESH, geometry, material);
    }
    /**
     * Sets the material of the mesh
     *
     * @param {Material} material
     */
    set material(material) {
        this._material = material;
        this.processShader();
    }
    /**
     * Sets the texture of the mesh
     *
     * @param {Material} texture
     */
    set texture(texture) {
        this._material.texture = texture;
        this.processShader();
    }
    /**
     * Gets the text of this mesh
     *
     * @return {TextureImage | null}
     */
    get textur() {
        return this._material.texture;
    }
}
/**
 * Util counter for mesh naming
 *
 * @type {number}
 * @private
 */
Mesh._counter = 0;
