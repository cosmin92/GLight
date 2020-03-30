// Object types
export const MESH = 0;
export const CAMERA = 1;
export const PERSPECTIVE_CAMERA = 2;
export const ORTHOGRAPHIC_CAMERA = 3;
export const LAMBERT_MATERIAL = 4;
export const PHONG_MATERIAL = 5;
export const DIRECTIONAL_LIGHT = 6;
export const POINT_LIGHT = 7;
export const HELPER = 8;
export const GROUP = 9;
export const TEXTURE = 10;
export const TEXTURE_CUBE = 11;
export const SKY_BOX = 12;


export enum INTERPOLATION {
    LINEAR = 0,
    BSPLINE = 1
}

export enum EASE {
    LINEAR = 0,
    IN_OUT_QUAD = 1,
    OUT_QUAD = 2,
    IN_QUAD = 3,

    IN_OUT_CUBIC = 4,
    OUT_CUBIC = 5,
    IN_CUBIC = 6,

    IN_OUT_QUART = 7,
    OUT_QUART = 8,
    IN_QUART = 9,

    IN_OUT_QUINT = 10,
    OUT_QUINT = 11,
    IN_QUINT = 12,

    IN_OUT_ELASTIC = 13,
    OUT_ELASTIC = 14,

    IN_OUT_SIN = 15,
    OUT_SIN = 16,
    IN_SIN = 17
}