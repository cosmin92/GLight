import Base from "./Base";
import Renderable from "./Renderable";
import Geometry from "../geometries/Geometry";
import Material from "../materials/Material";
import LambertMaterial from "../materials/LambertMaterial";
import {MESH} from "../Constants";
import Color from "./Color";
import TextureImage from "../materials/TextureImage";

/**
 * Class representing a Mesh
 */
export default class Mesh extends Renderable {

    /**
     * Util counter for mesh naming
     *
     * @type {number}
     * @private
     */
    private static _counter: number = 0;

    /**
     * Mesh constructor
     *
     * @param geometry
     * @param material
     */
    public constructor(geometry: Geometry, material: Material = new LambertMaterial(new Color(123,123,123,255))) {
        let obj = Base.getName("Mesh", Mesh._counter, name);
        Mesh._counter = obj.counter;
        super(obj.name, MESH, geometry, material);
    }

    /**
     * Sets the material of the mesh
     *
     * @param {Material} material
     */
    public set material(material: Material){
        this._material = material;
        this.processShader();
    }

    /**
     * Sets the texture of the mesh
     *
     * @param {Material} texture
     */
    public set texture(texture: TextureImage){
        this._material.texture = texture;
        this.processShader();
    }

    /**
     * Gets the text of this mesh
     *
     * @return {TextureImage | null}
     */
    public get textur(){
        return this._material.texture;
    }
}