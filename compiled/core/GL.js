let __glContext;
export function initialize(canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (gl !== null) {
        __glContext = gl;
        return;
    }
    console.warn("No context with ID = webgl");
    gl = canvas.getContext("experimental-webgl", { preserveDrawingBuffer: true });
    if (gl !== null) {
        __glContext = gl;
        return;
    }
    throw new Error("Cannot get the WebGLRenderingContext");
}
export function getWebGL() {
    if (__glContext === undefined) {
        throw new Error("WebGLRenderingContext not initialized. Use 'initialize()' function first!");
    }
    else {
        return __glContext;
    }
}
