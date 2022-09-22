<template>
    <canvas id="webgl"
        style="position: absolute; top: 0; left: 0; width: 100vw; height: 100%; z-index: -1; display: block;"></canvas>
</template>
  
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import * as CustomShaderPass from '../utils/threejs/ShaderPass.js'



// import dat.gui
import * as dat from 'dat.gui'

import * as ParticleEngine from '../utils/threejs/ParticleEngine.js'

import SimShader from '../utils/threejs/SimShader.js'
import ParticleShader from '../utils/threejs/ParticleShader.js'


console.log(SimShader.defines);
var _params = {
    size: 512,
    simMat: CustomShaderPass.default.createShaderMaterial(SimShader),
    drawMat: CustomShaderPass.default.createShaderMaterial(ParticleShader),
    update: undefined,  // defined later in the file
};

export default {
    name: 'ThreeJS',

    data() {
        return {
            scene: null,
            renderer: null,
            camera: null
        }
    },

    methods: {
        init() {
            _engine = new ParticleEngine.default(_params);

            _uvAnim = new UVMapAnimator(_engine.renderer.getRenderer(), _params.size);
            _params.simMat.uniforms.tTarget = { type: "t", value: _uvAnim.target };
        },
        initThree() {
            // threejs scene with cube and resize
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            var webglCanvas = document.getElementById('webgl')
            this.renderer = new THREE.WebGLRenderer({
                canvas: webglCanvas, antialias: true, alpha: true
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            var cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
            this.camera.position.z = 5;
            var _ = this
            var animate = function () {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                _.renderer.render(_.scene, _.camera);
            };
            animate();

            this.init();
            // _initUI();
            // _initKeyboard();
            // _setPreset(_currPreset);
            // _engine.start();
            // add resize listener
            window.addEventListener('resize', this.onResize);
        },
        onResize() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    },
    mounted() {
        this.initThree()
    }

}
</script>
  