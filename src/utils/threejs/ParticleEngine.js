import * as CustomShaderPass from './ShaderPass.js'
import * as THREE from 'three'
import SimInitShader from './SimInitShader'
import BasicParticleShader from './ParticleShader.js'

import Stats from 'stats-js'

import './OrbitControls'

import RenderContext from './RenderContext.js'
import ParticleSimulation from './ParticleSimulation.js'
import Utils from './Utils.js'

var ParticleEngine = function (params) {

    var _this = this;

    var _canvas, _stats;
    var _updateLoop;
    var _renderer, _camera, _scene, _size;
    var _sim, _simMat, _initMat, _drawMat;
    var _mouse;
    var _controls, _raycaster;
    var _leapMan;
    var _customUpdate;
    var _pauseSim = false;


    // PARAMS

    params = params || {};
    _size = params.size || 512;
    _simMat = params.simMat || CustomShaderPass.default.createShaderMaterial(BasicSimShader);
    _initMat = params.initMat || CustomShaderPass.default.createShaderMaterial(SimInitShader);
    _drawMat = params.drawMat || CustomShaderPass.default.createShaderMaterial(BasicParticleShader);
    _customUpdate = params.update;
    _renderer = params.renderer
    _scene = params.scene
    _camera = params.camera
    _mouse = params.mouse
    _updateLoop = params.updateLoop
    _controls = params.controls


    // EVENTS

    var _onWindowResize = function () {
        _renderer.setSize(window.innerWidth, window.innerHeight);
    };




    // PRIVATE FUNCTIONS

    var _init = function () {
        window.addEventListener("resize", _onWindowResize, false);

        _stats = new Stats();
        document.body.appendChild(_stats.domElement);



        // _camera = _renderer.getCamera();
        // _scene = _renderer.getScene();

        return [_mouse]
    };

    var _sceneInit = function () {
        _sim = new ParticleSimulation(_renderer.getRenderer(), _size, {
            simMat: _simMat,
            initMat: _initMat,
            drawMat: _drawMat
        });

        _scene.add(_sim.getParticleObject());






        _camera.position.set(0, 1, 7);



        // var tmat = (new THREE.Matrix4()).compose(
        //     new THREE.Vector3(0.0, -3.0, -_camera.position.z),
        //     new THREE.Quaternion(),
        //     new THREE.Vector3(0.015, 0.015, 0.015));
        // _leapMan = new LeapManager(_renderer.getRenderer(), _camera, tmat);
        _simMat.defines.MULTIPLE_INPUT = "";    // TODO_NOP: at least even hardcode numbers for this in shader
        _simMat.needsUpdate = true;

        // _debugBox = document.querySelector("#debug-box");
    };





    // PUBLIC FUNCTIONS

    this.start = function () {

        _updateLoop.start();
    };

    this.update = function (dt, t) {
        _sim.update(dt, t);
        _stats.update();
    };

    this.stop = function () {
        _updateLoop.stop();
    };

    this.pauseSimulation = function (value) {
        _pauseSim = value;
    };

    this.enableCameraAutoRotate = function (value) {
        _controls.autoRotate = value;
    };

    this.enableCameraControl = function (value) {
        _controls.enabled = value;
    };
    this.init = _init;

    // INIT

    _init();

    _sceneInit();

    // expose variables
    this.renderer = _renderer;
    this.scene = _scene;
    this.camera = _camera;
};

export default ParticleEngine;
