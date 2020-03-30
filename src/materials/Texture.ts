import TextureImage from "./TextureImage";
import {TEXTURE} from "../Constants";

export default class Texture extends TextureImage {

    private _imageURL: string;

    public constructor(imageURL: string) {
        super(TEXTURE);

        this._imageURL = imageURL;

        this._texture = this._gl.createTexture();

        if (this._texture === null) {
            console.warn("Cannot load the texture");
        }

        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);

        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, 1, 1, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
        this._gl.generateMipmap(this._gl.TEXTURE_2D);

        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);

        let textureInfo = {width: 1, height: 1, texture: this._texture};
        let img = new Image();
        let gl = this._gl;

        img.addEventListener('load', function () {
            textureInfo.width = img.width;
            textureInfo.height = img.height;

            gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        });

        if ((new URL(imageURL)).origin !== window.location.origin) {
            img.crossOrigin = "";
        }

        img.src = imageURL;
    }

    public use(uniform: WebGLUniformLocation) {
        super.use(uniform);
        this._gl.activeTexture(this._gl.TEXTURE0);
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        this._gl.uniform1i(uniform, 0);
    }
}