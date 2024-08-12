import { useCallback, useEffect, useRef, useState } from "react";
import { load } from "@tensorflow-models/facemesh";
import * as THREE from "three";
import { TRIANGULATION } from "./triangulation";
import { uvs } from "./frontProjectionUVMap";
import { positionBufferData } from "./positionBufferData";

export const useFaceMeshModel = () => {
  const [model, setModel] = useState(undefined);

  useEffect(() => {
    if (model) {
      return;
    }

    async function loadFacemesh() {
      const model = await load({
        maxContinuousChecks: 5,
        detectionConfidence: 0.9,
        maxFaces: 1,
        iouThreshold: 0.3,
        scoreThreshold: 0.75,
      });
      setModel(model);
    }
    loadFacemesh();
  }, [model]);

  return model;
};

export const useFaceMask = (videoElement, canvasElement, avatarPath) => {
  const [model, setModel] = useState();

  useEffect(() => {
    if (model) {
      return;
    }

    load({
      maxContinuousChecks: 5,
      detectionConfidence: 0.9,
      maxFaces: 1,
      iouThreshold: 0.3,
      scoreThreshold: 0.75,
    }).then((it) => setModel(it));
  }, [model]);

  const requestRef = useRef(0);
  const [faceCanvas, setFaceCanvas] = useState();

  const animate = useCallback(async () => {
    if (!model) {
      return;
    }

    try {
      const predictions = await model.estimateFaces(videoElement);
      if (!predictions.length) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!faceCanvas) {
        setFaceCanvas(
          new FaceCanvas({
            canvas: canvasElement,
            textureFilePath: avatarPath,
            w: videoElement.clientWidth,
            h: videoElement.clientHeight,
          })
        );
        return;
      }

      const positionBufferData = predictions[0].scaledMesh.reduce(
        (acc, pos) => acc.concat(pos),
        []
      );
      faceCanvas.render(positionBufferData);
      requestRef.current = requestAnimationFrame(animate);
    } catch (e) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [model, videoElement, faceCanvas, canvasElement, avatarPath]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

class FaceCanvas {
  constructor({ canvas, textureFilePath, w, h }) {
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvas,
    });
    this._renderer.setSize(w, h);
    this._halfW = w * 0.5;
    this._halfH = h * 0.5;
    this._textureFilePath = textureFilePath;
    this._setupScene();
  }

  static get EYE_VERTICES() {
    return [
      // LEFT EYE
      133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155,
      // RIGHT EYE
      362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382,
    ];
  }

  _addCamera() {
    this._camera = new THREE.OrthographicCamera(
      this._halfW,
      -this._halfW,
      -this._halfH,
      this._halfH,
      1,
      1000
    );
    this._camera.position.x = 320;
    this._camera.position.y = 240;
    this._camera.position.z = -600;
    this._camera.lookAt(320, 240, 0);
  }

  _addLights() {
    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2);
    this._scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(this._halfW, this._halfH * 0.5, -1000).normalize();
    this._scene.add(directionalLight);
  }

  _addGeometry() {
    this._geometry = new THREE.BufferGeometry();
    this._geometry.setIndex(TRIANGULATION);
    this._geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionBufferData, 3)
    );
    this._geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    this._geometry.computeVertexNormals();
  }

  _addMaterial() {
    this._textureLoader = new THREE.TextureLoader();
    const texture = this._textureLoader.load(this._textureFilePath);
    texture.encoding = THREE.sRGBEncoding;

    texture.anisotropy = 16;
    const alpha = 0.4;
    const beta = 0.5;
    this._material = new THREE.MeshPhongMaterial({
      map: texture,
      color: new THREE.Color(0xffffff),
      specular: new THREE.Color(beta * 0.2, beta * 0.2, beta * 0.2),
      reflectivity: beta,
      shininess: Math.pow(2, alpha * 10),
    });
  }

  _setupScene() {
    this._scene = new THREE.Scene();
    this._addCamera();
    this._addLights();
    this._addGeometry();
    this._addMaterial();
    this._mesh = new THREE.Mesh(this._geometry, this._material);
    this._scene.add(this._mesh);
  }

  render(positionBufferData) {
    this._geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionBufferData, 3)
    );
    this._geometry.attributes.position.needsUpdate = true;

    this._renderer.render(this._scene, this._camera);
  }
}