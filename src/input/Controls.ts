import Picker from "./Picker";
import {getWebGL} from "../core/GL";
import Renderer from "../renderers/Renderer";
import Mesh from "../core/Mesh";

export default class Controls {

    private _gl: WebGLRenderingContext;
    private _renderer: Renderer;
    private _picker: Picker;
    private _canvas: HTMLCanvasElement;

    private _mouseDown: boolean;

    private readonly _offsetX: number;
    private readonly _offsetY: number;

    private readonly _zoomRate: number;
    private readonly _rotateRate: number;
    private readonly _panRate: number;

    private _initX: number;
    private _initY: number;
    private _prevX: number;
    private _prevY: number;

    private _tKey: boolean;
    private _rKey: boolean;
    private _sKey: boolean;
    private _pKey: boolean;

    private _xKey: boolean;
    private _yKey: boolean;
    private _zKey: boolean;


    /**
     * Controls constructor
     *
     * @param {Renderer} renderer
     */
    public constructor(renderer: Renderer) {
        this._renderer = renderer;
        this._gl = getWebGL();
        this._canvas = this._gl.canvas;
        this._picker = new Picker(renderer);

        this._mouseDown = false;

        let box = this._gl.canvas.getBoundingClientRect();
        this._offsetX = box.left;
        this._offsetY = box.top;

        this._zoomRate = 200;
        this._rotateRate = -300;
        this._panRate = 5;

        this._initX = 0;
        this._initY = 0;
        this._prevX = 0;
        this._prevY = 0;

        this._tKey = false;
        this._rKey = false;
        this._sKey = false;
        this._pKey = false;

        this._xKey = false;
        this._yKey = false;
        this._zKey = false;

        this._canvas.addEventListener("mousedown", this._onMouseDownHandler);
        this._canvas.addEventListener("mouseup", this._onMouseUpHandler);
        this._canvas.addEventListener("mousemove", this._onMouseMoveHandler);
        this._canvas.addEventListener("wheel", this._onWheelHandler);


        window.addEventListener("keydown", this._onKeyDownHandler);
        window.addEventListener("keyup", this._onKeyUpHandler);
        window.addEventListener("keypress", this._onKeyPressHandler);
    }

    private _onMouseUpHandler = () => {
        this._mouseDown = false;
    };

    // @ts-ignore
    private _onMouseDownHandler = (event) => {

        this._initX = this._prevX = event.pageX - this._offsetX;
        this._initY = this._prevY = event.pageY - this._offsetY;

        this._mouseDown = true;

        if (event.altKey) {
            let box = this._gl.canvas.getBoundingClientRect();
            this._picker.update(box.width, box.height);

            let x = event.clientX;
            let y = box.bottom - event.clientY;

            this._picker.find(x, y);
        }
    };

    private _onMouseMoveHandler = (event: { pageX: number; pageY: number; shiftKey: any; }) => {
        if (!this._mouseDown) return;

        let x = event.pageX - this._offsetX;
        let y = event.pageY - this._offsetY;
        let dx = x - this._prevX;
        let dy = y - this._prevY;


        if (!event.shiftKey) {
            this._renderer.viewer.rotate.y += (dx * (this._rotateRate / this._canvas.width));
            this._renderer.viewer.rotate.x += (dy * (this._rotateRate / this._canvas.height));
        } else {
            this._renderer.viewer.panX(-dx * (this._panRate / this._canvas.width));
            this._renderer.viewer.panY(dy * (this._panRate / this._canvas.height));
        }

        this._prevX = x;
        this._prevY = y;
    };

    private _onWheelHandler = (event: { deltaY: number; }) => {
        // @ts-ignore
        let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))); //Try to map wheel movement to a number between -1 and 1
        this._renderer.viewer.panZ(delta * (this._zoomRate / this._canvas.height));
    };


    private _onKeyDownHandler = (event: any) => {
        switch (event.code) {
            case "KeyT":
                this._tKey = true;
                break;
            case "KeyR":
                this._rKey = true;
                break;
            case "KeyS":
                this._sKey = true;
                break;
            case "KeyP":
                this._pKey = true;
                break;
            case "KeyX":
                this._xKey = true;
                break;
            case "KeyY":
                this._yKey = true;
                break;
            case "KeyZ":
                this._zKey = true;
                break;
            case "ArrowUp":
                if (this._renderer.scene.selectedObject === null) break;
                let obj = this._renderer.scene.selectedObject;
                if (this._tKey) {
                    if (this._xKey) {
                        obj.translate.x += 0.1;
                    }
                    if (this._yKey) {
                        obj.translate.y += 0.1;
                    }

                    if (this._zKey) {
                        obj.translate.z += 0.1;
                    }
                } else if (this._rKey) {
                    if (this._xKey) {
                        obj.rotate.x += 1;
                    }
                    if (this._yKey) {
                        obj.rotate.y += 1;
                    }

                    if (this._zKey) {
                        obj.rotate.z += 1;
                    }
                } else if (this._sKey) {
                    if (this._xKey) {
                        obj.scale.x += 0.1
                    }
                    if (this._yKey) {
                        obj.scale.y += 0.1
                    }

                    if (this._zKey) {
                        obj.scale.z += 0.1
                    }
                } else if (this._pKey) {
                    if (this._xKey) {
                        obj.pivot.x += 0.1;
                    }
                    if (this._yKey) {
                        obj.pivot.y += 0.1;
                    }

                    if (this._zKey) {
                        obj.pivot.z += 0.1;
                    }
                }
                break;
            case "ArrowDown" :
                if (this._renderer.scene.selectedObject === null) break;
                let obj1 = this._renderer.scene.selectedObject;
                if (this._tKey) {
                    if (this._xKey) {
                        obj1.translate.x -= 0.1;
                    }
                    if (this._yKey) {
                        obj1.translate.y -= 0.1;
                    }

                    if (this._zKey) {
                        obj1.translate.z -= 0.1;
                    }
                } else if (this._rKey) {
                    if (this._xKey) {
                        obj1.rotate.x -= 1;
                    }
                    if (this._yKey) {
                        obj1.rotate.y -= 1;
                    }

                    if (this._zKey) {
                        obj1.rotate.z -= 1;
                    }
                } else if (this._sKey) {
                    if (this._xKey) {
                        obj1.scale.x -= 0.1
                    }
                    if (this._yKey) {
                        obj1.scale.y -= 0.1
                    }

                    if (this._zKey) {
                        obj1.scale.z -= 0.1
                    }
                } else if (this._pKey) {
                    if (this._xKey) {
                        obj1.pivot.x -= 0.1;
                    }
                    if (this._yKey) {
                        obj1.pivot.y -= 0.1;
                    }

                    if (this._zKey) {
                        obj1.pivot.z -= 0.1;
                    }
                }

                break;
            default:
                break;
        }
    };

    private _onKeyUpHandler = (event: any) => {
        switch (event.code) {
            case "KeyT":
                this._tKey = false;
                break;
            case "KeyR":
                this._rKey = false;
                break;
            case "KeyS":
                this._sKey = false;
                break;
            case "KeyP":
                this._pKey = false;
                break;
            case "KeyX":
                this._xKey = false;
                break;
            case "KeyY":
                this._yKey = false;
                break;
            case "KeyZ":
                this._zKey = false;
                break;
            default:
                break;
        }

    };

    private _onKeyPressHandler = (event: any) => {
        if (event.code === "Digit1") {
            this._renderer.axis.hide_showX();
        }

        if (event.code === "Digit2") {
            this._renderer.axis.hide_showY();
        }

        if (event.code === "Digit3") {
            this._renderer.axis.hide_showZ();
        }

        if (event.code === "Digit4") {
            this._renderer.hide_show_axis();
        }

        if (event.code === "Digit5") {
            this._renderer.hide_show_grid();
        }

        if (event.code === "Digit6") {
            this._renderer.hide_show_grid();
            this._renderer.hide_show_axis();

            for (let child of this._renderer.scene.children) {
                if (!(child instanceof Mesh)) {
                    child.hide_show();
                }
            }
        }
    }
}
