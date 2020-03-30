import Base from "./Base";
/**
 * Class representing a generic node in the hierarchical model
 */
export default class Node extends Base {
    /**
     * Node constructor
     *
     * @param {string} name - name of the object
     * @param {number} type - type of the object
     */
    constructor(name, type) {
        super(name, type);
        /**
         * The set of children nodes
         *
         * @type {Node[]}
         * @protected
         */
        this._children = [];
        /**
         * The parent node
         *
         * @type {Node | null}
         * @protected
         */
        this._parent = null;
        /**
         * Indicates tha this node is a root node
         *
         * @type {boolean}
         * @protected
         */
        this._isRoot = true;
        /**
         * Indicates tha this node is hidden
         *
         * @type {boolean}
         * @protected
         */
        this._hidden = false;
        /**
         * Indicates tha this node is selected
         *
         * @type {boolean}
         * @protected
         */
        this._selected = false;
    }
    /**
     * Set the parent node to null. This node became a root node
     *
     * @return {Node | null}
     */
    unsetParent() {
        if (this._parent === null)
            return null;
        let parent = this._parent;
        // remove this child from the list of the parent children
        const childIndex = parent.children.indexOf(this);
        if (childIndex !== -1) {
            parent.children.splice(childIndex, 1);
        }
        // remove the parent
        this._parent = null;
        // make it root
        this._isRoot = true;
        return parent;
    }
    /**
     * Set the parent node of this node. Returns the old parent if was set or null
     *
     * @param {Node} parent
     * @return {Node | null}
     */
    setParent(parent) {
        if (parent.uuid === this.uuid) {
            console.warn("Trying to set a loop parent-child relation");
            return null;
        }
        let oldParent = this.unsetParent();
        parent.children.push(this);
        this._parent = parent;
        this._isRoot = false;
        return oldParent;
    }
    /**
     * Select this node
     */
    select() {
        this._selected = true;
    }
    /**
     * Unselect this node
     */
    unselect() {
        this._selected = false;
        return this;
    }
    /**
     * Make this node visible in the scene
     */
    show() {
        this._hidden = false;
    }
    /**
     * Hide this node in the scene
     */
    hide() {
        this._hidden = true;
    }
    /**
     * Switch from hide to she and vice-versa
     */
    hide_show() {
        this._hidden = !this._hidden;
    }
    /**
     * Return true if this node is a root node
     *
     * @return {boolean}
     */
    get isRoot() {
        return this._isRoot;
    }
    /**
     * Return true if this node is selected
     *
     * @return {boolean}
     */
    get isSelected() {
        return this._selected;
    }
    /**
     * Return true if this node is visible
     *
     * @return {boolean}
     */
    get isVisible() {
        return !this._hidden;
    }
    /**
     * Returns the parent node
     *
     * @return {Node | null}
     */
    get parent() {
        return this._parent;
    }
    /**
     * Returns the list of children nodes
     *
     * @return {Node[]}
     */
    get children() {
        return this._children;
    }
}
