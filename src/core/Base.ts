import _Math from "../math/_Math";
import Color from "./Color";

/**
 * Class from which every entity in the scene inheres
 */
export default class Base {

    protected _name: string;

    protected readonly _uuid: string;
    protected readonly _pickColor: Color;

    protected readonly _type: number;

    /**
     * Base constructor
     *
     * @param {string} name - name of the object
     * @param {number} type - type of the object
     */
    public constructor(name: string, type: number) {

        /**
         * The type of object of the current Base instance
         *
         * @type {number}
         * @protected
         */
        this._type = type;

        /**
         * The name of object of the current Base instance
         *
         * @type {string}
         * @protected
         */
        this._name = name;

        /**
         * Unique identifier generated at creation time
         *
         * @type {string}
         * @protected
         */
        this._uuid = _Math.UUIDv4();

        /**
         * Unique color used for object selection
         *
         * @type {Color}
         * @protected
         */
        this._pickColor = new Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 255);
    }

    /**
     * Get the UUID of this object
     *
     * @return {string} uuid - the identifier of this object instance
     */
    public get uuid(): string {
        return this._uuid;
    }

    /**
     * Return the name of this object
     *
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Sets the name of this object
     *
     * @param {string} name
     */
    public set name(name: string) {
        this._name = name;
    }

    /**
     * Get the type of this object
     *
     * @return {number} type - the type of this object instance
     */
    public get type(): number {
        return this._type;
    }

    /**
     * Get the pick color of this object
     *
     * @return {Color}
     */
    public get pickColor(): Color {
        return this._pickColor;
    }

    /**
     * Helper function tu get the nee of the object
     *
     * @param {string} baseName
     * @param {number} count
     * @param {string} name
     */
    public static getName(baseName: string, count: number, name?: string): {name:string, counter: number} {
        if (!name) {
            let name = baseName;
            let counter = count;

            if (counter > 0) {
                name += " " + counter.toString();
            }
            counter++;

            return {name: name, counter: counter};
        } else {
            return {name: name, counter: count};
        }
    }
}