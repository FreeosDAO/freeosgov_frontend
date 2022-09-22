import Utils from "./Utils";

var UVMapShader = {

    uniforms: {
    },

    vertexShader: Utils.loadTextFileInject(
        "shaders/UVMapShader.vs.glsl"
    ),

    fragmentShader: Utils.loadTextFileInject(
        "shaders/UVMapShader.fs.glsl"
    )

};

export default UVMapShader