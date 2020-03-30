const basicVertexShader = "" +
    "attribute vec3 vertexPosition;\n" +
    "\n" +
    "uniform mat4 viewMatrix;\n" +
    "uniform mat4 projectionMatrix;\n" +
    "uniform mat4 modelMatrix;\n" +
    "\n" +
    "void main(void){\n" +
    "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);\n}";
const basicFragmentShader = "" +
    "precision mediump float;\n" +
    "\n" +
    "uniform vec4 materialDiffuse;" +
    "\n" +
    "void main(void){\n" +
    "\tgl_FragColor = materialDiffuse;\n}";
const offScreenVertexShader = "" +
    "attribute vec3 vertexPosition;\n" +
    "\n" +
    "uniform mat4 viewMatrix;\n" +
    "uniform mat4 projectionMatrix;\n" +
    "uniform mat4 modelMatrix;\n" +
    "\n" +
    "void main(void){\n" +
    "\tgl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);\n}";
const offScreenFragmentShader = "" +
    "precision mediump float;\n" +
    "\n" +
    "uniform vec4 materialDiffuse;" +
    "\n" +
    "void main(void){\n" +
    "\tgl_FragColor = materialDiffuse;\n}";
export { basicVertexShader, basicFragmentShader, offScreenVertexShader, offScreenFragmentShader };
